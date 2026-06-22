"use client";

import { useState } from "react";
import { Package, Search, Eye, Edit, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

const packageBookings = [
  { id: "p1", bookingNo: "MT-20240621-G7H8I9", customerName: "Hassan Raza", packageName: "Dubai Luxury 5 Nights", status: "CONFIRMED", totalAmount: 125000, paidAmount: 125000, dueAmount: 0, createdAt: "2024-06-21T16:45:00Z" },
  { id: "p2", bookingNo: "MT-20240619-S1T2U3", customerName: "Zara Sheikh", packageName: "Turkey Discovery 7 Nights", status: "PAID_PENDING_CONFIRMATION", totalAmount: 210000, paidAmount: 150000, dueAmount: 60000, createdAt: "2024-06-19T12:00:00Z" },
  { id: "p3", bookingNo: "MT-20240615-V4W5X6", customerName: "Ali Zafar", packageName: "Malaysia Family 4 Nights", status: "CONFIRMED", totalAmount: 98000, paidAmount: 98000, dueAmount: 0, createdAt: "2024-06-15T10:30:00Z" },
  { id: "p4", bookingNo: "MT-20240612-Y7Z8A9", customerName: "Nadia Bibi", packageName: "Maldives Honeymoon 6 Nights", status: "PENDING_PAYMENT", totalAmount: 275000, paidAmount: 50000, dueAmount: 225000, createdAt: "2024-06-12T09:00:00Z" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "CONFIRMED": return <Badge variant="success">Confirmed</Badge>;
    case "PENDING_PAYMENT": return <Badge variant="warning">Payment Pending</Badge>;
    case "PAID_PENDING_CONFIRMATION": return <Badge variant="info">Pending Conf</Badge>;
    case "CANCELLED": return <Badge variant="destructive">Cancelled</Badge>;
    default: return <Badge>{status}</Badge>;
  }
}

export default function PackageBookingsPage() {
  const [search, setSearch] = useState("");
  const filtered = packageBookings.filter((b) =>
    b.customerName.toLowerCase().includes(search.toLowerCase()) ||
    b.bookingNo.toLowerCase().includes(search.toLowerCase()) ||
    b.packageName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Package className="h-7 w-7 text-purple-500" />
          Package Bookings
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage holiday package bookings</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search packages..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium">Booking</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 font-medium">Package</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Total</th>
                  <th className="text-right py-3 px-4 font-medium">Due</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-mono text-xs text-primary-600">{b.bookingNo}</td>
                    <td className="py-3 px-4 font-medium">{b.customerName}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{b.packageName}</td>
                    <td className="py-3 px-4">{getStatusBadge(b.status)}</td>
                    <td className="py-3 px-4 text-right font-medium">{formatCurrency(b.totalAmount)}</td>
                    <td className="py-3 px-4 text-right">{b.dueAmount > 0 ? <span className="text-red-600">{formatCurrency(b.dueAmount)}</span> : <span className="text-emerald-500 text-xs">Paid</span>}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
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
