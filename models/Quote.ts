import mongoose, { Document, Model, Schema } from "mongoose";

export interface IQuote extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  locationType: "Business" | "Residence";
  services: string[];
  additionalDetails?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema = new Schema<IQuote>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    locationType: {
      type: String,
      enum: ["Business", "Residence"],
      required: [true, "Location type is required"],
    },
    services: {
      type: [String],
      default: [],
    },
    additionalDetails: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
QuoteSchema.index({ email: 1, createdAt: -1 });
QuoteSchema.index({ createdAt: -1 });
QuoteSchema.index({ locationType: 1 });

// Prevent model recompilation in dev
const Quote: Model<IQuote> =
  mongoose.models.Quote || mongoose.model<IQuote>("Quote", QuoteSchema);

export default Quote;

