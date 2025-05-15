import mongoose from "mongoose";
import User from "./user.js";



const PublisherSchema = new mongoose.Schema({
 // Wall Details

      location: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true, // e.g. "Downtown, New York"
      },
      image: {
        type: String, // Store image URL of the wall
      },
      size:[ {
        length: {
          type: Number,
          required: true,
        },
        width: {
          type: Number,
          required: true,
        },
        }, 
    ],
      pricePerMonth: {
        type: Number, // Rent for ad space per month
        required: true,
      },
     traffic: {
        type: Number, // Number of people who pass by the wall daily
        required: true,
      },
     
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, // Link to Publisher Model
        required: true,
      },
     
  // Timestamp
  createdAt: {
    type: Date,
    default: Date.now,
  },

}, { timestamps: true });

const Publisher = mongoose.model("Publisher", PublisherSchema);
export default Publisher;   

