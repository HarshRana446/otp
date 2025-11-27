import User from "../model/index.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const SignupService = async (body) => {
  try {
    let { username, email, password } = body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashPassword = await argon2.hash(password);
    const user = await User.create({ username, email, password: hashPassword });
    return { user };
  } catch (error) {
    throw new Error({ error });
  }
};
export const LoginService = async (body) => {
  try {
    let { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return { token };
  } catch (error) {
    throw new Error({ error });
  }
};

