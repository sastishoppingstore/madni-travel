"use client";

import { useState } from "react";
import { Truck, Search, Plus, Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { formatCurrency } from "@/lib/utils";
import { mockSuppliers } from "@/lib/data";

export default function SuppliersPage() {
  const [search, setSearch] = useState("");
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const filtered = suppliers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.type.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Truck className="h-7 w-7 text-primary-600" /> Suppliers
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage suppliers and partners</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700"><Plus className="h-4 w-4 mr-1" /> Add Supplier</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search suppliers..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((s) => (
          <Card key={s.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="secondary">{s.type}</Badge>
                  <h3 className="font-semibold mt-1">{s.name}</h3>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${s.balance > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                    {formatCurrency(s.balance)}
                  </p>
                  <p className="text-xs text-gray-400">Balance</p>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {s.address || "No address"}</p>
                <p className="flex items-center gap-1"><Phone className="h-3 w-3" /> {s.phone}</p>
                <p className="flex items-center gap-1"><Mail className="h-3 w-3" /> {s.email}</p>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Contact: {s.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Active</span>
                  <Switch checked={s.isActive} onCheckedChange={() => {}} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
