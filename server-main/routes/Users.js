import express from "express";
import User from "../models/user.js";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

// ✅ User Registration
router.post("/register", async (req, res) => {
    try {
      const { accountType, firstName, lastName, country, city, address, email, phone, password } = req.body;
      
      let user = await User.findOne({ email }).exec();
      if (user) return res.status(400).json({ message: "User already exists" });

      user = new User({ accountType, firstName, lastName, country, city, address, email, phone, password });
      await user.save();

      res.status(201).json({ 
        message: "User registered successfully", 
        user: { _id: user._id, name: user.firstName, email: user.email } // ✅ FIXED _id
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);

    res.json({ 
      message: "Login successful", 
      token,  
      user: { _id: user._id, name: user.firstName, email: user.email } // ✅ FIXED _id
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
