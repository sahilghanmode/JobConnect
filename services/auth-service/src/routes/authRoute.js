import { Router } from "express";
import {
    forgotPasswordController,
    loginController,
    resendOtpController,
    resetPasswordController,
    signupController,
    verifyOtpController,
    getCurrentUserController,
    logoutController,
    getUserByIdController
} from "../controller/authController.js";

const authRoute = Router();

authRoute.post("/signup", signupController);
authRoute.post("/resend-otp", resendOtpController);
authRoute.post("/verify-otp", verifyOtpController);

authRoute.post("/login", loginController);
authRoute.get("/current-user", getCurrentUserController);
authRoute.get("/:id", getUserByIdController); // Add this route
authRoute.post("/logout", logoutController);
authRoute.post("/forgot-password", forgotPasswordController);

authRoute.post("/reset-password", resetPasswordController);

export default authRoute;