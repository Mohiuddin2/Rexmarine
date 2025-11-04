import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAddress {
  street: string;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
}

export interface ICompany {
  name?: string;
  title?: string;
  department?: string;
  partnerId?: string; // 9 digits, unique when present
  truckNumber?: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address: IAddress;
  company?: ICompany;
  image?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AddressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String, required: true },
  },
  { _id: false }
);

const CompanySchema = new Schema(
  {
    name: { type: String },
    title: { type: String },
    department: { type: String },
    partnerId: { 
      type: String,
      validate: {
        validator: (v: string) => !v || /^\d{9}$/.test(v),
        message: "Partner ID must be 9 digits",
      },
    },
    truckNumber: { type: String },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    name: { type: String, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: {
      type: AddressSchema,
      required: true,
    },
    company: {
      type: CompanySchema,
    },
    image: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ "company.partnerId": 1 }, { unique: true, sparse: true }); // unique when present
UserSchema.index({ "address.country": 1, "address.state": 1, "address.city": 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ firstName: "text", lastName: "text", "company.name": "text" });

// Pre-save hook to hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Prevent model recompilation in dev
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

