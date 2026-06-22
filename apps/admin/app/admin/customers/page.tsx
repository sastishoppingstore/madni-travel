"use client";

import { useState } from "react";
import { Users, Search, Eye, Phone, Mail, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockCustomers } from "@/lib/data";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const filtered = mockCustomers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="h-7 w-7 text-primary-600" /> Customers
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage all customers</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search customers..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <Card key={c.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <Badge variant={c.status === "ACTIVE" ? "success" : "secondary"}>{c.status}</Badge>
              </div>
              <h3 className="font-semibold mt-3">{c.name}</h3>
              <div className="space-y-1 mt-2">
                <p className="text-xs text-gray-500 flex items-center gap-1"><Mail className="h-3 w-3" /> {c.email}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1"><Phone className="h-3 w-3" /> {c.phone}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="h-3 w-3" /> Since {formatDate(c.createdAt)}</p>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div><p className="text-xs text-gray-400">Bookings</p><p className="font-semibold text-sm">{c.totalBookings}</p></div>
                <div><p className="text-xs text-gray-400">Total Spent</p><p className="font-semibold text-sm text-primary-600">{formatCurrency(c.totalSpent)}</p></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
