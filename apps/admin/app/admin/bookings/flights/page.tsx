"use client";

import { useState } from "react";
import { Plane, Search, Filter, Eye, Edit, Check, X, Upload, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockRecentBookings } from "@/lib/data";

const flightBookings = mockRecentBookings
  .filter((b) => b.type === "FLIGHT")
  .concat([
    { id: "f1", bookingNo: "MT-20240617-K1L2M3", customerName: "Kamran Ahmed", type: "FLIGHT", status: "CONFIRMED", totalAmount: 125000, paidAmount: 125000, dueAmount: 0, createdAt: "2024-06-17T08:00:00Z" },
    { id: "f2", bookingNo: "MT-20240616-N4O5P6", customerName: "Rabia Khan", type: "FLIGHT", status: "PENDING_PAYMENT", totalAmount: 65000, paidAmount: 20000, dueAmount: 45000, createdAt: "2024-06-16T14:30:00Z" },
    { id: "f3", bookingNo: "MT-20240615-Q7R8S9", customerName: "Tariq Mahmood", type: "FLIGHT", status: "TICKET_ISSUED", totalAmount: 92000, paidAmount: 92000, dueAmount: 0, createdAt: "2024-06-15T11:20:00Z" },
    { id: "f4", bookingNo: "MT-20240614-T1U2V3", customerName: "Saima Aslam", type: "FLIGHT", status: "CONFIRMED", totalAmount: 78000, paidAmount: 78000, dueAmount: 0, createdAt: "2024-06-14T09:45:00Z" },
  ]);

function getStatusBadge(status: string) {
  switch (status) {
    case "CONFIRMED": return <Badge variant="success">Confirmed</Badge>;
    case "TICKET_ISSUED": return <Badge variant="info">Ticket Issued</Badge>;
    case "PENDING_PAYMENT": return <Badge variant="warning">Payment Pending</Badge>;
    case "PAID_PENDING_CONFIRMATION": return <Badge variant="secondary">Pending Conf</Badge>;
    case "CANCELLED": return <Badge variant="destructive">Cancelled</Badge>;
    case "REFUNDED": return <Badge variant="secondary">Refunded</Badge>;
    default: return <Badge>{status}</Badge>;
  }
}

export default function FlightBookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = flightBookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingNo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: flightBookings.length,
    confirmed: flightBookings.filter((b) => b.status === "CONFIRMED" || b.status === "TICKET_ISSUED").length,
    pending: flightBookings.filter((b) => b.status === "PENDING_PAYMENT" || b.status === "PAID_PENDING_CONFIRMATION").length,
    revenue: flightBookings.reduce((s, b) => s + b.totalAmount, 0),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Plane className="h-7 w-7 text-blue-500" />
          Flight Bookings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all flight bookings and reservations
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-2xl font-bold">{stats.total}</p><p className="text-xs text-gray-500">Total Bookings</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-emerald-600">{stats.confirmed}</p><p className="text-xs text-gray-500">Confirmed</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-amber-600">{stats.pending}</p><p className="text-xs text-gray-500">Pending</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold">{formatCurrency(stats.revenue)}</p><p className="text-xs text-gray-500">Total Revenue</p></CardContent></Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by customer or booking number..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {["ALL", "CONFIRMED", "PENDING_PAYMENT", "TICKET_ISSUED", "CANCELLED"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === s
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {s === "ALL" ? "All" : s.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium">Booking No</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Total</th>
                  <th className="text-right py-3 px-4 font-medium">Paid</th>
                  <th className="text-right py-3 px-4 font-medium">Due</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-mono text-xs text-primary-600">{booking.bookingNo}</td>
                    <td className="py-3 px-4 font-medium">{booking.customerName}</td>
                    <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                    <td className="py-3 px-4 text-right font-medium">{formatCurrency(booking.totalAmount)}</td>
                    <td className="py-3 px-4 text-right text-emerald-600">{formatCurrency(booking.paidAmount)}</td>
                    <td className="py-3 px-4 text-right">
                      {booking.dueAmount > 0 ? (
                        <span className="text-red-600 font-medium">{formatCurrency(booking.dueAmount)}</span>
                      ) : (
                        <span className="text-xs text-emerald-500">Paid</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{formatDate(booking.createdAt)}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                        {booking.status === "PAID_PENDING_CONFIRMATION" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600"><Check className="h-4 w-4" /></Button>
                        )}
                        {booking.status !== "CANCELLED" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><X className="h-4 w-4" /></Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
