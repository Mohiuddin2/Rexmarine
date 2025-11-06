"use client";
import { useState } from "react";
import {
  Package,
  MapPin,
  Calendar,
  Ship,
  Plane,
  DollarSign,
  User,
  Phone,
  Mail,
  Weight,
  Box,
  Ruler,
  ChevronRight,
  Check,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface ShipmentDetails {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientAddress: string;
  destination: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  packageDescription: string;
  shippingMethod: "air" | "sea" | "";
  pickupDate: string;
}

const caribbeanIslands = [
  { value: "antigua", label: "Antigua and Barbuda", price: 45, days: "3-5" },
  { value: "aruba", label: "Aruba", price: 50, days: "3-4" },
  { value: "bahamas", label: "Bahamas", price: 55, days: "4-6" },
  { value: "barbados", label: "Barbados", price: 48, days: "3-5" },
  { value: "belize", label: "Belize", price: 60, days: "5-7" },
  { value: "bermuda", label: "Bermuda", price: 65, days: "4-6" },
  { value: "bonaire", label: "Bonaire", price: 52, days: "3-4" },
  { value: "curacao", label: "Curaçao", price: 50, days: "3-4" },
  { value: "dominica", label: "Dominica", price: 42, days: "2-4" },
  { value: "dominican", label: "Dominican Republic", price: 40, days: "2-3" },
  { value: "grenada", label: "Grenada", price: 46, days: "3-5" },
  { value: "guadeloupe", label: "Guadeloupe", price: 38, days: "2-3" },
  { value: "jamaica", label: "Jamaica", price: 50, days: "4-5" },
  { value: "martinique", label: "Martinique", price: 38, days: "2-3" },
  { value: "montserrat", label: "Montserrat", price: 44, days: "3-4" },
  { value: "puerto-rico", label: "Puerto Rico", price: 48, days: "3-5" },
  { value: "saba", label: "Saba", price: 35, days: "1-2" },
  { value: "sint-eustatius", label: "Sint Eustatius", price: 35, days: "1-2" },
  { value: "st-kitts", label: "St. Kitts and Nevis", price: 42, days: "2-4" },
  { value: "st-lucia", label: "St. Lucia", price: 44, days: "3-4" },
  {
    value: "st-vincent",
    label: "St. Vincent and the Grenadines",
    price: 46,
    days: "3-5",
  },
  { value: "trinidad", label: "Trinidad and Tobago", price: 52, days: "4-5" },
  { value: "turks", label: "Turks and Caicos", price: 58, days: "4-6" },
  { value: "usvi", label: "US Virgin Islands", price: 48, days: "3-5" },
  { value: "bvi", label: "British Virgin Islands", price: 45, days: "3-4" },
];

const shippingMethods = [
  {
    id: "air",
    name: "Air Freight",
    description: "Express delivery",
    icon: Plane,
    multiplier: 2.5,
    features: [
      "Fastest delivery",
      "Climate controlled",
      "Real-time tracking",
      "Insurance included",
    ],
  },
  {
    id: "sea",
    name: "Sea Freight",
    description: "Economical option",
    icon: Ship,
    multiplier: 1,
    features: [
      "Cost effective",
      "Large cargo capacity",
      "Eco-friendly",
      "Reliable service",
    ],
  },
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");
  const [formData, setFormData] = useState<ShipmentDetails>({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress: "",
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    recipientAddress: "",
    destination: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    packageDescription: "",
    shippingMethod: "",
    pickupDate: "",
  });

  const updateFormData = (field: keyof ShipmentDetails, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculatePrice = () => {
    const island = caribbeanIslands.find(
      (i) => i.value === formData.destination
    );
    if (!island || !formData.weight || !formData.shippingMethod) return 0;

    const basePrice = island.price;
    const weightPrice = parseFloat(formData.weight) * 2.5;
    const method = shippingMethods.find(
      (m) => m.id === formData.shippingMethod
    );
    const methodMultiplier = method?.multiplier || 1;

    return Math.round((basePrice + weightPrice) * methodMultiplier);
  };

  const getEstimatedDelivery = () => {
    const island = caribbeanIslands.find(
      (i) => i.value === formData.destination
    );
    if (!island || !formData.shippingMethod) return "";

    if (formData.shippingMethod === "air") {
      return island.days;
    } else {
      const [min, max] = island.days.split("-").map(Number);
      return `${min * 2}-${max * 2}`;
    }
  };

  const handleSubmit = () => {
    const generatedBookingNumber = `BK${Date.now().toString().slice(-8)}`;
    setBookingNumber(generatedBookingNumber);
    setIsSubmitted(true);
  };

  const validateStep = () => {
    if (step === 1) {
      return (
        formData.destination &&
        formData.weight &&
        formData.length &&
        formData.width &&
        formData.height &&
        formData.pickupDate
      );
    }
    if (step === 2) {
      return (
        formData.senderName &&
        formData.senderEmail &&
        formData.senderPhone &&
        formData.senderAddress &&
        formData.recipientName &&
        formData.recipientEmail &&
        formData.recipientPhone &&
        formData.recipientAddress
      );
    }
    return true;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-2xl text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-lime-500 to-lime-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-lime-500/30">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your shipment has been successfully booked
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 mb-8">
              <div className="text-sm text-gray-600 mb-2">
                Booking Reference Number
              </div>
              <div className="text-4xl font-black font-mono text-lime-600 mb-4">
                {bookingNumber}
              </div>
              <div className="text-sm text-gray-600">
                Save this number to track your shipment
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 text-left">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-xs text-gray-600 mb-1">Destination</div>
                <div className="font-bold text-gray-900">
                  {
                    caribbeanIslands.find(
                      (i) => i.value === formData.destination
                    )?.label
                  }
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-xs text-gray-600 mb-1">
                  Estimated Delivery
                </div>
                <div className="font-bold text-gray-900">
                  {getEstimatedDelivery()} days
                </div>
              </div>
              {/* <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-xs text-gray-600 mb-1">
                  Shipping Method
                </div>
                <div className="font-bold text-gray-900">
                  {
                    shippingMethods.find(
                      (m) => m.id === formData.shippingMethod
                    )?.name
                  }
                </div>
              </div> */}
              <div className="bg-lime-50 p-4 rounded-xl border border-lime-200">
                <div className="text-xs text-gray-600 mb-1">Total Amount</div>
                <div className="font-black text-2xl text-lime-600">
                  ${calculatePrice()}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <strong className="text-blue-900">Next Steps:</strong> We'll
                  send a confirmation email to{" "}
                  <strong>{formData.senderEmail}</strong> with pickup details
                  and payment instructions.
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
                setFormData({
                  senderName: "",
                  senderEmail: "",
                  senderPhone: "",
                  senderAddress: "",
                  recipientName: "",
                  recipientEmail: "",
                  recipientPhone: "",
                  recipientAddress: "",
                  destination: "",
                  weight: "",
                  length: "",
                  width: "",
                  height: "",
                  packageDescription: "",
                  shippingMethod: "",
                  pickupDate: "",
                });
              }}
              className="h-14 px-12 bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 hover:from-lime-600 hover:via-lime-700 hover:to-lime-800 text-white font-bold text-lg rounded-xl shadow-lg"
            >
              Book Another Shipment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden mt-24">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="relative">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500/10 border border-lime-500/20 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-lime-600" />
              <span className="text-lime-700 text-sm font-semibold uppercase tracking-wider">
                Saint Martin Hub
              </span>
            </div>
            <h1 className="text-6xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                Book Your Caribbean
              </span>
              <br />
              <span className="bg-gradient-to-r from-lime-600 via-lime-500 to-emerald-500 bg-clip-text text-transparent">
                Shipment
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Fast, reliable shipping to all Caribbean islands from our Saint
              Martin hub
            </p>
          </div>

          <div className="flex gap-3 mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center gap-3 flex-1">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                    step >= num
                      ? "bg-gradient-to-br from-lime-500 to-lime-600 text-white shadow-lg shadow-lime-500/30"
                      : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                  }`}
                >
                  {step > num ? <Check className="w-6 h-6" /> : num}
                </div>
                <div className="flex-1">
                  <div
                    className={`text-sm font-bold ${
                      step >= num ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {num === 1
                      ? "Shipment Details"
                      : num === 2
                      ? "Contact Information"
                      : "Review & Confirm"}
                  </div>
                  <div
                    className={`h-1.5 rounded-full mt-2 transition-all ${
                      step > num
                        ? "bg-lime-500"
                        : step === num
                        ? "bg-lime-300"
                        : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-xl">
                {step === 1 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Shipment Details
                      </h2>
                      <p className="text-gray-600">
                        Tell us about your package and destination
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Destination Island *
                        </label>
                        <select
                          value={formData.destination}
                          onChange={(e) =>
                            updateFormData("destination", e.target.value)
                          }
                          className="w-full h-14 px-4 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 transition-all text-base font-medium"
                        >
                          <option value="">Select destination island</option>
                          {caribbeanIslands.map((island) => (
                            <option key={island.value} value={island.value}>
                              {island.label} - Base rate: ${island.price}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Shipping Method *
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {shippingMethods.map((method) => {
                            const Icon = method.icon;
                            return (
                              <button
                                key={method.id}
                                type="button"
                                onClick={() =>
                                  updateFormData(
                                    "shippingMethod",
                                    method.id as "air" | "sea"
                                  )
                                }
                                className={`p-6 rounded-2xl border-2 transition-all text-left group ${
                                  formData.shippingMethod === method.id
                                    ? "border-lime-500 bg-lime-50 shadow-lg"
                                    : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
                                }`}
                              >
                                <div className="flex items-start gap-4 mb-4">
                                  <div
                                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                                      formData.shippingMethod === method.id
                                        ? "bg-lime-500 text-white shadow-lg"
                                        : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                                    }`}
                                  >
                                    <Icon className="w-7 h-7" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-bold text-lg text-gray-900 mb-1">
                                      {method.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {method.description}
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  {method.features.map((feature, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center gap-2 text-sm text-gray-600"
                                    >
                                      <Check className="w-4 h-4 text-lime-600" />
                                      {feature}
                                    </div>
                                  ))}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div> */}

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Package Weight (kg) *
                        </label>
                        <div className="relative">
                          <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="Enter weight in kilograms"
                            value={formData.weight}
                            onChange={(e) =>
                              updateFormData("weight", e.target.value)
                            }
                            className="pl-12 h-14 bg-gray-50 border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 text-base rounded-xl font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Package Dimensions (cm) *
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="relative">
                            <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="Length"
                              value={formData.length}
                              onChange={(e) =>
                                updateFormData("length", e.target.value)
                              }
                              className="pl-12 h-14 bg-gray-50 border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 text-base rounded-xl font-medium"
                            />
                          </div>
                          <div className="relative">
                            <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="Width"
                              value={formData.width}
                              onChange={(e) =>
                                updateFormData("width", e.target.value)
                              }
                              className="pl-12 h-14 bg-gray-50 border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 text-base rounded-xl font-medium"
                            />
                          </div>
                          <div className="relative">
                            <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="Height"
                              value={formData.height}
                              onChange={(e) =>
                                updateFormData("height", e.target.value)
                              }
                              className="pl-12 h-14 bg-gray-50 border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 text-base rounded-xl font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Package Description
                        </label>
                        <Textarea
                          placeholder="Describe the contents of your package (e.g., electronics, clothing, documents)..."
                          value={formData.packageDescription}
                          onChange={(e) =>
                            updateFormData("packageDescription", e.target.value)
                          }
                          className="min-h-[120px] bg-gray-50 border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 text-base rounded-xl resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Preferred Pickup Date *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="date"
                            value={formData.pickupDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) =>
                              updateFormData("pickupDate", e.target.value)
                            }
                            className="pl-12 h-14 bg-gray-50 border-2 border-gray-300 text-gray-900 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 text-base rounded-xl font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Contact Information
                      </h2>
                      <p className="text-gray-600">
                        Sender and recipient details for shipping
                      </p>
                    </div>

                    <div className="space-y-8">
                      <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          Sender Information
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <Input
                              type="text"
                              placeholder="John Doe"
                              value={formData.senderName}
                              onChange={(e) =>
                                updateFormData("senderName", e.target.value)
                              }
                              className="h-12 bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 rounded-xl font-medium"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">
                                Email *
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                  type="email"
                                  placeholder="john@example.com"
                                  value={formData.senderEmail}
                                  onChange={(e) =>
                                    updateFormData(
                                      "senderEmail",
                                      e.target.value
                                    )
                                  }
                                  className="pl-10 h-12 bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 rounded-xl font-medium"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">
                                Phone *
                              </label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                  type="tel"
                                  placeholder="+1 (721) 555-0000"
                                  value={formData.senderPhone}
                                  onChange={(e) =>
                                    updateFormData(
                                      "senderPhone",
                                      e.target.value
                                    )
                                  }
                                  className="pl-10 h-12 bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 rounded-xl font-medium"
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Pickup Address (Saint Martin) *
                            </label>
                            <Textarea
                              placeholder="Full address including street, city, and postal code"
                              value={formData.senderAddress}
                              onChange={(e) =>
                                updateFormData("senderAddress", e.target.value)
                              }
                              className="min-h-[80px] bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 rounded-xl resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-lime-50 to-white p-8 rounded-2xl border-2 border-lime-300 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-lime-600 rounded-xl flex items-center justify-center shadow-lg">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          Recipient Information
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <Input
                              type="text"
                              placeholder="Jane Smith"
                              value={formData.recipientName}
                              onChange={(e) =>
                                updateFormData("recipientName", e.target.value)
                              }
                              className="h-12 bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 rounded-xl font-medium"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">
                                Email *
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                  type="email"
                                  placeholder="jane@example.com"
                                  value={formData.recipientEmail}
                                  onChange={(e) =>
                                    updateFormData(
                                      "recipientEmail",
                                      e.target.value
                                    )
                                  }
                                  className="pl-10 h-12 bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 rounded-xl font-medium"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">
                                Phone *
                              </label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                  type="tel"
                                  placeholder="+1 (555) 000-0000"
                                  value={formData.recipientPhone}
                                  onChange={(e) =>
                                    updateFormData(
                                      "recipientPhone",
                                      e.target.value
                                    )
                                  }
                                  className="pl-10 h-12 bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 rounded-xl font-medium"
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Delivery Address *
                            </label>
                            <Textarea
                              placeholder="Full delivery address at destination island"
                              value={formData.recipientAddress}
                              onChange={(e) =>
                                updateFormData(
                                  "recipientAddress",
                                  e.target.value
                                )
                              }
                              className="min-h-[80px] bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 rounded-xl resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Review Your Booking
                      </h2>
                      <p className="text-gray-600">
                        Please verify all details before confirming
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-200">
                        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                          <Box className="w-5 h-5 text-lime-600" />
                          Shipment Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-gray-600 mb-1">
                              Destination
                            </div>
                            <div className="font-bold text-gray-900">
                              {caribbeanIslands.find(
                                (i) => i.value === formData.destination
                              )?.label || "N/A"}
                            </div>
                          </div>
                          {/* <div>
                            <div className="text-xs text-gray-600 mb-1">
                              Shipping Method
                            </div>
                            <div className="font-bold text-gray-900">
                              {shippingMethods.find(
                                (m) => m.id === formData.shippingMethod
                              )?.name || "N/A"}
                            </div>
                          </div> */}
                          <div>
                            <div className="text-xs text-gray-600 mb-1">
                              Weight
                            </div>
                            <div className="font-bold text-gray-900">
                              {formData.weight} kg
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 mb-1">
                              Dimensions (L × W × H)
                            </div>
                            <div className="font-bold text-gray-900">
                              {formData.length} × {formData.width} ×{" "}
                              {formData.height} cm
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 mb-1">
                              Pickup Date
                            </div>
                            <div className="font-bold text-gray-900">
                              {new Date(formData.pickupDate).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 mb-1">
                              Est. Delivery
                            </div>
                            <div className="font-bold text-lime-600">
                              {getEstimatedDelivery()} business days
                            </div>
                          </div>
                        </div>
                        {formData.packageDescription && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="text-xs text-gray-600 mb-1">
                              Package Description
                            </div>
                            <div className="text-sm text-gray-700">
                              {formData.packageDescription}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
                          <h3 className="font-bold text-gray-900 mb-4">
                            Sender
                          </h3>
                          <div className="space-y-2 text-sm">
                            <p className="font-bold text-gray-900">
                              {formData.senderName}
                            </p>
                            <p className="text-gray-600">
                              {formData.senderEmail}
                            </p>
                            <p className="text-gray-600">
                              {formData.senderPhone}
                            </p>
                            <p className="text-gray-700 mt-3 pt-3 border-t border-gray-300">
                              {formData.senderAddress}
                            </p>
                          </div>
                        </div>

                        <div className="bg-lime-50 p-6 rounded-2xl border-2 border-lime-200">
                          <h3 className="font-bold text-gray-900 mb-4">
                            Recipient
                          </h3>
                          <div className="space-y-2 text-sm">
                            <p className="font-bold text-gray-900">
                              {formData.recipientName}
                            </p>
                            <p className="text-gray-600">
                              {formData.recipientEmail}
                            </p>
                            <p className="text-gray-600">
                              {formData.recipientPhone}
                            </p>
                            <p className="text-gray-700 mt-3 pt-3 border-t border-lime-300">
                              {formData.recipientAddress}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-10 pt-8 border-t border-gray-200">
                  {step > 1 && (
                    <Button
                      onClick={() => setStep(step - 1)}
                      variant="outline"
                      className="h-14 px-8 text-base font-bold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
                    >
                      Back
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button
                      onClick={() => setStep(step + 1)}
                      disabled={!validateStep()}
                      className="h-14 px-8 text-base font-bold bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 hover:from-lime-600 hover:via-lime-700 hover:to-lime-800 text-white rounded-xl shadow-lg shadow-lime-500/30 ml-auto flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="h-14 px-8 text-base font-bold bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 hover:from-lime-600 hover:via-lime-700 hover:to-lime-800 text-white rounded-xl shadow-lg shadow-lime-500/30 ml-auto flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Confirm Booking
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl sticky top-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-lime-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Price Summary
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Rate</span>
                    <span className="font-bold text-gray-900">
                      $
                      {caribbeanIslands.find(
                        (i) => i.value === formData.destination
                      )?.price || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Weight ({formData.weight || 0} kg × $2.50)
                    </span>
                    <span className="font-bold text-gray-900">
                      $
                      {formData.weight
                        ? (parseFloat(formData.weight) * 2.5).toFixed(0)
                        : 0}
                    </span>
                  </div>
                  {/* <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping Method</span>
                    <span className="font-bold text-gray-900">
                      {formData.shippingMethod === "air"
                        ? "× 2.5"
                        : formData.shippingMethod === "sea"
                        ? "× 1.0"
                        : "-"}
                    </span>
                  </div> */}
                  {getEstimatedDelivery() && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Est. Delivery</span>
                      <span className="font-bold text-lime-600">
                        {getEstimatedDelivery()} days
                      </span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-gray-200 my-6"></div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">
                    Total Estimate
                  </span>
                  <span className="text-4xl font-black bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
                    ${calculatePrice()}
                  </span>
                </div>

                <div className="bg-lime-50 border-2 border-lime-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">💡 Tip:</span> Sea freight takes
                    longer but costs less. Air freight is faster for
                    time-sensitive shipments.
                  </p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-xs text-gray-600">
                    Final price may vary based on actual package dimensions and
                    any additional services requested.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-8 shadow-xl text-white">
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="text-gray-300 text-sm mb-6">
                  Our team is available 24/7 to assist with your booking
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-lime-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-lime-400" />
                    </div>
                    <span>+14078666667</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-lime-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-lime-400" />
                    </div>
                    <span>support@rexmarine.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
