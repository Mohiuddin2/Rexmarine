"use client";
import { useState } from "react";
import {
  Package,
  MapPin,
  Calendar,
  Ship,
  Plane,
  Clock,
  CheckCircle2,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";

interface Booking {
  id: string;
  bookingNumber: string;
  destination: string;
  destinationLabel: string;
  shippingMethod: "air" | "sea";
  currentStatus: string;
  currentLocation: string;
  pickupDate: string;
  estimatedDelivery: string;
  createdAt: string;
}

export default function MyBookingsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "delivered">("all");

  const mockBookings: Booking[] = [
    {
      id: "1",
      bookingNumber: "BK12345678",
      destination: "jamaica",
      destinationLabel: "Jamaica",
      shippingMethod: "sea",
      currentStatus: "in_transit",
      currentLocation: "Caribbean Sea - En route to Kingston",
      pickupDate: "2025-11-05",
      estimatedDelivery: "2025-11-10",
      createdAt: "2025-11-05",
    },
    {
      id: "2",
      bookingNumber: "BK12345679",
      destination: "barbados",
      destinationLabel: "Barbados",
      shippingMethod: "sea",
      currentStatus: "delivered",
      currentLocation: "Bridgetown, Barbados - Delivered",
      pickupDate: "2025-10-28",
      estimatedDelivery: "2025-11-04",
      createdAt: "2025-10-25",
    },
    {
      id: "3",
      bookingNumber: "BK12345680",
      destination: "trinidad",
      destinationLabel: "Trinidad and Tobago",
      shippingMethod: "sea",
      currentStatus: "confirmed",
      currentLocation: "Saint Martin Hub - Awaiting pickup",
      pickupDate: "2025-11-10",
      estimatedDelivery: "2025-11-15",
      createdAt: "2025-11-06",
    },
    {
      id: "4",
      bookingNumber: "BK12345681",
      destination: "aruba",
      destinationLabel: "Aruba",
      shippingMethod: "sea",
      currentStatus: "customs_processing",
      currentLocation: "Oranjestad Port - Customs clearance",
      pickupDate: "2025-11-01",
      estimatedDelivery: "2025-11-08",
      createdAt: "2025-10-29",
    },
    {
      id: "5",
      bookingNumber: "BK12345682",
      destination: "curacao",
      destinationLabel: "Curaçao",
      shippingMethod: "sea",
      currentStatus: "out_for_delivery",
      currentLocation: "Willemstad - Out for delivery",
      pickupDate: "2025-11-06",
      estimatedDelivery: "2025-11-09",
      createdAt: "2025-11-04",
    },
  ];

  const statusLabels: Record<string, string> = {
    pending_confirmation: "Pending Confirmation",
    confirmed: "Confirmed",
    pickup_scheduled: "Pickup Scheduled",
    picked_up: "Picked Up",
    in_transit_to_hub: "In Transit to Hub",
    arrived_at_hub: "At Hub",
    customs_processing: "Customs Processing",
    customs_cleared: "Customs Cleared",
    departed_origin: "Departed",
    in_transit: "In Transit",
    arrived_destination_port: "Arrived at Port",
    customs_clearance_destination: "Customs Clearance",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
  };

  const statusColors: Record<string, string> = {
    pending_confirmation: "bg-gray-100 text-gray-700 border-gray-300",
    confirmed: "bg-blue-100 text-blue-700 border-blue-300",
    pickup_scheduled: "bg-indigo-100 text-indigo-700 border-indigo-300",
    picked_up: "bg-purple-100 text-purple-700 border-purple-300",
    in_transit_to_hub: "bg-violet-100 text-violet-700 border-violet-300",
    arrived_at_hub: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300",
    customs_processing: "bg-yellow-100 text-yellow-700 border-yellow-300",
    customs_cleared: "bg-amber-100 text-amber-700 border-amber-300",
    departed_origin: "bg-orange-100 text-orange-700 border-orange-300",
    in_transit: "bg-orange-100 text-orange-700 border-orange-300",
    arrived_destination_port: "bg-cyan-100 text-cyan-700 border-cyan-300",
    customs_clearance_destination: "bg-teal-100 text-teal-700 border-teal-300",
    out_for_delivery: "bg-emerald-100 text-emerald-700 border-emerald-300",
    delivered: "bg-lime-100 text-lime-700 border-lime-300",
  };

  const getStatusIcon = (status: string) => {
    if (status === "delivered") return CheckCircle2;
    if (status.includes("transit")) return Ship;
    return Clock;
  };

  const filteredBookings = mockBookings.filter((booking) => {
    if (filter === "active") return booking.currentStatus !== "delivered";
    if (filter === "delivered") return booking.currentStatus === "delivered";
    return true;
  });

  const stats = {
    total: mockBookings.length,
    active: mockBookings.filter((b) => b.currentStatus !== "delivered").length,
    delivered: mockBookings.filter((b) => b.currentStatus === "delivered")
      .length,
  };

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
            <h1 className="text-6xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                My Bookings
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Track all your shipments in one place
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => setFilter("all")}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                filter === "all"
                  ? "border-lime-500 bg-lime-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-4xl font-black text-gray-900">
                  {stats.total}
                </div>
                <Package
                  className={`w-8 h-8 ${
                    filter === "all" ? "text-lime-600" : "text-gray-400"
                  }`}
                />
              </div>
              <div className="text-sm font-semibold text-gray-600">
                All Bookings
              </div>
            </button>

            <button
              onClick={() => setFilter("active")}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                filter === "active"
                  ? "border-lime-500 bg-lime-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-4xl font-black text-orange-600">
                  {stats.active}
                </div>
                <Clock
                  className={`w-8 h-8 ${
                    filter === "active" ? "text-orange-600" : "text-gray-400"
                  }`}
                />
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Active Shipments
              </div>
            </button>

            <button
              onClick={() => setFilter("delivered")}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                filter === "delivered"
                  ? "border-lime-500 bg-lime-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-4xl font-black text-lime-600">
                  {stats.delivered}
                </div>
                <CheckCircle2
                  className={`w-8 h-8 ${
                    filter === "delivered" ? "text-lime-600" : "text-gray-400"
                  }`}
                />
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Delivered
              </div>
            </button>
          </div>

          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const StatusIcon = getStatusIcon(booking.currentStatus);
              const isDelivered = booking.currentStatus === "delivered";

              return (
                <div
                  key={booking.id}
                  className={`bg-white border-2 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all ${
                    isDelivered
                      ? "border-lime-200 bg-gradient-to-r from-white to-lime-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        booking.shippingMethod === "air"
                          ? "bg-blue-100"
                          : "bg-teal-100"
                      }`}
                    >
                      {booking.shippingMethod === "air" ? (
                        <Plane className="w-10 h-10 text-blue-600" />
                      ) : (
                        <Ship className="w-10 h-10 text-teal-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-black font-mono text-gray-900">
                          {booking.bookingNumber}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span className="text-lg font-bold">
                            {booking.destinationLabel}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mb-3">
                        <span
                          className={`px-4 py-2 rounded-xl text-sm font-bold border-2 flex items-center gap-2 ${
                            statusColors[booking.currentStatus]
                          }`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {statusLabels[booking.currentStatus]}
                        </span>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="font-semibold">
                            {booking.currentLocation}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>
                            Pickup:{" "}
                            <span className="font-semibold text-gray-900">
                              {new Date(booking.pickupDate).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>
                            {isDelivered ? "Delivered" : "Est. Delivery"}:{" "}
                            <span
                              className={`font-semibold ${
                                isDelivered ? "text-lime-700" : "text-gray-900"
                              }`}
                            >
                              {new Date(
                                booking.estimatedDelivery
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Booked{" "}
                          {new Date(booking.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" }
                          )}
                        </div>
                      </div>
                    </div>

                    <Button className="h-12 px-6 bg-lime-600 hover:bg-lime-700 text-white font-bold rounded-xl flex items-center gap-2 flex-shrink-0">
                      <Eye className="w-5 h-5" />
                      View Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBookings.length === 0 && (
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No bookings found
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === "active" &&
                  "You have no active shipments at the moment."}
                {filter === "delivered" &&
                  "You have no delivered shipments yet."}
                {filter === "all" && "You haven't made any bookings yet."}
              </p>
              <Button className="h-12 px-8 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-bold rounded-xl">
                Book a Shipment
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
