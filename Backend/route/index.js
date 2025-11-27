import express from "express";
import Authroute from "./auth.route.js";

const route = express.Router();
route.use("/auth", Authroute);

export default route;
