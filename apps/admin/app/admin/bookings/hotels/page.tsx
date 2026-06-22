"use client";

import { Hotel, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockRecentBookings } from "@/lib/data";

const hotelBookings = [
  { id: "h1", bookingNo: "MT-20240620-F7G8", customerName: "Usman Tariq", hotelName: "Hilton Karachi", city: "Karachi", checkIn: "2024-07-01", checkOut: "2024-07-05", roomType: "Deluxe", rooms: 2, status: "CONFIRMED", totalAmount: 32000, paidAmount: 32000, dueAmount: 0, createdAt: "2024-06-20T11:00:00Z" },
  { id: "h2", bookingNo: "MT-20240608-H9I0", customerName: "Sadia Malik", hotelName: "Marriott Islamabad", city: "Islamabad", checkIn: "2024-07-10", checkOut: "2024-07-15", roomType: "Executive", rooms: 1, status: "CONFIRMED", totalAmount: 45000, paidAmount: 20000, dueAmount: 25000, createdAt: "2024-06-08T13:00:00Z" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "CONFIRMED": return <Badge variant="success">Confirmed</Badge>;
    default: return <Badge>{status}</Badge>;
  }
}

export default function HotelBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Hotel className="h-7 w-7 text-pink-500" />
          Hotel Bookings
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage hotel reservations</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium">Booking</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 font-medium">Hotel</th>
                  <th className="text-left py-3 px-4 font-medium">Check In/Out</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Total</th>
                  <th className="text-right py-3 px-4 font-medium">Due</th>
                </tr>
              </thead>
              <tbody>
                {hotelBookings.map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-mono text-xs text-primary-600">{b.bookingNo}</td>
                    <td className="py-3 px-4 font-medium">{b.customerName}</td>
                    <td className="py-3 px-4">
                      <p className="text-sm">{b.hotelName}</p>
                      <p className="text-xs text-gray-500">{b.city} • {b.roomType} • {b.rooms} room(s)</p>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <p>{formatDate(b.checkIn)}</p>
                      <p className="text-xs text-gray-500">to {formatDate(b.checkOut)}</p>
                    </td>
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
