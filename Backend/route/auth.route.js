import express from "express";
import AuthcontrollerRoutes from "../controller/index.js";

const route = express.Router();

route.post("/signup", AuthcontrollerRoutes.SignupController);
route.post("/login", AuthcontrollerRoutes.LoginController);
route.post("/verify-otp", AuthcontrollerRoutes.verifyOtpContoller);

export default route;
