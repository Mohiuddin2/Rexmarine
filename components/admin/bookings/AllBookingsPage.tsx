"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Plane,
  Ship,
  Eye,
  Calendar,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookingDetailModal from "./BookingDetailsModal";

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

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethod, setFilterMethod] = useState<"all" | "air" | "sea">(
    "all"
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const mockBookings: Booking[] = [
    {
      id: "1",
      bookingNumber: "BK12345678",
      senderName: "John Doe",
      recipientName: "Jane Smith",
      destination: "Jamaica",

      weight: 25.5,
      currentStatus: "in_transit",
      totalPrice: 285,
      pickupDate: "2025-11-08",
      createdAt: "2025-11-05",
    },
    {
      id: "2",
      bookingNumber: "BK12345679",
      senderName: "Mike Johnson",
      recipientName: "Sarah Williams",
      destination: "Barbados",
      weight: 45.0,
      currentStatus: "delivered",
      totalPrice: 160,
      pickupDate: "2025-10-28",
      createdAt: "2025-10-25",
    },
    {
      id: "3",
      bookingNumber: "BK12345680",
      senderName: "David Brown",
      recipientName: "Emily Davis",
      destination: "Trinidad and Tobago",
      weight: 18.2,
      currentStatus: "confirmed",
      totalPrice: 310,
      pickupDate: "2025-11-10",
      createdAt: "2025-11-06",
    },
    {
      id: "4",
      bookingNumber: "BK12345681",
      senderName: "Sarah Williams",
      recipientName: "Mike Johnson",
      destination: "Aruba",
      weight: 62.8,
      currentStatus: "customs_processing",
      totalPrice: 207,
      pickupDate: "2025-11-01",
      createdAt: "2025-10-29",
    },
    {
      id: "5",
      bookingNumber: "BK12345682",
      senderName: "Emily Davis",
      recipientName: "John Doe",
      destination: "Curaçao",
      weight: 32.4,
      currentStatus: "picked_up",
      totalPrice: 331,
      pickupDate: "2025-11-06",
      createdAt: "2025-11-04",
    },
    {
      id: "6",
      bookingNumber: "BK12345683",
      senderName: "Jane Smith",
      recipientName: "David Brown",
      destination: "St. Lucia",
      weight: 28.9,
      currentStatus: "out_for_delivery",
      totalPrice: 116,
      pickupDate: "2025-10-30",
      createdAt: "2025-10-27",
    },
  ];

  const statuses = [
    "all",
    "pending_confirmation",
    "confirmed",
    "picked_up",
    "in_transit",
    "customs_processing",
    "out_for_delivery",
    "delivered",
  ];

  const statusLabels: Record<string, string> = {
    all: "All Status",
    pending_confirmation: "Pending",
    confirmed: "Confirmed",
    picked_up: "Picked Up",
    in_transit: "In Transit",
    customs_processing: "Customs",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
  };

  const statusColors: Record<string, string> = {
    pending_confirmation: "bg-gray-100 text-gray-700 border-gray-200",
    confirmed: "bg-blue-100 text-blue-700 border-blue-200",
    picked_up: "bg-purple-100 text-purple-700 border-purple-200",
    in_transit: "bg-orange-100 text-orange-700 border-orange-200",
    customs_processing: "bg-yellow-100 text-yellow-700 border-yellow-200",
    out_for_delivery: "bg-cyan-100 text-cyan-700 border-cyan-200",
    delivered: "bg-lime-100 text-lime-700 border-lime-200",
  };

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || booking.currentStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockBookings.length,

    revenue: mockBookings.reduce((sum, b) => sum + b.totalPrice, 0),
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          Bookings Management
        </h1>
        <p className="text-gray-600">View and manage all shipping orders</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="text-3xl font-black text-gray-900 mb-1">
            {stats.total}
          </div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="text-3xl font-black text-lime-600 mb-1">
            ${stats.revenue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by booking number, customer name, or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-gray-50 border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-black font-mono text-gray-900">
                        {booking.bookingNumber}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${
                          statusColors[booking.currentStatus]
                        }`}
                      >
                        {statusLabels[booking.currentStatus]}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Sender</div>
                        <div className="font-semibold text-gray-900">
                          {booking.senderName}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">
                          Recipient
                        </div>
                        <div className="font-semibold text-gray-900">
                          {booking.recipientName}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">
                          Destination
                        </div>
                        <div className="font-semibold text-gray-900 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {booking.destination}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        Pickup:{" "}
                        {new Date(booking.pickupDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </div>
                      <div>Weight: {booking.weight} kg</div>
                      <div className="font-bold text-lime-600">
                        ${booking.totalPrice}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedBooking(booking)}
                  className="h-10 px-6 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-xl flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}
