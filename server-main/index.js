// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import Users from "./routes/Users.js";  // Import Routes
// import Publishers from "./routes/Publishers.js";  
// import advertiserRoutes from "./routes/Advertiser.js";// Import Routes

// import nodemailer from "nodemailer";
// import crypto from "crypto";
// import bcrypt from "bcryptjs";


// dotenv.config();
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Database Connection (using your password)
// mongoose.connect("mongodb+srv://jenishkanani777:J4yVcpNu(4E.A78@cluster0.3pjsf.mongodb.net/advertiserDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB Connected"))
// .catch((err) => console.error(err));

// // Routes
// app.use("/api/auth", Users);  // Add new route
// app.use("/api", Publishers); 
// app.use("/api/advertisers", advertiserRoutes);
//  // Add new route

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// const userOTPStore = {}; // Store OTPs temporarily (Use DB in production)
// const usersDB = {}; // Fake user DB (Use real database in production)

// // ✅ Configure Email Transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // ✅ 1️⃣ Send OTP to User's Email
// app.post("/api/auth/send-otp", async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required." });
//   }

//   // Generate a 6-digit OTP
//   const otp = crypto.randomInt(100000, 999999).toString();
//   userOTPStore[email] = otp; // Store OTP temporarily

//   // Email message
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.json({ message: "OTP sent successfully to your email!" });
//   } catch (error) {
//     console.error("Email error:", error);
//     res.status(500).json({ message: "Failed to send OTP." });
//   }
// });

// // ✅ 2️⃣ Verify OTP & Reset Password
// app.post("/api/auth/reset-password", async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   if (!email || !otp || !newPassword) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   // Check if OTP is correct
//   if (userOTPStore[email] !== otp) {
//     return res.status(400).json({ message: "Invalid or expired OTP." });
//   }

//   // Hash the new password
//   const hashedPassword = await bcrypt.hash(newPassword, 10);
//   usersDB[email] = hashedPassword; // Save new password

//   // Remove OTP after successful reset
//   delete userOTPStore[email];

//   res.json({ message: "Password reset successfully. You can now log in." });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import Users from "./routes/Users.js";  
// import Publishers from "./routes/Publishers.js";  
// import advertiserRoutes from "./routes/Advertiser.js";
// import nodemailer from "nodemailer";
// import crypto from "crypto";
// import bcrypt from "bcryptjs";
// import User from "./models/User.js"; // ✅ Import User Model

// dotenv.config();
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // ✅ MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {})
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // ✅ Routes
// app.use("/api/auth", Users);
// app.use("/api", Publishers);
// app.use("/api/advertisers", advertiserRoutes);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// const userOTPStore = {}; // Store OTPs temporarily (Use DB in production)

// // ✅ Configure Email Transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // ✅ 1️⃣ Send OTP to User's Email
// app.post("/api/auth/send-otp", async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required." });
//   }

//   // Generate a 6-digit OTP
//   const otp = crypto.randomInt(100000, 999999).toString();
//   userOTPStore[email] = otp; // Store OTP temporarily

//   // Email message
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.json({ message: "OTP sent successfully to your email!" });
//   } catch (error) {
//     console.error("❌ Email error:", error);
//     res.status(500).json({ message: "Failed to send OTP." });
//   }
// });

// // ✅ 2️⃣ Verify OTP & Reset Password (Now Updates in MongoDB)
// app.post("/api/auth/reset-password", async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   if (!email || !otp || !newPassword) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   // ✅ Check if OTP is correct
//   if (!userOTPStore[email] || userOTPStore[email] !== otp) {
//     return res.status(400).json({ message: "Invalid or expired OTP." });
//   }

//   try {
//     // ✅ Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // ✅ Update password in MongoDB
//     const user = await User.findOneAndUpdate(
//       { email: email }, // Find user by email
//       { $set: { password: hashedPassword } }, // Update password
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // ✅ Remove OTP after successful reset
//     delete userOTPStore[email];

//     res.json({ message: "Password reset successfully. You can now log in." });
//   } catch (error) {
//     console.error("❌ Password Reset Error:", error);
//     res.status(500).json({ message: "Failed to reset password." });
//   }
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));









// this is main code 


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Users from "./routes/Users.js";  
import Publishers from "./routes/Publishers.js";  
import advertiserRoutes from "./routes/Advertiser.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // ✅ Import User Model

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/auth", Users);
app.use("/api", Publishers);
app.use("/api/advertisers", advertiserRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const userOTPStore = {}; // Store OTPs temporarily

// ✅ Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "adlinker45@gmail.com", // ✅ Send to your email
    subject: "New Contact Form Submission",
    text: `📩 New Contact Form Submission:
    
    Name: ${name}
    Email: ${email}
    Message: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ message: "Failed to send message." });
  }
});

// ✅ 1️⃣ Send OTP to User's Email (Checks if Email Exists)
app.post("/api/auth/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  // ✅ Check if the email exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email not found." });
  }

  // ✅ Generate a 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  userOTPStore[email] = otp;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully to your email!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ message: "Failed to send OTP." });
  }
});

// ✅ 2️⃣ Verify OTP & Reset Password
app.post("/api/auth/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!userOTPStore[email] || userOTPStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    delete userOTPStore[email];
    res.json({ message: "Password reset successfully. You can now log in." });
  } catch (error) {
    console.error("❌ Password Reset Error:", error);
    res.status(500).json({ message: "Failed to reset password." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));





