import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Electronics", "Documents", "Clothing", "Jewellery", "Accessories", "Others"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    dateLost: {
      type: Date,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contactInfo: {
      type: String, 
      required: true,
    },
    status: {
      type: String,
      enum: ["Lost", "Found", "Resolved"],
      default: "Lost",
    },
  },
  { timestamps: true }
);

const LostItem = mongoose.model("LostItem", lostItemSchema);
export default LostItem;
