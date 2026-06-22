"use client";

import { useState } from "react";
import { Star, Plus, Search, Eye, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { formatCurrency } from "@/lib/utils";
import { mockUmrahPackages } from "@/lib/data";

export default function UmrahManagerPage() {
  const [search, setSearch] = useState("");
  const filtered = mockUmrahPackages.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Star className="h-7 w-7 text-emerald-600" /> Umrah Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage Umrah packages</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700"><Plus className="h-4 w-4 mr-1" /> Add Package</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search Umrah packages..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((pkg) => (
          <Card key={pkg.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                  {pkg.coverImage ? <img src={pkg.coverImage} alt={pkg.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{pkg.title}</h3>
                  <p className="text-sm text-gray-500">{pkg.duration} days</p>
                  <div className="mt-2 space-y-1 text-xs text-gray-600">
                    <p>Makkah: {pkg.makkahHotel} ({pkg.makkahNights} nights)</p>
                    <p>Madinah: {pkg.madinahHotel} ({pkg.madinahNights} nights)</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {pkg.includesFlights && <Badge variant="outline" className="text-[10px]">Flights</Badge>}
                    {pkg.includesVisa && <Badge variant="outline" className="text-[10px]">Visa</Badge>}
                    {pkg.includesTransport && <Badge variant="outline" className="text-[10px]">Transport</Badge>}
                    {pkg.includesFood && <Badge variant="outline" className="text-[10px]">Food</Badge>}
                    {pkg.includesGuide && <Badge variant="outline" className="text-[10px]">Guide</Badge>}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-primary-600">{formatCurrency(pkg.salePrice)}</span>
                    <div className="flex items-center gap-2">
                      <Switch checked={pkg.isActive} onCheckedChange={() => {}} />
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
