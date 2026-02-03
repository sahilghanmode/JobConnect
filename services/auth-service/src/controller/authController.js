import { prisma } from "@repo/db";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const maxAge = 30 * 24 * 60 * 60 * 1000;

BigInt.prototype.toJSON = function () {
    return this.toString();
};

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOtp = async (email) => {
    if (!email) throw new Error("Email is required");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    if (user.otpAttempts >= 5) {
        throw new Error("Maximum OTP resend attempts reached");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.user.update({
        where: { email },
        data: {
            otp,
            otpExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
            otpAttempts: { increment: 1 },
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Verification Code",
        html: `
      <h2>OTP Verification</h2>
      <h1>${otp}</h1>
      <p>Expires in 15 minutes</p>
    `,
    });

    return true;
};

export const signupController = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log(name, email, password);

        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Name, email, and password required" });
        }

        let user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            if (user.isVerified) {
                return res.status(409).json({ msg: "User already exists" });
            }

            await sendOtp(email);
            return res.status(200).json({
                msg: "OTP resent successfully",
                userId: user.id,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await prisma.user.create({
            data: {
                name,
                email,
                hashPassword: hashedPassword,
                role: role === "RECRUITER" ? "RECRUITER" : "CANDIDATE",
                otpAttempts: 0,
            },
        });

        await sendOtp(email);

        const safeUser = await prisma.user.findUnique({
            where: { id: createdUser.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isVerified: true,
                createdAt: true,
            },
        });

        return res.status(201).json({
            msg: "User created. OTP sent to your email.",
            user: safeUser,
        });
    } catch (err) {
        console.error("Signup error:", err.message);
        return res.status(500).json({ msg: err.message });
    }
};

export const verifyOtpController = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ msg: "Email and OTP required" });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ msg: "User already verified" });
        }

        const cleanOtp = otp.trim();

        if (!user.otp || user.otp !== cleanOtp) {
            return res.status(400).json({ msg: "Invalid OTP" });
        }

        if (user.otpExpiresAt < new Date()) {
            return res.status(400).json({ msg: "OTP expired" });
        }

        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                isVerified: true,
                otp: null,
                otpExpiresAt: null,
                otpAttempts: 0,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isVerified: true,
                createdAt: true,
            },
        });

        res.cookie("authToken", createToken(email, updatedUser.id), {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge,
        });

        return res.status(200).json({
            msg: "Email verified successfully",
            user: updatedUser,
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password required" });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.isVerified) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const userProfile = await prisma.profile.findUnique({ where: { userId: user.id } })

        const isValid = await bcrypt.compare(password, user.hashPassword);
        if (!isValid) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        res.cookie("authToken", createToken(email, user.id), {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge,
        });
        console.log(userProfile)

        return res.status(200).json({
            msg: "User logged in successfully",
            userProfile,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
            },
        });

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ msg: "User not found" });

        const token = jwt.sign(
            { email, userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        await transporter.sendMail({
            to: email,
            subject: "Password Reset",
            html: `<a href="${resetUrl}">Reset Password</a>`,
        });

        return res.status(200).json({ msg: "Reset link sent" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export const resetPasswordController = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const hashed = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: decoded.userId },
            data: { hashPassword: hashed },
        });

        return res.status(200).json({ msg: "Password reset successful" });
    } catch (err) {
        return res.status(400).json({ msg: "Invalid or expired token" });
    }
};

export const resendOtpController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ msg: "Email is required" });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ msg: "User is already verified" });
        }

        if (user.otpAttempts >= 5) {
            return res.status(429).json({
                msg: "Maximum OTP resend attempts reached. Try again later.",
            });
        }

        await sendOtp(email);

        return res.status(200).json({
            msg: "OTP resent successfully",
        });
    } catch (err) {
        console.error("Resend OTP error:", err.message);
        return res.status(500).json({ msg: err.message });
    }
};


export const getCurrentUserController = async (req, res) => {
    try {
        const token = req.cookies.authToken;
        if (!token) return res.status(401).json({ msg: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

        if (!user) {
            res.clearCookie("authToken");
            return res.status(401).json({ msg: "User not found" });
        }

        const userProfile = await prisma.profile.findUnique({ where: { userId: user.id } });

        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
            },
            userProfile
        });
    } catch (err) {
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};
