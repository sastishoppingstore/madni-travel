"use client";

import { BarChart3, TrendingUp, Download, Calendar, Users, DollarSign, Plane, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { mockMonthlyRevenue, mockTopPackages, mockTopStaff, mockPaymentMethods } from "@/lib/data";

const COLORS = ["#059669", "#0F172A", "#D4AF37", "#6366f1", "#ec4899"];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary-600" /> Reports
          </h1>
          <p className="text-sm text-gray-500 mt-1">Sales, profit, and performance reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Calendar className="h-4 w-4 mr-1" /> This Month</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export PDF</Button>
        </div>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList>
          <TabsTrigger value="sales"><DollarSign className="h-3.5 w-3.5 mr-1" /> Sales Report</TabsTrigger>
          <TabsTrigger value="profit"><TrendingUp className="h-3.5 w-3.5 mr-1" /> Profit Report</TabsTrigger>
          <TabsTrigger value="staff"><Users className="h-3.5 w-3.5 mr-1" /> Staff Report</TabsTrigger>
          <TabsTrigger value="services"><Plane className="h-3.5 w-3.5 mr-1" /> Services</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Total Sales</p><p className="text-xl font-bold">{formatCurrency(1850000)}</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">This Week</p><p className="text-xl font-bold text-primary-600">{formatCurrency(485000)}</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Today</p><p className="text-xl font-bold text-emerald-600">{formatCurrency(245000)}</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Total Bookings</p><p className="text-xl font-bold">86</p></CardContent></Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Monthly Sales Trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockMonthlyRevenue}>
                  <defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#059669" stopOpacity={0.3}/><stop offset="95%" stopColor="#059669" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} tickFormatter={(v) => `Rs.${v/1000000}M`} />
                  <Tooltip formatter={(v: number) => [formatCurrency(v), "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2} fill="url(#rev)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Gross Profit</p><p className="text-xl font-bold text-emerald-600">{formatCurrency(420000)}</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Profit Margin</p><p className="text-xl font-bold text-primary-600">22.7%</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Expenses</p><p className="text-xl font-bold text-red-600">{formatCurrency(665000)}</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Net Profit</p><p className="text-xl font-bold">{formatCurrency(420000)}</p></CardContent></Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Monthly Profit Trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockMonthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} tickFormatter={(v) => `Rs.${v/1000}K`} />
                  <Tooltip formatter={(v: number) => [formatCurrency(v), "Profit"]} />
                  <Bar dataKey="profit" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Staff Performance</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTopStaff.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                    <span className="text-lg font-bold text-primary-600 w-6">{i + 1}</span>
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold">
                      {s.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.sales} sales • {formatCurrency(s.revenue)} revenue</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent-600">{formatCurrency(s.commission)}</p>
                      <p className="text-xs text-gray-400">commission</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Payment Methods</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={mockPaymentMethods} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                      {mockPaymentMethods.map((_, i) => <Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Top Packages</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTopPackages.map((p, i) => (
                    <div key={p.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary-600">{i + 1}</span>
                        <span className="text-sm">{p.name}</span>
                      </div>
                      <span className="text-sm font-medium">{formatCurrency(p.revenue)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
