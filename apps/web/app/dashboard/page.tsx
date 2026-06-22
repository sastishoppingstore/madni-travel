"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatingButtons from "../components/FloatingButtons"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Calendar,
  Plane,
  Wallet,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  User,
  Mail,
  Phone,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react"

const userData = {
  name: "Ahmad Khan",
  email: "ahmad@example.com",
  phone: "0321 6001973",
  memberSince: "January 2024",
  totalBookings: 12,
  upcomingTrips: 2,
  totalSpent: 285000,
  loyaltyPoints: 4500,
  tier: "Gold Member",
}

const upcomingTrips = [
  {
    id: "BK-2024-001",
    destination: "Skardu Valley",
    type: "Holiday Package",
    date: "July 20, 2024",
    duration: "5 Days / 4 Nights",
    status: "confirmed",
    price: 45000,
    image: "/images/skardu-package.jpg",
  },
  {
    id: "BK-2024-002",
    destination: "Dubai, UAE",
    type: "Flight",
    date: "August 15, 2024",
    duration: "One Way",
    status: "confirmed",
    price: 42000,
    image: "/images/flights-section.jpg",
  },
]

const recentBookings = [
  { id: "BK-2024-003", destination: "Murree Hills", type: "Holiday", date: "May 10, 2024", status: "completed", amount: 18500 },
  { id: "BK-2024-004", destination: "Umrah Package", type: "Umrah", date: "April 1, 2024", status: "completed", amount: 185000 },
  { id: "BK-2024-005", destination: "Dubai Visa", type: "Visa", date: "March 15, 2024", status: "completed", amount: 15000 },
]

const quickLinks = [
  { icon: Plane, label: "Book Flight", href: "/flights" },
  { icon: Calendar, label: "Plan Holiday", href: "/holidays" },
  { icon: MapPin, label: "Book Hotel", href: "/hotels" },
  { icon: Wallet, label: "Apply Visa", href: "/visa" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-emerald-600">Confirmed</Badge>
      case "completed":
        return <Badge variant="success">Completed</Badge>
      case "pending":
        return <Badge variant="warning">Pending</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-slate-50">
        {/* Header */}
        <section className="bg-emerald-900 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
                  {userData.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white font-display">
                    Welcome, {userData.name.split(" ")[0]}!
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-emerald-200">
                    <Badge className="bg-gold-500 text-white border-0 text-xs">
                      {userData.tier}
                    </Badge>
                    <span>{userData.loyaltyPoints} points</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-emerald-400 text-emerald-100 hover:bg-emerald-800">
                  <Settings className="w-4 h-4 mr-1" />
                  Settings
                </Button>
                <Button variant="outline" size="sm" className="border-emerald-400 text-emerald-100 hover:bg-emerald-800">
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4">
                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === "overview" ? "bg-emerald-50 text-emerald-700 font-medium" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Overview
                    </button>
                    <Link href="/bookings" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                      <Calendar className="w-4 h-4" />
                      My Bookings
                    </Link>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                      <Wallet className="w-4 h-4" />
                      Payments
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                      <Star className="w-4 h-4" />
                      Loyalty Points
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </nav>
                </div>
                <Separator />
                <div className="p-4">
                  <p className="text-xs text-slate-400 mb-2">Quick Links</p>
                  <div className="space-y-1">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                        <ChevronRight className="w-3 h-3 ml-auto" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Bookings", value: userData.totalBookings, icon: Calendar },
                  { label: "Upcoming Trips", value: userData.upcomingTrips, icon: Plane },
                  { label: "Total Spent", value: `PKR ${(userData.totalSpent / 1000).toFixed(0)}K`, icon: Wallet },
                  { label: "Loyalty Points", value: userData.loyaltyPoints, icon: Star },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <stat.icon className="w-4 h-4 text-emerald-600" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Upcoming Trips */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">Upcoming Trips</h2>
                  <Link href="/bookings" className="text-sm text-emerald-600 hover:underline flex items-center gap-1">
                    View All <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {upcomingTrips.map((trip, i) => (
                    <motion.div
                      key={trip.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                              <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold text-slate-800">{trip.destination}</h3>
                                  <p className="text-xs text-slate-500">{trip.type}</p>
                                </div>
                                {getStatusBadge(trip.status)}
                              </div>
                              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {trip.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {trip.duration}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm font-bold text-emerald-600 shrink-0">
                              PKR {trip.price.toLocaleString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Bookings */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Bookings</h2>
                <Card className="border-0 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          <th className="text-left px-4 py-3 font-medium">Booking ID</th>
                          <th className="text-left px-4 py-3 font-medium">Destination</th>
                          <th className="text-left px-4 py-3 font-medium">Date</th>
                          <th className="text-left px-4 py-3 font-medium">Status</th>
                          <th className="text-right px-4 py-3 font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {recentBookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium text-slate-800">{booking.id}</td>
                            <td className="px-4 py-3">
                              <div>
                                <p className="text-slate-800">{booking.destination}</p>
                                <p className="text-xs text-slate-400">{booking.type}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-500">{booking.date}</td>
                            <td className="px-4 py-3">{getStatusBadge(booking.status)}</td>
                            <td className="px-4 py-3 text-right font-medium text-slate-800">
                              PKR {booking.amount.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
