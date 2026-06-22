"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatingButtons from "../components/FloatingButtons"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { motion } from "framer-motion"
import {
  Calendar,
  Plane,
  Search,
  Filter,
  MapPin,
  Clock,
  ArrowRight,
  Receipt,
  Download,
  Eye,
} from "lucide-react"

const allBookings = [
  {
    id: "BK-2024-001",
    destination: "Skardu Valley",
    type: "Holiday Package",
    date: "July 20, 2024",
    bookingDate: "June 1, 2024",
    duration: "5 Days / 4 Nights",
    status: "confirmed",
    price: 45000,
    image: "/images/skardu-package.jpg",
    travelers: 2,
  },
  {
    id: "BK-2024-002",
    destination: "Dubai, UAE",
    type: "Flight",
    date: "August 15, 2024",
    bookingDate: "June 10, 2024",
    duration: "One Way",
    status: "confirmed",
    price: 42000,
    image: "/images/flights-section.jpg",
    travelers: 1,
  },
  {
    id: "BK-2024-003",
    destination: "Murree Hills",
    type: "Holiday Package",
    date: "May 10, 2024",
    bookingDate: "April 20, 2024",
    duration: "3 Days / 2 Nights",
    status: "completed",
    price: 18500,
    image: "/images/murree-package.jpg",
    travelers: 4,
  },
  {
    id: "BK-2024-004",
    destination: "Umrah Package",
    type: "Umrah",
    date: "April 1, 2024",
    bookingDate: "February 15, 2024",
    duration: "14 Days",
    status: "completed",
    price: 185000,
    image: "/images/umrah-packages.jpg",
    travelers: 2,
  },
  {
    id: "BK-2024-005",
    destination: "Dubai Visa",
    type: "Visa",
    date: "March 15, 2024",
    bookingDate: "March 1, 2024",
    duration: "30 days",
    status: "completed",
    price: 15000,
    image: "/images/visa-services.jpg",
    travelers: 1,
  },
  {
    id: "BK-2024-006",
    destination: "Naran Kaghan",
    type: "Holiday Package",
    date: "June 5, 2024",
    bookingDate: "May 15, 2024",
    duration: "4 Days / 3 Nights",
    status: "cancelled",
    price: 28000,
    image: "/images/naran-kaghan.jpg",
    travelers: 2,
  },
  {
    id: "BK-2024-007",
    destination: "Hunza Valley",
    type: "Holiday Package",
    date: "September 10, 2024",
    bookingDate: "June 20, 2024",
    duration: "5 Days / 4 Nights",
    status: "confirmed",
    price: 38000,
    image: "/images/hunza-package.jpg",
    travelers: 2,
  },
]

const filterOptions = ["All", "Confirmed", "Completed", "Cancelled", "Pending"]

export default function BookingsPage() {
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  const filteredBookings = allBookings.filter((b) => {
    const matchesFilter = filter === "All" || b.status === filter.toLowerCase()
    const matchesSearch = b.destination.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

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
        <section className="bg-white border-b py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                My Bookings
              </h1>
              <p className="text-slate-500 mt-1">
                View and manage all your travel bookings
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search by destination or booking ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-white"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {filterOptions.map((f) => (
                  <Button
                    key={f}
                    variant={filter === f ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(f)}
                    className={filter === f ? "bg-emerald-600" : ""}
                  >
                    {f}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Booking Cards */}
          <div className="space-y-4">
            {filteredBookings.length === 0 && (
              <div className="text-center py-16">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No bookings found matching your criteria.</p>
              </div>
            )}
            {filteredBookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                        <img src={booking.image} alt={booking.destination} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-slate-800">{booking.destination}</h3>
                            <p className="text-xs text-slate-500">
                              {booking.id} &middot; {booking.type}
                            </p>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {booking.travelers} travelers
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div>
                            <p className="text-xs text-slate-400">Booked on {booking.bookingDate}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="text-lg font-bold text-emerald-600">
                              PKR {booking.price.toLocaleString()}
                            </p>
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          {filteredBookings.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Card className="border-0 shadow-sm bg-emerald-50">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Receipt className="w-6 h-6 text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          Showing {filteredBookings.length} booking{filteredBookings.length !== 1 ? "s" : ""}
                        </p>
                        <p className="text-xs text-slate-500">
                          Total value: PKR {filteredBookings.reduce((sum, b) => sum + b.price, 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-700">
                      <Download className="w-4 h-4 mr-1" />
                      Download Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
