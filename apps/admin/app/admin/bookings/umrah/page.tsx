"use client";

import { useState } from "react";
import { Star, Search, Eye, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

const umrahBookings = [
  { id: "u1", bookingNo: "MT-20240622-D4E5F6", customerName: "Sara Ahmed", packageName: "Standard Umrah 15 Days", makkahHotel: "Makkah Clock Tower", madinahHotel: "Pullman ZamZam", status: "PAID_PENDING_CONFIRMATION", totalAmount: 185000, paidAmount: 100000, dueAmount: 85000, createdAt: "2024-06-22T09:15:00Z" },
  { id: "u2", bookingNo: "MT-20240618-B1C2D3", customerName: "Mariam Ansari", packageName: "Premium Umrah 21 Days", makkahHotel: "Hilton Makkah", madinahHotel: "Oberoi Madinah", status: "CONFIRMED", totalAmount: 195000, paidAmount: 195000, dueAmount: 0, createdAt: "2024-06-18T07:20:00Z" },
  { id: "u3", bookingNo: "MT-20240610-E4F5G6", customerName: "Imran Sheikh", packageName: "Economy Umrah 15 Days", makkahHotel: "Dar Al Eiman", madinahHotel: "Al Ansar Golden", status: "CONFIRMED", totalAmount: 85000, paidAmount: 85000, dueAmount: 0, createdAt: "2024-06-10T11:00:00Z" },
  { id: "u4", bookingNo: "MT-20240605-H7I8J9", customerName: "Fozia Bibi", packageName: "Ramadan Umrah 10 Days", makkahHotel: "Swissotel Makkah", madinahHotel: "Madinah Hilton", status: "PENDING_PAYMENT", totalAmount: 145000, paidAmount: 30000, dueAmount: 115000, createdAt: "2024-06-05T15:30:00Z" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "CONFIRMED": return <Badge variant="success">Confirmed</Badge>;
    case "PENDING_PAYMENT": return <Badge variant="warning">Payment Pending</Badge>;
    case "PAID_PENDING_CONFIRMATION": return <Badge variant="info">Pending Conf</Badge>;
    default: return <Badge>{status}</Badge>;
  }
}

export default function UmrahBookingsPage() {
  const [search, setSearch] = useState("");
  const filtered = umrahBookings.filter((b) =>
    b.customerName.toLowerCase().includes(search.toLowerCase()) ||
    b.packageName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Star className="h-7 w-7 text-emerald-500" />
          Umrah Bookings
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage Umrah package bookings</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search Umrah bookings..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((b) => (
          <Card key={b.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary-600">{b.bookingNo}</span>
                    {getStatusBadge(b.status)}
                  </div>
                  <h3 className="font-semibold text-gray-900 mt-1">{b.customerName}</h3>
                  <p className="text-sm text-gray-600">{b.packageName}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-500">Makkah: {b.makkahHotel}</p>
                    <p className="text-xs text-gray-500">Madinah: {b.madinahHotel}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-400">Total</p>
                      <p className="font-semibold">{formatCurrency(b.totalAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Paid</p>
                      <p className="text-emerald-600 font-semibold">{formatCurrency(b.paidAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Due</p>
                      <p className={`font-semibold ${b.dueAmount > 0 ? "text-red-600" : "text-emerald-600"}`}>
                        {formatCurrency(b.dueAmount)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
