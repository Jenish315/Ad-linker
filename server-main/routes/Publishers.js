import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import { protect } from "../middleware/authMiddleware.js";
import Publisher from "../models/Publisher.js";

dotenv.config();

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Set Up Multer with Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Adlinker", // Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed formats
    public_id: (req, file) => Date.now() + "-" + file.originalname, // Unique filename
  },
});

const upload = multer({ storage });

const router = express.Router();

/* =====================================================
✅ Create Publisher & Upload Image to Cloudinary
===================================================== */
router.post("/publishers", protect, upload.single("image"), async (req, res) => {
  try {
    console.log("✅ Received request body:", req.body);
    console.log("✅ Received file:", req.file);

    const { location, area, length, width, pricePerMonth, traffic } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    if (!location || !area || !length || !width || !pricePerMonth || !traffic) {
      return res.status(400).json({ message: "All fields are required", receivedData: req.body });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image upload failed: No file received" });
    }

    const imageUrl = req.file.path;

    // ✅ Fix: Convert length and width to an object and store correctly
    const newPublisher = new Publisher({
      location,
      area,
      image: imageUrl,
      size: { length: parseFloat(length), width: parseFloat(width) },
      pricePerMonth,
      traffic,
      createdBy: req.user.id,
    });

    const savedPublisher = await newPublisher.save();

    res.status(201).json({
      message: "Publisher created successfully",
      savedPublisher,
    });
  } catch (error) {
    console.error("❌ Error saving publisher:", error);
    res.status(500).json({ message: "Error creating publisher", error: error.message });
  }
});


/* =====================================================
✅ Get All Publishers
===================================================== */
router.get("/publishers", async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.status(200).json(publishers);
  } catch (error) {
    console.error("Error fetching publishers:", error);
    res.status(500).json({ message: "Error fetching publishers", error: error.message });
  }
});

/* =====================================================
✅ Get Single Publisher by ID
===================================================== */
router.get("/publishers/:id", async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) {
      return res.status(404).json({ message: "Publisher not found" });
    }
    res.status(200).json(publisher);
  } catch (error) {
    console.error("Error fetching publisher:", error);
    res.status(500).json({ message: "Error fetching publisher", error: error.message });
  }
});

/* =====================================================
✅ Delete Publisher
===================================================== */
router.delete("/publishers/:id", protect, async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) {
      return res.status(404).json({ message: "Publisher not found" });
    }

    // ✅ Ensure User is Authorized
    if (publisher.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You can only delete your own publishers" });
    }

    await publisher.deleteOne();
    res.status(200).json({ message: "Publisher deleted successfully" });
  } catch (error) {
    console.error("Error deleting publisher:", error);
    res.status(500).json({ message: "Error deleting publisher", error: error.message });
  }
});

/* =====================================================
✅ Update Publisher
===================================================== */
router.put("/publishers/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) return res.status(404).json({ message: "Publisher not found" });

    if (publisher.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // ✅ Update Image Only If a New File is Uploaded
    if (req.file) {
      publisher.image = req.file.path;
    }

    // ✅ Ensure size is stored as an object
    if (req.body.length && req.body.width) {
      publisher.size = {
        length: parseFloat(req.body.length), // Convert to number
        width: parseFloat(req.body.width),
      };
    }

    // ✅ Update Other Fields (excluding image & size separately handled above)
    publisher.location = req.body.location || publisher.location;
    publisher.area = req.body.area || publisher.area;
    publisher.pricePerMonth = req.body.pricePerMonth || publisher.pricePerMonth;
    publisher.traffic = req.body.traffic || publisher.traffic;

    await publisher.save();

    res.status(200).json({ message: "Publisher updated successfully", publisher });
  } catch (error) {
    console.error("Error updating publisher:", error);
    res.status(500).json({ message: "Error updating publisher", error: error.message });
  }
});


export default router;