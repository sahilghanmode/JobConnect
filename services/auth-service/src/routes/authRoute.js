import { Router } from "express";
import {forgotPasswordController, loginController, resendOtpController, resetPasswordController, signupController, verifyOtpController} from "../controller/authController.js";

const  authRoute= Router();


authRoute.post("/signup",signupController)
authRoute.post("/resend-otp",resendOtpController)
authRoute.post("/verify-otp",verifyOtpController)

authRoute.post("/login",loginController)
authRoute.post("/forgot-password",forgotPasswordController)

authRoute.post("/reset-password",resetPasswordController)

export default authRoute;