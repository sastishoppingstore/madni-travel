"use client";

import { Bus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

const busBookings = [
  { id: "b1", bookingNo: "MT-20240619-S1T2U3", customerName: "Bilal Khan", fromCity: "Karachi", toCity: "Lahore", busOperator: "Daewoo Express", busType: "Luxury", seats: 2, travelDate: "2024-06-25", status: "CONFIRMED", totalAmount: 8000, paidAmount: 8000, dueAmount: 0, createdAt: "2024-06-19T15:10:00Z" },
  { id: "b2", bookingNo: "MT-20240613-K4L5M6", customerName: "Hina Tariq", fromCity: "Lahore", toCity: "Islamabad", busOperator: "Faisal Movers", busType: "Business", seats: 1, travelDate: "2024-06-28", status: "CONFIRMED", totalAmount: 3500, paidAmount: 3500, dueAmount: 0, createdAt: "2024-06-13T08:45:00Z" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "CONFIRMED": return <Badge variant="success">Confirmed</Badge>;
    default: return <Badge>{status}</Badge>;
  }
}

export default function BusBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Bus className="h-7 w-7 text-cyan-500" />
          Bus Bookings
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage bus ticket bookings</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium">Booking</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 font-medium">Route</th>
                  <th className="text-left py-3 px-4 font-medium">Operator</th>
                  <th className="text-left py-3 px-4 font-medium">Travel Date</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {busBookings.map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-mono text-xs text-primary-600">{b.bookingNo}</td>
                    <td className="py-3 px-4 font-medium">{b.customerName}</td>
                    <td className="py-3 px-4">
                      <p className="text-sm">{b.fromCity} → {b.toCity}</p>
                      <p className="text-xs text-gray-500">{b.seats} seat(s)</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm">{b.busOperator}</p>
                      <p className="text-xs text-gray-500">{b.busType}</p>
                    </td>
                    <td className="py-3 px-4">{formatDate(b.travelDate)}</td>
                    <td className="py-3 px-4">{getStatusBadge(b.status)}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(b.totalAmount)}</td>
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
