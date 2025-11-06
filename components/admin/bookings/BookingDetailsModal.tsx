"use client";
import { useState } from "react";
import {
  X,
  Package,
  User,
  MapPin,
  Weight,
  Calendar,
  DollarSign,
  Plane,
  Ship,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Booking {
  id: string;
  bookingNumber: string;
  senderName: string;
  recipientName: string;
  destination: string;

  weight: number;
  currentStatus: string;
  totalPrice: number;
  pickupDate: string;
  createdAt: string;
}

interface Props {
  booking: Booking;
  onClose: () => void;
}

const statusFlow = [
  {
    value: "pending_confirmation",
    label: "Pending Confirmation",
    color: "gray",
  },
  { value: "confirmed", label: "Confirmed", color: "blue" },
  { value: "pickup_scheduled", label: "Pickup Scheduled", color: "indigo" },
  { value: "picked_up", label: "Picked Up", color: "purple" },
  { value: "in_transit_to_hub", label: "In Transit to Hub", color: "violet" },
  { value: "arrived_at_hub", label: "Arrived at Hub", color: "fuchsia" },
  { value: "customs_processing", label: "Customs Processing", color: "yellow" },
  { value: "customs_cleared", label: "Customs Cleared", color: "amber" },
  { value: "departed_origin", label: "Departed Origin", color: "orange" },
  { value: "in_transit", label: "In Transit", color: "orange" },
  {
    value: "arrived_destination_port",
    label: "Arrived at Destination Port",
    color: "cyan",
  },
  {
    value: "customs_clearance_destination",
    label: "Customs Clearance (Destination)",
    color: "teal",
  },
  { value: "out_for_delivery", label: "Out for Delivery", color: "emerald" },
  { value: "delivered", label: "Delivered", color: "lime" },
];

const mockStatusHistory = [
  {
    id: "1",
    status: "confirmed",
    location: "Saint Martin Hub",
    notes: "Booking confirmed and payment received",
    updatedBy: "admin@freighttrack.com",
    createdAt: "2025-11-05T10:30:00",
  },
  {
    id: "2",
    status: "picked_up",
    location: "Philipsburg, Saint Martin",
    notes: "Package picked up from sender location",
    updatedBy: "driver@freighttrack.com",
    createdAt: "2025-11-06T14:20:00",
  },
  {
    id: "3",
    status: "in_transit",
    location: "Caribbean Sea",
    notes: "Package loaded on vessel Caribbean Express",
    updatedBy: "logistics@freighttrack.com",
    createdAt: "2025-11-07T08:00:00",
  },
];

export default function BookingDetailModal({ booking, onClose }: Props) {
  const [currentStatus, setCurrentStatus] = useState(booking.currentStatus);
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");

  const handleStatusUpdate = () => {
    alert(
      `Status updated to: ${
        statusFlow.find((s) => s.value === currentStatus)?.label
      }\nLocation: ${location}\nNotes: ${notes}`
    );
    setNotes("");
    setLocation("");
  };

  const getCurrentStatusIndex = () => {
    return statusFlow.findIndex((s) => s.value === currentStatus);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-8 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              Booking Details
            </h2>
            <p className="text-gray-600">Manage and track shipment status</p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-6">
              <div className="bg-gradient-to-br from-lime-50 to-white border-2 border-lime-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-lime-600 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Booking Number</div>
                    <div className="text-3xl font-black font-mono text-gray-900">
                      {booking.bookingNumber}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Shipment Information
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-semibold">Sender</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {booking.senderName}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-semibold">Recipient</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {booking.recipientName}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-semibold">Destination</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {booking.destination}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Weight className="w-4 h-4" />
                      <span className="text-sm font-semibold">Weight</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {booking.weight} kg
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-semibold">Pickup Date</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {new Date(booking.pickupDate).toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm font-semibold">Total Price</span>
                    </div>
                    <div className="text-2xl font-black text-lime-600">
                      ${booking.totalPrice}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Status History
                </h3>
                <div className="space-y-4">
                  {mockStatusHistory.map((history, index) => (
                    <div key={history.id} className="flex gap-4">
                      <div className="relative flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-500 to-lime-600 flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        {index < mockStatusHistory.length - 1 && (
                          <div className="w-1 h-full bg-gradient-to-b from-lime-500/50 to-transparent absolute top-10"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="bg-lime-50 border-2 border-lime-200 rounded-xl p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-gray-900">
                              {
                                statusFlow.find(
                                  (s) => s.value === history.status
                                )?.label
                              }
                            </h4>
                            <span className="text-xs text-gray-600">
                              {new Date(history.createdAt).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700 mb-2">
                            {history.notes}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {history.location}
                            </div>
                            <div>by {history.updatedBy}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 text-white sticky top-0">
                <h3 className="text-xl font-bold mb-4">Update Status</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Current Status
                    </label>
                    <select
                      value={currentStatus}
                      onChange={(e) => setCurrentStatus(e.target.value)}
                      className="w-full h-12 px-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white font-semibold focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20"
                    >
                      {statusFlow.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter current location..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full h-12 px-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Notes
                    </label>
                    <Textarea
                      placeholder="Add notes about this status update..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[100px] bg-gray-800 border-2 border-gray-700 text-white placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    onClick={handleStatusUpdate}
                    className="w-full h-12 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-bold rounded-xl shadow-lg"
                  >
                    Update Status
                  </Button>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Status Progress
                </h3>
                <div className="space-y-2">
                  {statusFlow.map((status, index) => {
                    const isCompleted = index <= getCurrentStatusIndex();
                    const isCurrent = status.value === currentStatus;
                    return (
                      <div
                        key={status.value}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                          isCurrent
                            ? "bg-lime-100 border-2 border-lime-500"
                            : isCompleted
                            ? "bg-gray-50 border border-gray-200"
                            : "bg-white border border-gray-200 opacity-50"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isCurrent
                              ? "bg-lime-600"
                              : isCompleted
                              ? "bg-gray-400"
                              : "bg-gray-200"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            isCurrent
                              ? "text-lime-900"
                              : isCompleted
                              ? "text-gray-700"
                              : "text-gray-400"
                          }`}
                        >
                          {status.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
