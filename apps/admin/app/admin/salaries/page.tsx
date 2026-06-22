"use client";

import { useState } from "react";
import { Banknote, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { mockStaff } from "@/lib/data";

export default function SalariesPage() {
  const [month, setMonth] = useState("2024-06");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Banknote className="h-7 w-7 text-primary-600" /> Salaries
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage staff salary payments</p>
      </div>

      <div className="flex items-center gap-3">
        <Calendar className="h-5 w-5 text-gray-400" />
        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Total Payroll</p><p className="text-2xl font-bold">{formatCurrency(415000)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Paid</p><p className="text-2xl font-bold text-emerald-600">{formatCurrency(415000)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Pending</p><p className="text-2xl font-bold text-amber-600">{formatCurrency(0)}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium">Staff</th>
                  <th className="text-right py-3 px-4 font-medium">Basic</th>
                  <th className="text-right py-3 px-4 font-medium">Allowance</th>
                  <th className="text-right py-3 px-4 font-medium">Deduction</th>
                  <th className="text-right py-3 px-4 font-medium">Bonus</th>
                  <th className="text-right py-3 px-4 font-medium">Net Salary</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockStaff.filter(s => s.status === "ACTIVE").map((s) => (
                  <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-medium">{s.name}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(s.salary)}</td>
                    <td className="py-3 px-4 text-right text-emerald-600">{formatCurrency(s.salary * 0.1)}</td>
                    <td className="py-3 px-4 text-right text-red-500">{formatCurrency(s.salary * 0.05)}</td>
                    <td className="py-3 px-4 text-right text-blue-600">{formatCurrency(5000)}</td>
                    <td className="py-3 px-4 text-right font-bold">{formatCurrency(s.salary + s.salary * 0.1 - s.salary * 0.05 + 5000)}</td>
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
