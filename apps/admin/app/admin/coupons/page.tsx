"use client";

import { useState } from "react";
import { Ticket, Plus, Copy, Check, Percent, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockCoupons } from "@/lib/data";

export default function CouponsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Ticket className="h-7 w-7 text-primary-600" /> Coupons
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage discount coupons</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700"><Plus className="h-4 w-4 mr-1" /> Add Coupon</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCoupons.map((c) => (
          <Card key={c.id} className={`hover:shadow-md transition-shadow ${!c.isActive ? "opacity-60" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono font-bold text-lg text-primary-600">{c.code}</h3>
                    <button onClick={() => copyCode(c.code)} className="p-1 rounded hover:bg-gray-100">
                      {copied === c.code ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-gray-400" />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{c.description}</p>
                </div>
                <Badge variant={c.isActive ? "success" : "secondary"}>{c.isActive ? "Active" : "Inactive"}</Badge>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <p className="flex items-center gap-1">
                  {c.discountType === "PERCENTAGE" ? <Percent className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
                  {c.discountType === "PERCENTAGE" ? `${c.discountValue}% off` : `${formatCurrency(c.discountValue)} off`}
                </p>
                <p>Min order: {formatCurrency(c.minAmount)}</p>
                {c.maxDiscount && <p>Max discount: {formatCurrency(c.maxDiscount)}</p>}
                <p>Usage: {c.usageCount}/{c.usageLimit || "Unlimited"}</p>
                <p>Valid: {formatDate(c.validFrom)} - {c.validUntil ? formatDate(c.validUntil) : "No expiry"}</p>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <Switch checked={c.isActive} onCheckedChange={() => {}} />
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
