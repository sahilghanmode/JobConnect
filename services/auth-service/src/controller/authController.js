import prisma from "../prismaClient.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

dotenv.config();

const maxAge = 30 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET, { expiresIn: maxAge })
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thorsthorkel@gmail.com',
        pass: 'zksl gett jana gtue'
    }
});

const sendOtp = async (email) => {
    if (!email) {
        throw new Error('Email is required');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const user=await prisma.user.update({
        where: { email },
        data: {
            otp: otp,
            otpExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
            otpAttempts: { increment: 1 }
        }
    });

    if(user.otpAttempts >= 5){
        console.log("Email send failed")
        throw new Error('Maximum OTP resend attempts reached');
    }

    const mailOptions = {
        from: 'thorsthorkel@gmail.com',
        to: email,
        subject: 'Your OTP Verification Code',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>OTP Verification</h2>
                <p>Your One-Time Password (OTP) for verification is:</p>
                <h1 style="color: #4a90e2; font-size: 32px; letter-spacing: 2px;">${otp}</h1>
                <p>This OTP will expire in 15 minutes.</p>
                <p>If you didn't request this code, please ignore this email.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email send failed:', error);
        throw new Error('Failed to send OTP email');
    }
}


export const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !password || !email) {
            return res.status(400).json({ msg: "Name, email, and password are required" });
        }

        let user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            if (user.isVerified) {
                return res.status(409).json({ msg: "User with this email already exists" });
            }

            if (user.otpAttempts >= 5) {
                return res.status(429).json({ 
                    msg: "Maximum OTP resend attempts reached. Please try again later." 
                });
            }

            await sendOtp(email);

            return res.status(200).json({ 
                msg: "OTP resent successfully",
                userId: user.id 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await prisma.user.create({
            data: { 
                name, 
                email, 
                HashPassword: hashedPassword,
                otpAttempts: 0
            }
        });

        await sendOtp(email);

        return res.status(201).json({ 
            msg: "User created. OTP sent to your email.",
            userId: newUser.id 
        });

    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ 
            msg: "Internal Server Error",
            error: err.message 
        });
    }
}

export const resendOtpController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ msg: "Email is required" });
        }

        if (!sendOtp(email)) {
            return res.status(500).json({ msg: "Could not send OTP" });
        }

        return res.status(200).json({ msg: "OTP sent successfully" });

    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const verifyOtpController=async(req,res)=>{
    try {
        const {email,otp}=req.body;
        if(!email || !otp){
            return res.status(400).json({msg:"Email and OTP are required"})
        }

        const user=await prisma.user.findUnique({where:{email}});

        if(!user){
            return res.status(404).json({msg:"User not found"})
        }

        if(user.otp!==otp){
            return res.status(400).json({msg:"Invalid OTP"})
        }

        await prisma.user.update({
            where:{email},
            data:{
                isVerified:true
            }
        })

        res.cookie("authToken",createToken(email,user.id),{
            maxAge,
            secure: true,
            sameSite: "None"
        })
        return res.status(200).json({msg:"Email verified successfully"})

    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

export const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({msg:"Email and Password are required"})
        }

        const user=await prisma.user.findUnique({where:{email}})

        if(!user){
            return res.status(404).json({msg:"User not found"})
        }

        if(!user.isVerified){
            return res.status(404).json({msg:"User is not verified"})
        }
        
        const isPasswordValid=await bcrypt.compare(password,user.HashPassword)
        if(!isPasswordValid){
            return res.status(400).json({msg:"Invalid Password"})
        } 
        
        res.cookie("authToken",createToken(email,user.id),{   
            maxAge,
            secure: true,
            sameSite: "None"
        })

        return res.status(200).json({
            msg:"User logged in successfully",

        })
    }catch(err){
        console.log(err.message)
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

export const forgotPasswordController=async(req,res)=>{
    try{
        const {email}=req.body;
        if(!email){
            return res.status(400).json({msg:"Email is required"})
        }

        const user=await prisma.user.findUnique({where:{email}})

        if(!user){
            return res.status(404).json({msg:"User not found"})
        }

        const forgotPasswordToken=createToken(email)
        

    }catch(err){
        console.log(err.message)
        return res.status(500).json({msg:"Internal Server Error"})
    }
}