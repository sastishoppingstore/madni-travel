"use client";

import { HandCoins, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { mockTopStaff } from "@/lib/data";

export default function CommissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <HandCoins className="h-7 w-7 text-accent-400" /> Commissions
        </h1>
        <p className="text-sm text-gray-500 mt-1">Track and manage staff commissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Total Commissions (This Month)</p><p className="text-2xl font-bold text-accent-500">{formatCurrency(450000)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Paid</p><p className="text-2xl font-bold text-emerald-600">{formatCurrency(380000)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Pending</p><p className="text-2xl font-bold text-amber-600">{formatCurrency(70000)}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium">Staff</th>
                  <th className="text-right py-3 px-4 font-medium">Sales</th>
                  <th className="text-right py-3 px-4 font-medium">Revenue</th>
                  <th className="text-right py-3 px-4 font-medium">Commission</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockTopStaff.map((s) => (
                  <tr key={s.name} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-medium">{s.name}</td>
                    <td className="py-3 px-4 text-right">{s.sales}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(s.revenue)}</td>
                    <td className="py-3 px-4 text-right font-bold text-accent-600">{formatCurrency(s.commission)}</td>
                    <td className="py-3 px-4"><Badge variant="success">Paid</Badge></td>
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
