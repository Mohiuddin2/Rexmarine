"use client";
import {
  Package,
  Users,
  Clock,
  Ship,
  Plane,
  DollarSign,
  CheckCircle2,
} from "lucide-react";

export default function AdminOverview() {
  const stats = [
    {
      label: "Total Bookings",
      value: "1,234",
      change: "+12.5%",
      icon: Package,
      color: "lime",
    },
    {
      label: "Active Customers",
      value: "856",
      change: "+8.2%",
      icon: Users,
      color: "blue",
    },
    {
      label: "Revenue (MTD)",
      value: "$45,890",
      change: "+15.3%",
      icon: DollarSign,
      color: "green",
    },
    {
      label: "Pending Orders",
      value: "23",
      change: "-5.1%",
      icon: Clock,
      color: "orange",
    },
  ];

  const recentBookings = [
    {
      id: "BK12345678",
      customer: "John Doe",
      destination: "Jamaica",
      status: "In Transit",
      date: "2025-11-05",
    },
    {
      id: "BK12345679",
      customer: "Jane Smith",
      destination: "Barbados",

      status: "Delivered",
      date: "2025-11-04",
    },
    {
      id: "BK12345680",
      customer: "Mike Johnson",
      destination: "Trinidad",

      status: "Confirmed",
      date: "2025-11-05",
    },
    {
      id: "BK12345681",
      customer: "Sarah Williams",
      destination: "Aruba",

      status: "Customs",
      date: "2025-11-03",
    },
    {
      id: "BK12345682",
      customer: "David Brown",
      destination: "Curaçao",

      status: "Picked Up",
      date: "2025-11-06",
    },
  ];

  const statusColors: Record<string, string> = {
    "In Transit": "bg-blue-100 text-blue-700 border-blue-200",
    Delivered: "bg-lime-100 text-lime-700 border-lime-200",
    Confirmed: "bg-gray-100 text-gray-700 border-gray-200",
    Customs: "bg-orange-100 text-orange-700 border-orange-200",
    "Picked Up": "bg-purple-100 text-purple-700 border-purple-200",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your logistics.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    stat.change.startsWith("+")
                      ? "bg-lime-100 text-lime-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Destination
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-mono font-bold text-gray-900">
                      {booking.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">
                      {booking.customer}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-700">{booking.destination}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${
                        statusColors[booking.status]
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
