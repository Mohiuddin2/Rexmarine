"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  customerType: "sender" | "recipient" | "both";
  totalBookings: number;
  createdAt: string;
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "sender" | "recipient" | "both"
  >("all");

  const mockCustomers: Customer[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (721) 555-0100",
      address: "123 Main St, Philipsburg, Saint Martin",
      customerType: "sender",
      totalBookings: 12,
      createdAt: "2025-10-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (246) 555-0200",
      address: "456 Ocean Dr, Bridgetown, Barbados",
      customerType: "recipient",
      totalBookings: 8,
      createdAt: "2025-09-22",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 (721) 555-0300",
      address: "789 Bay Rd, Marigot, Saint Martin",
      customerType: "both",
      totalBookings: 25,
      createdAt: "2025-08-10",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "+297 555-0400",
      address: "321 Beach Blvd, Oranjestad, Aruba",
      customerType: "recipient",
      totalBookings: 5,
      createdAt: "2025-10-28",
    },
    {
      id: "5",
      name: "David Brown",
      email: "david.brown@example.com",
      phone: "+1 (721) 555-0500",
      address: "654 Harbor View, Cole Bay, Saint Martin",
      customerType: "sender",
      totalBookings: 18,
      createdAt: "2025-07-05",
    },
    {
      id: "6",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+599 555-0600",
      address: "987 Sunset Ave, Willemstad, Curaçao",
      customerType: "recipient",
      totalBookings: 3,
      createdAt: "2025-11-01",
    },
  ];

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    const matchesFilter =
      filterType === "all" || customer.customerType === filterType;

    return matchesSearch && matchesFilter;
  });

  const typeColors = {
    sender: "bg-blue-100 text-blue-700 border-blue-200",
    recipient: "bg-purple-100 text-purple-700 border-purple-200",
    both: "bg-lime-100 text-lime-700 border-lime-200",
  };

  const typeIcons = {
    sender: User,
    recipient: UserCheck,
    both: Users,
  };

  const stats = {
    total: mockCustomers.length,
    senders: mockCustomers.filter((c) => c.customerType === "sender").length,
    recipients: mockCustomers.filter((c) => c.customerType === "recipient")
      .length,
    both: mockCustomers.filter((c) => c.customerType === "both").length,
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          Customer Management
        </h1>
        <p className="text-gray-600">
          View and manage all registered customers
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-700" />
            </div>
            <div className="text-3xl font-black text-gray-900">
              {stats.total}
            </div>
          </div>
          <div className="text-sm text-gray-600">Total Customers</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-black text-gray-900">
              {stats.senders}
            </div>
          </div>
          <div className="text-sm text-gray-600">Senders</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-black text-gray-900">
              {stats.recipients}
            </div>
          </div>
          <div className="text-sm text-gray-600">Recipients</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-lime-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-lime-600" />
            </div>
            <div className="text-3xl font-black text-gray-900">
              {stats.both}
            </div>
          </div>
          <div className="text-sm text-gray-600">Both</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-gray-50 border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 rounded-xl"
              />
            </div>

            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2 border-2 border-gray-300">
              <Filter className="w-5 h-5 text-gray-600 ml-2" />
              <Button
                variant={filterType === "all" ? "default" : "ghost"}
                onClick={() => setFilterType("all")}
                className={`h-8 px-4 rounded-lg text-sm font-semibold ${
                  filterType === "all"
                    ? "bg-lime-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </Button>
              <Button
                variant={filterType === "sender" ? "default" : "ghost"}
                onClick={() => setFilterType("sender")}
                className={`h-8 px-4 rounded-lg text-sm font-semibold ${
                  filterType === "sender"
                    ? "bg-lime-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Senders
              </Button>
              <Button
                variant={filterType === "recipient" ? "default" : "ghost"}
                onClick={() => setFilterType("recipient")}
                className={`h-8 px-4 rounded-lg text-sm font-semibold ${
                  filterType === "recipient"
                    ? "bg-lime-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Recipients
              </Button>
              <Button
                variant={filterType === "both" ? "default" : "ghost"}
                onClick={() => setFilterType("both")}
                className={`h-8 px-4 rounded-lg text-sm font-semibold ${
                  filterType === "both"
                    ? "bg-lime-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Both
              </Button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredCustomers.map((customer) => {
            const TypeIcon = typeIcons[customer.customerType];
            return (
              <div
                key={customer.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                      <User className="w-7 h-7 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {customer.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border-2 flex items-center gap-1 ${
                            typeColors[customer.customerType]
                          }`}
                        >
                          <TypeIcon className="w-3 h-3" />
                          {customer.customerType.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {customer.phone}
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        {customer.address}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-lime-600 mb-1">
                      {customer.totalBookings}
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                      Total Bookings
                    </div>
                    <div className="text-xs text-gray-500">
                      Joined{" "}
                      {new Date(customer.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No customers found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
