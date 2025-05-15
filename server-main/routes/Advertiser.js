

import express from "express";
import Advertiser from "../models/Advertiser.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ Import JWT middleware

const router = express.Router();

// ✅ Get all Advertisers
router.get("/", async (req, res) => {
  try {
    const advertisers = await Advertiser.find();
    res.status(200).json(advertisers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Add Company (Only logged-in users)
router.post("/add", protect, async (req, res) => {
  try {
    const { companyName, typeOfProduction, address, phoneNumber, email } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const existingAdvertiser = await Advertiser.findOne({ email });
    if (existingAdvertiser) {
      return res.status(400).json({ message: "Advertiser with this email already exists" });
    }

    const newAdvertiser = new Advertiser({
      companyName,
      typeOfProduction,
      address,
      phoneNumber,
      email,
      owner: req.user._id, // ✅ Assign the logged-in user as owner
    });

    await newAdvertiser.save();
    res.status(201).json({ message: "Advertiser added successfully!", advertiser: newAdvertiser });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get Single Advertiser by ID
router.get("/:id", async (req, res) => {
  try {
    const advertiser = await Advertiser.findById(req.params.id);
    if (!advertiser) return res.status(404).json({ message: "Company not found" });

    res.status(200).json(advertiser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const advertiser = await Advertiser.findById(req.params.id);

    if (!advertiser) {
      return res.status(404).json({ message: "Company not found" });
    }

    // ✅ Ensure only the owner can update
    if (advertiser.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this company" });
    }

    // ✅ Update fields dynamically
    Object.assign(advertiser, req.body);
    await advertiser.save();

    res.status(200).json({ message: "Company updated successfully", advertiser });
  } catch (error) {
    console.error("Edit Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// ✅ Delete Company (Only Owner)
router.delete("/:id", protect, async (req, res) => {
  try {
    const advertiser = await Advertiser.findById(req.params.id);

    if (!advertiser) {
      return res.status(404).json({ message: "Company not found" });
    }

    // ✅ Ensure only the owner can delete
    if (advertiser.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this company" });
    }

    await advertiser.deleteOne();
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;