import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface ITrackingEvent {
  _id?: Types.ObjectId;
  timestamp: Date;
  status: string;
  location: string;
  description: string;
  eventType: "pickup" | "transit" | "customs" | "delivery" | "exception" | "info";
  agentName?: string;
  facilityCode?: string;
  nextExpectedEvent?: string;
  photos?: string[];
  automated: boolean;
}

export interface ITrackingMilestones {
  orderConfirmed?: Date;
  packagePickedUp?: Date;
  inTransit?: Date;
  arrivedAtDestination?: Date;
  outForDelivery?: Date;
  delivered?: Date;
}

export interface IRealTimeLocation {
  latitude: number;
  longitude: number;
  timestamp: Date;
  locationName?: string;
  vessel?: string;
  flight?: string;
}

export interface ITracking {
  currentStatus: string;
  currentLocation: string;
  progressPercentage: number;
  estimatedDeliveryDate?: Date;
  milestones: ITrackingMilestones;
  events: ITrackingEvent[];
  realTimeLocation?: IRealTimeLocation;
}

export interface IOrderDeliveryRating {
  score: number;
  feedback?: string;
  ratedAt: Date;
}

export interface IOrderDelivery {
  attempts: number;
  instructions?: string;
  photos?: string[];
  signature?: string;
  deliveredBy?: string;
  notes?: string;
  rating?: IOrderDeliveryRating;
}

export interface IContactInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IShipmentDimensions {
  length: number;
  width: number;
  height: number;
}

export interface IShipment {
  destination: string;
  weight: number;
  dimensions: IShipmentDimensions;
  packageDescription?: string;
  pickupDate: Date;
  estimatedDeliveryDays: string;
  actualDeliveryDate?: Date;
}

export interface IPricing {
  baseRate: number;
  weightCost: number;
  totalAmount: number;
  currency: string;
}

export interface INotifications {
  smsEnabled: boolean;
  emailEnabled: boolean;
  lastNotificationSent?: Date;
  preferences: string[];
}

export interface IPayment {
  status: PaymentStatus;
  method?: string;
  transactionId?: string;
  paidAt?: Date;
}

export interface IOrder extends Document {
  customerId?: Types.ObjectId;
  bookingNumber: string;
  trackingNumber: string;
  status: OrderStatus;
  shipment: IShipment;
  sender: IContactInfo;
  recipient: IContactInfo;
  pricing: IPricing;
  tracking: ITracking;
  notifications: INotifications;
  delivery?: IOrderDelivery;
  payment: IPayment;
  notes?: string;
  specialInstructions?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DimensionsSchema = new Schema<IShipmentDimensions>(
  {
    length: { type: Number, required: true, min: 0 },
    width: { type: Number, required: true, min: 0 },
    height: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const ShipmentSchema = new Schema<IShipment>(
  {
    destination: { type: String, required: true, trim: true },
    weight: { type: Number, required: true, min: 0 },
    dimensions: { type: DimensionsSchema, required: true },
    packageDescription: { type: String, trim: true },
    pickupDate: { type: Date, required: true },
    estimatedDeliveryDays: { type: String, required: true, trim: true },
    actualDeliveryDate: { type: Date },
  },
  { _id: false }
);

const ContactInfoSchema = new Schema<IContactInfo>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const PricingSchema = new Schema<IPricing>(
  {
    baseRate: { type: Number, required: true, min: 0 },
    weightCost: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const TrackingMilestonesSchema = new Schema<ITrackingMilestones>(
  {
    orderConfirmed: { type: Date },
    packagePickedUp: { type: Date },
    inTransit: { type: Date },
    arrivedAtDestination: { type: Date },
    outForDelivery: { type: Date },
    delivered: { type: Date },
  },
  { _id: false }
);

const TrackingEventSchema = new Schema<ITrackingEvent>(
  {
    timestamp: { type: Date, required: true },
    status: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    eventType: {
      type: String,
      enum: ["pickup", "transit", "customs", "delivery", "exception", "info"],
      required: true,
    },
    agentName: { type: String, trim: true },
    facilityCode: { type: String, trim: true },
    nextExpectedEvent: { type: String, trim: true },
    photos: { type: [String], default: [] },
    automated: { type: Boolean, required: true },
  },
  { _id: true }
);

const RealTimeLocationSchema = new Schema<IRealTimeLocation>(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    locationName: { type: String, trim: true },
    vessel: { type: String, trim: true },
    flight: { type: String, trim: true },
  },
  { _id: false }
);

const TrackingSchema = new Schema<ITracking>(
  {
    currentStatus: { type: String, required: true, trim: true, default: "pending" },
    currentLocation: { type: String, required: true, trim: true, default: "Processing" },
    progressPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
    estimatedDeliveryDate: { type: Date },
    milestones: { type: TrackingMilestonesSchema, default: {} },
    events: { type: [TrackingEventSchema], default: [] },
    realTimeLocation: { type: RealTimeLocationSchema },
  },
  { _id: false }
);

const NotificationsSchema = new Schema<INotifications>(
  {
    smsEnabled: { type: Boolean, required: true, default: false },
    emailEnabled: { type: Boolean, required: true, default: false },
    lastNotificationSent: { type: Date },
    preferences: { type: [String], default: [] },
  },
  { _id: false }
);

const DeliveryRatingSchema = new Schema<IOrderDeliveryRating>(
  {
    score: { type: Number, required: true, min: 1, max: 5 },
    feedback: { type: String, trim: true },
    ratedAt: { type: Date, required: true },
  },
  { _id: false }
);

const DeliverySchema = new Schema<IOrderDelivery>(
  {
    attempts: { type: Number, required: true, default: 0, min: 0 },
    instructions: { type: String, trim: true },
    photos: { type: [String], default: [] },
    signature: { type: String, trim: true },
    deliveredBy: { type: String, trim: true },
    notes: { type: String, trim: true },
    rating: { type: DeliveryRatingSchema },
  },
  { _id: false }
);

const PaymentSchema = new Schema<IPayment>(
  {
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      required: true,
      default: "pending",
    },
    method: { type: String, trim: true },
    transactionId: { type: String, trim: true },
    paidAt: { type: Date },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "User" },
    bookingNumber: { type: String, required: true, unique: true, trim: true },
    trackingNumber: { type: String, required: true, unique: true, trim: true },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "picked_up",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      required: true,
      default: "pending",
    },
    shipment: { type: ShipmentSchema, required: true },
    sender: { type: ContactInfoSchema, required: true },
    recipient: { type: ContactInfoSchema, required: true },
    pricing: { type: PricingSchema, required: true },
    tracking: { type: TrackingSchema, required: true, default: {} },
    notifications: { type: NotificationsSchema, required: true, default: {} },
    delivery: { type: DeliverySchema },
    payment: { type: PaymentSchema, required: true, default: {} },
    notes: { type: String, trim: true },
    specialInstructions: { type: String, trim: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

OrderSchema.index({ customerId: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ "recipient.email": 1 });
OrderSchema.index({ "sender.email": 1 });

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;


