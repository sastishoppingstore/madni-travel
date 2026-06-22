"use client";

import { useState } from "react";
import { Receipt, Plus, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockExpenses } from "@/lib/data";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(mockExpenses);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  const categories = Array.from(new Set(expenses.map(e => e.category)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Receipt className="h-7 w-7 text-red-500" /> Expenses
          </h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage business expenses</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700"><Plus className="h-4 w-4 mr-1" /> Add Expense</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Total Expenses (This Month)</p><p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Categories</p><p className="text-2xl font-bold">{categories.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Transactions</p><p className="text-2xl font-bold">{expenses.length}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Description</th>
                  <th className="text-right py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Payment</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4"><Badge variant="outline">{e.category}</Badge></td>
                    <td className="py-3 px-4">{e.description}</td>
                    <td className="py-3 px-4 text-right font-medium text-red-600">{formatCurrency(e.amount)}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{e.paymentMethod}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{formatDate(e.date)}</td>
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
