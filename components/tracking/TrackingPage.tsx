"use client";
import { useState } from "react";
import {
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  TruckIcon,
  Ship,
  Plane,
  Box,
  Weight,
  Ruler,
  Globe2,
  Anchor,
  PlaneTakeoff,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface TrackingEvent {
  id: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
}

interface ShipmentData {
  orderId: string;
  status: "in-transit" | "delivered" | "pending" | "customs";
  origin: string;
  destination: string;
  estimatedDelivery: string;
  weight: string;
  dimensions: string;
  carrier: string;
  trackingNumber: string;
  shippingMethod: "air" | "sea" | "ground";
  events: TrackingEvent[];
}

const mockShipmentData: Record<string, ShipmentData> = {
  "ORD-2024-001": {
    orderId: "ORD-2024-001",
    status: "in-transit",
    origin: "Miami, Florida",
    destination: "Trinidad and Tobago Port",
    estimatedDelivery: "Nov 12, 2025",
    weight: "2,450 kg",
    dimensions: "120 x 100 x 80 cm",
    carrier: "Global Freight Lines",
    trackingNumber: "GFL-8821445299",
    shippingMethod: "sea",
    events: [
      {
        id: "1",
        status: "Order Placed",
        location: "Miami, Florida",
        timestamp: "Oct 28, 09:30 AM",
        description: "Shipment order received and confirmed",
        completed: true,
      },
      {
        id: "2",
        status: "Cargo Loaded",
        location: "Trinidad and Tobago Port",
        timestamp: "Oct 30, 02:20 PM",
        description: "Container loaded onto vessel MV Pacific Star",
        completed: true,
      },
      {
        id: "3",
        status: "In Transit",
        location: "Pacific Ocean",
        timestamp: "Nov 05, 08:15 AM",
        description: "Vessel en route to destination port",
        completed: true,
      },
      {
        id: "4",
        status: "Arrival at Port",
        location: "Los Angeles Port, USA",
        timestamp: "Nov 10 (Estimated)",
        description: "Scheduled arrival at destination port",
        completed: false,
      },
      {
        id: "5",
        status: "Customs Clearance",
        location: "Los Angeles, USA",
        timestamp: "Nov 11 (Estimated)",
        description: "Customs processing and documentation",
        completed: false,
      },
      {
        id: "6",
        status: "Out for Delivery",
        location: "Los Angeles, USA",
        timestamp: "Nov 12 (Estimated)",
        description: "Final delivery to destination address",
        completed: false,
      },
    ],
  },
  "ORD-2024-002": {
    orderId: "ORD-2024-002",
    status: "delivered",
    origin: "Hamburg, Germany",
    destination: "New York, USA",
    estimatedDelivery: "Nov 02, 2025",
    weight: "1,820 kg",
    dimensions: "100 x 80 x 60 cm",
    carrier: "TransAtlantic Cargo",
    trackingNumber: "TAC-5532198844",
    shippingMethod: "air",
    events: [
      {
        id: "1",
        status: "Order Placed",
        location: "Hamburg, Germany",
        timestamp: "Oct 25, 11:00 AM",
        description: "Shipment order received and confirmed",
        completed: true,
      },
      {
        id: "2",
        status: "Departed Origin",
        location: "Hamburg Airport, Germany",
        timestamp: "Oct 26, 04:45 PM",
        description: "Cargo departed on flight TA-4521",
        completed: true,
      },
      {
        id: "3",
        status: "Arrived at Hub",
        location: "JFK Airport, New York",
        timestamp: "Oct 27, 03:20 AM",
        description: "Shipment arrived at destination airport",
        completed: true,
      },
      {
        id: "4",
        status: "Customs Cleared",
        location: "New York, USA",
        timestamp: "Oct 27, 06:30 PM",
        description: "Customs clearance completed",
        completed: true,
      },
      {
        id: "5",
        status: "Delivered",
        location: "New York, USA",
        timestamp: "Nov 02, 10:15 AM",
        description: "Package delivered successfully",
        completed: true,
      },
    ],
  },
};

export default function TrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [shipmentData, setShipmentData] = useState<ShipmentData | null>(null);
  const [error, setError] = useState("");

  const handleTrack = () => {
    setError("");
    const data = mockShipmentData[orderId.toUpperCase()];

    if (data) {
      setShipmentData(data);
    } else {
      setError("Order ID not found. Try: ORD-2024-001 or ORD-2024-002");
      setShipmentData(null);
    }
  };

  const getShippingIcon = (method: string) => {
    switch (method) {
      case "air":
        return Plane;
      case "sea":
        return Ship;
      case "ground":
        return TruckIcon;
      default:
        return Package;
    }
  };

  const currentStep =
    shipmentData?.events.filter((e) => e.completed).length || 0;
  const totalSteps = shipmentData?.events.length || 0;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-500 text-gray-900 relative overflow-hidden mt-24">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-lime-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="relative">
        <div className="max-w-[1600px] mx-auto px-6 py-20">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500/10 border border-lime-500/20 rounded-full mb-8">
              <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
              <span className="text-lime-700 text-sm font-semibold uppercase tracking-wider">
                Live Tracking System
              </span>
            </div>
            <h1 className="text-7xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                Track Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-lime-600 via-lime-500 to-emerald-500 bg-clip-text text-transparent">
                Shipment
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-time visibility across air, sea, and ground freight with
              precise location tracking
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-lime-500 via-lime-400 to-emerald-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter your tracking number or order ID"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                      className="pl-14 h-16 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 text-lg rounded-2xl"
                    />
                  </div>
                  <Button
                    onClick={handleTrack}
                    className="h-16 px-12 bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 hover:from-lime-600 hover:via-lime-700 hover:to-lime-800 text-white font-bold text-lg rounded-2xl shadow-lg shadow-lime-500/30 hover:shadow-lime-500/50 transition-all transform hover:scale-105"
                  >
                    Track Now
                  </Button>
                </div>
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {!shipmentData && (
              <div className="mt-16 grid grid-cols-3 gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-white backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                      <Globe2 className="w-6 h-6 text-lime-600" />
                    </div>
                    <h3 className="text-gray-900 font-bold mb-2">
                      Global Coverage
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Track shipments across 150+ countries
                    </p>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-white backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                      <PlaneTakeoff className="w-6 h-6 text-lime-600" />
                    </div>
                    <h3 className="text-gray-900 font-bold mb-2">
                      Multi-Modal
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Air, sea, and ground shipping options
                    </p>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-white backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                      <Anchor className="w-6 h-6 text-lime-600" />
                    </div>
                    <h3 className="text-gray-900 font-bold mb-2">
                      Real-Time Updates
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Live tracking with instant notifications
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {shipmentData && (
            <div className="animate-in fade-in duration-700 slide-in-from-bottom-4">
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 via-transparent to-lime-500/10 blur-3xl"></div>
                <div className="relative grid grid-cols-4 gap-6">
                  <div className="col-span-3 bg-white backdrop-blur-xl border border-gray-200 rounded-3xl p-10 shadow-2xl">
                    <div className="flex items-start justify-between mb-10">
                      <div>
                        <div className="text-gray-500 text-sm uppercase tracking-widest mb-3">
                          Tracking Number
                        </div>
                        <div className="text-5xl font-black text-gray-900 mb-6 font-mono tracking-tight">
                          {shipmentData.orderId}
                        </div>
                        <div className="flex items-center gap-4">
                          <div
                            className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-3 ${
                              shipmentData.status === "delivered"
                                ? "bg-lime-100 text-lime-700 border-2 border-lime-300"
                                : "bg-blue-100 text-blue-700 border-2 border-blue-300"
                            }`}
                          >
                            <div className="w-2.5 h-2.5 rounded-full bg-current animate-pulse"></div>
                            {shipmentData.status === "delivered"
                              ? "DELIVERED"
                              : "IN TRANSIT"}
                          </div>
                          {(() => {
                            const Icon = getShippingIcon(
                              shipmentData.shippingMethod
                            );
                            return (
                              <div className="px-5 py-2 rounded-full text-sm font-bold bg-gray-100 text-gray-700 border-2 border-gray-300 flex items-center gap-2">
                                <Icon className="w-5 h-5" />
                                {shipmentData.shippingMethod.toUpperCase()}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-inner">
                      <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime-500 to-lime-600 flex items-center justify-center shadow-lg shadow-lime-500/30">
                            <MapPin className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                              Origin Port
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                              {shipmentData.origin}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime-500 to-lime-600 flex items-center justify-center shadow-lg shadow-lime-500/30">
                            <MapPin className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                              Destination Port
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                              {shipmentData.destination}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                          <span>
                            Progress: {currentStep} of {totalSteps} checkpoints
                          </span>
                          <span className="text-lime-600 font-bold">
                            {Math.round(progressPercentage)}%
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-lime-500 via-lime-600 to-emerald-500 rounded-full transition-all duration-1000 ease-out relative shadow-lg"
                            style={{ width: `${progressPercentage}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {shipmentData.events.map((event, index) => (
                        <div
                          key={event.id}
                          className="relative flex gap-6 group"
                        >
                          <div className="relative flex flex-col items-center">
                            <div
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center z-10 transition-all ${
                                event.completed
                                  ? "bg-gradient-to-br from-lime-500 to-lime-600 shadow-lg shadow-lime-500/30"
                                  : "bg-gray-100 border-2 border-gray-300"
                              }`}
                            >
                              {event.completed ? (
                                <CheckCircle2 className="w-7 h-7 text-white" />
                              ) : (
                                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                              )}
                            </div>
                            {index < shipmentData.events.length - 1 && (
                              <div
                                className={`w-1 h-full absolute top-14 ${
                                  event.completed
                                    ? "bg-gradient-to-b from-lime-500/50 to-transparent"
                                    : "bg-gray-200"
                                }`}
                              ></div>
                            )}
                          </div>

                          <div
                            className={`flex-1 pb-4 ${
                              index === shipmentData.events.length - 1
                                ? "pb-0"
                                : ""
                            }`}
                          >
                            <div
                              className={`p-6 rounded-2xl border-2 transition-all ${
                                event.completed
                                  ? "bg-lime-50 border-lime-200 group-hover:border-lime-300 group-hover:shadow-md"
                                  : "bg-white border-gray-200"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <h3
                                  className={`font-bold text-xl ${
                                    event.completed
                                      ? "text-gray-900"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {event.status}
                                </h3>
                                <span
                                  className={`text-sm font-mono whitespace-nowrap ${
                                    event.completed
                                      ? "text-gray-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {event.timestamp}
                                </span>
                              </div>
                              <p
                                className={`text-base mb-3 ${
                                  event.completed
                                    ? "text-gray-700"
                                    : "text-gray-500"
                                }`}
                              >
                                {event.description}
                              </p>
                              <div className="flex items-center gap-2">
                                <MapPin
                                  className={`w-4 h-4 ${
                                    event.completed
                                      ? "text-lime-600"
                                      : "text-gray-400"
                                  }`}
                                />
                                <span
                                  className={`text-sm ${
                                    event.completed
                                      ? "text-gray-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {event.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-3xl p-7 shadow-xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-lime-100 rounded-xl flex items-center justify-center">
                          <Clock className="w-5 h-5 text-lime-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Delivery
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="p-5 bg-gradient-to-br from-lime-100 to-lime-50 rounded-2xl border border-lime-200">
                          <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">
                            Estimated Arrival
                          </div>
                          <div className="text-2xl font-black text-lime-700">
                            {shipmentData.estimatedDelivery}
                          </div>
                        </div>
                        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
                          <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">
                            Carrier
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {shipmentData.carrier}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-3xl p-7 shadow-xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-lime-100 rounded-xl flex items-center justify-center">
                          <Box className="w-5 h-5 text-lime-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Package
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <Weight className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">
                              Weight
                            </div>
                            <div className="text-base font-bold text-gray-900">
                              {shipmentData.weight}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <Ruler className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">
                              Dimensions
                            </div>
                            <div className="text-base font-bold text-gray-900">
                              {shipmentData.dimensions}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <Package className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">
                              Tracking #
                            </div>
                            <div className="text-sm font-bold text-gray-900 font-mono">
                              {shipmentData.trackingNumber}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
