const express=require('express');
const {login,registerUser,verifyEmail,verifyOTP,forgetPassword,verifyForgotPasswordOtp, me}=require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const route=express.Router()

route.post("/register",registerUser)
route.post("/login",login)
route.post("/verifyEmail",verifyEmail)
route.post("/verifyOTP",verifyOTP)



//forgot password
route.post("/forgotPassword", forgetPassword);
route.post("/forgotPassword/verifyOTP", verifyForgotPasswordOtp);

// Get Current User
route.get("/me", authMiddleware, me);

// Google Auth
const passport = require("passport");
const { googleCallback } = require('../controllers/authController');

if (passport.isGoogleAuthConfigured) {
  route.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  route.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    googleCallback
  );
} else {
  route.get("/google", (req, res) => {
    return res.status(503).json({ message: "Google login is not configured on this server" });
  });

  route.get("/google/callback", (req, res) => {
    return res.status(503).json({ message: "Google login is not configured on this server" });
  });
}



module.exports=route