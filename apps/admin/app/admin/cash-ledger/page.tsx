"use client";

import { useState } from "react";
import { BookOpen, ArrowDownLeft, ArrowUpRight, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockCashLedger } from "@/lib/data";

export default function CashLedgerPage() {
  const [ledger] = useState(mockCashLedger);
  const totalIncome = ledger.filter(l => l.type === "INCOME").reduce((s, l) => s + l.amount, 0);
  const totalExpense = ledger.filter(l => l.type === "EXPENSE").reduce((s, l) => s + l.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary-600" /> Cash Ledger
          </h1>
          <p className="text-sm text-gray-500 mt-1">Track all cash inflows and outflows</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700"><Plus className="h-4 w-4 mr-1" /> Add Entry</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Total Income</p><p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalIncome)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Total Expense</p><p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpense)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Current Balance</p><p className={`text-2xl font-bold ${balance >= 0 ? "text-emerald-600" : "text-red-600"}`}>{formatCurrency(balance)}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Description</th>
                  <th className="text-right py-3 px-4 font-medium">Amount</th>
                  <th className="text-right py-3 px-4 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                {ledger.map((l) => (
                  <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-gray-500 text-xs">{formatDate(l.date)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={l.type === "INCOME" ? "success" : "destructive"} className="flex items-center gap-1 w-fit">
                        {l.type === "INCOME" ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                        {l.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{l.category}</td>
                    <td className="py-3 px-4 text-sm">{l.description}</td>
                    <td className={`py-3 px-4 text-right font-medium ${l.type === "INCOME" ? "text-emerald-600" : "text-red-600"}`}>
                      {l.type === "INCOME" ? "+" : "-"}{formatCurrency(l.amount)}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">{formatCurrency(l.balance)}</td>
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
