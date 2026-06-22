"use client";

import { useState } from "react";
import { Package, Plus, Search, Eye, Edit, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { formatCurrency } from "@/lib/utils";
import { mockPackages } from "@/lib/data";

export default function PackagesPage() {
  const [search, setSearch] = useState("");
  const [packages, setPackages] = useState(mockPackages);
  const filtered = packages.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.destination.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="h-7 w-7 text-purple-600" /> Package Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage holiday packages</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700"><Plus className="h-4 w-4 mr-1" /> Add Package</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search packages..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-100 relative">
              {pkg.coverImage && <img src={pkg.coverImage} alt={pkg.title} className="w-full h-full object-cover" />}
              {pkg.isFeatured && (
                <div className="absolute top-2 left-2 bg-accent-400 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                  <Star className="h-3 w-3" /> Featured
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{pkg.title}</h3>
                  <p className="text-xs text-gray-500">{pkg.destination} • {pkg.duration} nights</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-lg font-bold">{formatCurrency(pkg.salePrice)}</span>
                {pkg.salePrice < pkg.price && <span className="text-sm text-gray-400 line-through">{formatCurrency(pkg.price)}</span>}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Switch checked={pkg.isActive} onCheckedChange={() => {}} />
                  <span className="text-xs text-gray-500">Active</span>
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
