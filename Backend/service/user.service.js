import User from "../model/index.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { sendemail } from "../utils/mail.js";

export const SignupService = async ({ username, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const hashed = await argon2.hash(password);
  const user = await User.create({ username, email, password: hashed });

  return { user };
};

export const LoginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const ok = await argon2.verify(user.password, password);
  if (!ok) throw new Error("Invalid password");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.onExpire = Date.now() + 5 * 60 * 1000;
  await user.save();

  await sendemail(email, otp);

  return { message: "OTP sent" };
};

export const verifyOtpService = async ({ email, otp }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  if (user.onExpire < Date.now()) throw new Error("OTP expired");
  if (user.otp !== otp) throw new Error("Invalid OTP");

  user.otp = null;
  user.onExpire = null;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token };
};

export const resendOtpService = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.onExpire = Date.now() + 5 * 60 * 1000;
  await user.save();

  await sendemail(email, otp);

  return { message: "OTP resent" };
};
