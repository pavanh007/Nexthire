import { Router } from "express";
import { User } from "../db/models/user.mjs";
import { OTP } from "../db/models/otp.mjs";
import nodemailer from "nodemailer";

const userRouter = Router();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "de5bc64801bb41",
    pass: "fda60dc0b39c58",
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

userRouter.post("/signin", async (req, res) => {
  try {
    const payload = req.body;
    const user = await User.find({ email: payload?.email });
    if (user.length > 0) {
      return res.status(200).json({
        message: "User exists, please use another email address!",
        status: 200,
      });
    }
    const userCreated = await User.create({ ...payload });
    console.log(userCreated)
    if (userCreated) {
      const otp = generateOTP();
      await OTP.create({ email: payload.email, otp: otp });

      const mailOptions = {
        from: "cartindia@gmail.com",
        to: payload.email,
        subject: "OTP for Sign Up",
        text: `Your OTP is ${otp}. Please use this OTP to complete your sign up process.`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error("Error sending OTP:", error);
          return res.status(500).json({ error: "Failed to send OTP" });
        } else {
          console.log("OTP sent:", info.response);
          return res
            .status(201)
            .json({ message: "OTP sent to your email", status: 201 });
        }
      });
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("/verify", async (req, res) => {
  try {

    const { email, otp } = req.body;
    console.log(email, otp);
    if (!email && !otp) {
      return res.status(400).json({
        message: "invalid",
        status: 200,
      });
    }
    const validated = await OTP.find({ email: email, otp: otp });
    if (validated.length > 0) {
      return res.status(200).json({
        message: "otp verified",
        status: 200,
      });
    }
  } catch (error) {
     console.error("Error creating user:", error.message);
     return res.status(500).json({ error: "Internal server error" });
  }
})


userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User successfully logged in", status: 200 });
  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});


userRouter.put("/interest", async (req, res) => {
  try {
    const { email, interests } = req.body;
    console.log(email, interests);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    interests.forEach((interest) => {
      if (!user.interests.includes(interest)) {
        user.interests.push(interest);
      }
    });
    await user.save();
    res.status(200).json({ message: "Interests updated successfully" });
  } catch (error) {
    console.error("Error updating interests:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


userRouter.get("/interest", async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "Interests", data: user["interests"] });
  } catch (error) {
    console.error("Error updating interests:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});


export { userRouter };
