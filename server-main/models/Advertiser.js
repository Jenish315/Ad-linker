import mongoose from "mongoose";

const advertiserSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  typeOfProduction: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Advertiser = mongoose.model("Advertiser", advertiserSchema);
export default Advertiser;
