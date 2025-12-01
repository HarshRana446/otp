import Authservice from "../service/index.js";

export const SignupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await Authservice.SignupService(req.body);
    res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    res.status(500).json({ message: "Signup Failed", error });
  }
};

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await Authservice.LoginService(req.body);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Login Failed", error });
  }
};

export const verifyOtpContoller = async (req, res) => {
  console.log(req.body);

  try {
    const user = await Authservice.verifyOtpService(req.body);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
