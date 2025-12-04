import nodemailer from "nodemailer";

export const sendemail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Your OTP Code</h2>
        <h1 style="font-size: 28px; letter-spacing: 4px;">${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
      `,
    });

    console.log("OTP Email Sent to:", email);
  } catch (err) {
    console.log("Email Error:", err.message);
  }
};
