import { Router } from "express";
import {loginController, resendOtpController, signupController, verifyOtpController} from "../controller/authController.js";

const  authRoute= Router();


authRoute.post("/signup",signupController)
authRoute.get("/resend-otp",resendOtpController)
authRoute.get("/verify-otp",verifyOtpController)

authRoute.post("/login",loginController)

export default authRoute;