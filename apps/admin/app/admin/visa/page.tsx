"use client";

import { useState } from "react";
import { FileText, Plus, Search, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { formatCurrency } from "@/lib/utils";
import { mockVisaServices } from "@/lib/data";

export default function VisaManagerPage() {
  const [search, setSearch] = useState("");
  const filtered = mockVisaServices.filter(v => v.country.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-7 w-7 text-amber-600" /> Visa Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage visa services</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700"><Plus className="h-4 w-4 mr-1" /> Add Visa</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search visa services..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((v) => (
          <Card key={v.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary-600" />
                  <div>
                    <h3 className="font-semibold">{v.country}</h3>
                    <p className="text-xs text-gray-500">{v.type} Visa</p>
                  </div>
                </div>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium">{v.title}</p>
                <p className="text-xs text-gray-500">Processing: {v.processingTime}</p>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-lg font-bold text-primary-600">{formatCurrency(v.price)}</span>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
