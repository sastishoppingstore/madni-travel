"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  Clock,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  Users,
  Star,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  mockDashboardStats,
  mockMonthlyRevenue,
  mockTopPackages,
  mockTopStaff,
  mockPaymentMethods,
  mockRecentBookings,
} from "@/lib/data";

const COLORS = ["#059669", "#0F172A", "#D4AF37", "#6366f1", "#ec4899"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  color,
  subtitle,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  color: string;
  subtitle?: string;
}) {
  return (
    <motion.div variants={item}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1.5">
                {value}
              </p>
              {subtitle && (
                <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
              )}
              {trend && (
                <div className="flex items-center gap-1 mt-2">
                  {trendUp ? (
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      trendUp ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {trend}
                  </span>
                  <span className="text-xs text-gray-400">vs yesterday</span>
                </div>
              )}
            </div>
            <div
              className={`p-3 rounded-xl ${color}`}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function getStatusBadge(status: string) {
  switch (status) {
    case "CONFIRMED":
    case "TICKET_ISSUED":
      return <Badge variant="success">{status}</Badge>;
    case "PENDING_PAYMENT":
      return <Badge variant="warning">Pending Payment</Badge>;
    case "PAID_PENDING_CONFIRMATION":
      return <Badge variant="info">Paid - Pending</Badge>;
    case "CANCELLED":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Page Title */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {formatDate(new Date())}
          </span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today Sales"
          value={formatCurrency(mockDashboardStats.todaySales)}
          icon={DollarSign}
          trend="12.5%"
          trendUp={true}
          color="bg-emerald-500"
        />
        <StatCard
          title="Today Profit"
          value={formatCurrency(mockDashboardStats.todayProfit)}
          icon={Wallet}
          trend="8.3%"
          trendUp={true}
          color="bg-primary-600"
        />
        <StatCard
          title="Pending Tickets"
          value={String(mockDashboardStats.pendingTickets)}
          icon={Clock}
          color="bg-amber-500"
          subtitle="Awaiting confirmation"
        />
        <StatCard
          title="Confirmed Tickets"
          value={String(mockDashboardStats.confirmedTickets)}
          icon={CheckCircle}
          trend="5.2%"
          trendUp={true}
          color="bg-blue-500"
          subtitle="Successfully processed"
        />
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div variants={item}>
          <Card className="border-amber-200 bg-amber-50/50 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-100">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Customer Dues
                  </p>
                  <p className="text-lg font-bold text-amber-700">
                    {formatCurrency(mockDashboardStats.customerDues)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-red-200 bg-red-50/50 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-red-100">
                  <Building2 className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Supplier Dues
                  </p>
                  <p className="text-lg font-bold text-red-700">
                    {formatCurrency(mockDashboardStats.supplierDues)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-emerald-200 bg-emerald-50/50 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-100">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    AI Business Insight
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Sales are up 18% this week. Umrah bookings trending +35%.
                    Consider increasing ad spend on Umrah packages.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <motion.div variants={item}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary-600" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={mockMonthlyRevenue}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#059669"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="#059669"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => `Rs.${v / 1000000}M`}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      formatCurrency(value),
                      "Revenue",
                    ]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#059669"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Profit */}
        <motion.div variants={item}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent-400" />
                Monthly Profit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={mockMonthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => `Rs.${v / 1000}K`}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      formatCurrency(value),
                      "Profit",
                    ]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Bar dataKey="profit" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tables and Pie Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Packages */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-accent-400" />
                Top Packages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTopPackages.map((pkg, i) => (
                  <div
                    key={pkg.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {pkg.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {pkg.bookings} bookings
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(pkg.revenue)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Staff */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Top Staff Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTopStaff.map((staff, i) => (
                  <div
                    key={staff.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {staff.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {staff.sales} sales
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(staff.revenue)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Com: {formatCurrency(staff.commission)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Method Summary */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-500" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={mockPaymentMethods}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {mockPaymentMethods.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, _name: string, props: { payload?: { amount?: number; name?: string } }) => [
                      `${value}% (${props?.payload ? formatCurrency(props.payload.amount || 0) : ''})`,
                      props?.payload?.name || '',
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {mockPaymentMethods.map((pm, i) => (
                  <div key={pm.name} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[i] }}
                    />
                    <span className="text-xs text-gray-600">{pm.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Bookings Table */}
      <motion.div variants={item}>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Receipt className="h-5 w-5 text-gray-500" />
              Recent Bookings
            </CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">
                      Booking No
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">
                      Total
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">
                      Due
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-xs text-primary-600">
                        {booking.bookingNo}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {booking.customerName}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{booking.type}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {formatCurrency(booking.totalAmount)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {booking.dueAmount > 0 ? (
                          <span className="text-red-600 font-medium">
                            {formatCurrency(booking.dueAmount)}
                          </span>
                        ) : (
                          <span className="text-emerald-600 text-xs">
                            Paid
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {formatDate(booking.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
