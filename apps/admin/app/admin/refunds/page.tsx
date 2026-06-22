"use client";

import { useState } from "react";
import { RotateCcw, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockRefunds } from "@/lib/data";

export default function RefundsPage() {
  const [refunds] = useState(mockRefunds);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PROCESSED": return <Badge variant="success">Processed</Badge>;
      case "APPROVED": return <Badge variant="info">Approved</Badge>;
      case "PENDING": return <Badge variant="warning">Pending</Badge>;
      case "REJECTED": return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <RotateCcw className="h-7 w-7 text-red-500" /> Refunds
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage customer refunds and returns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Total Refunds</p><p className="text-2xl font-bold">{refunds.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Total Amount</p><p className="text-2xl font-bold text-red-600">{formatCurrency(refunds.reduce((s, r) => s + r.amount, 0))}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Pending</p><p className="text-2xl font-bold text-amber-600">{refunds.filter(r => r.status === "PENDING").length}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium">ID</th>
                  <th className="text-right py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Reason</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Processed</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-mono text-xs text-primary-600">{r.id}</td>
                    <td className="py-3 px-4 text-right font-medium">{formatCurrency(r.amount)}</td>
                    <td className="py-3 px-4 text-sm">{r.reason}</td>
                    <td className="py-3 px-4">{getStatusBadge(r.status)}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{r.processedAt ? formatDate(r.processedAt) : "—"}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{formatDate(r.createdAt)}</td>
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
