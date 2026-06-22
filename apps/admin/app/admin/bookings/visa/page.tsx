"use client";

import { useState } from "react";
import { FileText, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

const visaBookings = [
  { id: "v1", bookingNo: "MT-20240621-J1K2L3", customerName: "Ayesha Khan", country: "UAE", visaType: "Tourist", status: "PENDING_PAYMENT", totalAmount: 15000, paidAmount: 5000, dueAmount: 10000, createdAt: "2024-06-21T14:20:00Z" },
  { id: "v2", bookingNo: "MT-20240611-M4N5O6", customerName: "Rizwan Ali", country: "Turkey", visaType: "Tourist", status: "CONFIRMED", totalAmount: 18000, paidAmount: 18000, dueAmount: 0, createdAt: "2024-06-11T10:00:00Z" },
  { id: "v3", bookingNo: "MT-20240601-P7Q8R9", customerName: "Farhan Khan", country: "UK", visaType: "Tourist", status: "CONFIRMED", totalAmount: 35000, paidAmount: 35000, dueAmount: 0, createdAt: "2024-06-01T09:30:00Z" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "CONFIRMED": return <Badge variant="success">Confirmed</Badge>;
    case "PENDING_PAYMENT": return <Badge variant="warning">Payment Pending</Badge>;
    default: return <Badge>{status}</Badge>;
  }
}

export default function VisaBookingsPage() {
  const [search, setSearch] = useState("");
  const filtered = visaBookings.filter((b) =>
    b.customerName.toLowerCase().includes(search.toLowerCase()) ||
    b.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="h-7 w-7 text-amber-500" />
          Visa Bookings
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage visa service bookings</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search visa bookings..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                  <th className="text-left py-3 px-4 font-medium">Country</th>
                  <th className="text-left py-3 px-4 font-medium">Visa Type</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Total</th>
                  <th className="text-right py-3 px-4 font-medium">Due</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-mono text-xs text-primary-600">{b.bookingNo}</td>
                    <td className="py-3 px-4 font-medium">{b.customerName}</td>
                    <td className="py-3 px-4">{b.country}</td>
                    <td className="py-3 px-4"><Badge variant="outline">{b.visaType}</Badge></td>
                    <td className="py-3 px-4">{getStatusBadge(b.status)}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(b.totalAmount)}</td>
                    <td className="py-3 px-4 text-right">{b.dueAmount > 0 ? <span className="text-red-600">{formatCurrency(b.dueAmount)}</span> : <span className="text-emerald-500 text-xs">Paid</span>}</td>
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
