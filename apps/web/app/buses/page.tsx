"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatingButtons from "../components/FloatingButtons"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { motion } from "framer-motion"
import {
  Bus,
  MapPin,
  Clock,
  Armchair,
  Wifi,
  Snowflake,
  Monitor,
  ArrowRight,
  ArrowLeftRight,
  Search,
} from "lucide-react"
import Image from "next/image"

const routes = [
  { from: "Lahore", to: "Islamabad", price: 1500, duration: "4.5 hours", departures: "Every 2 hours", amenities: ["WiFi", "AC", "TV"] },
  { from: "Lahore", to: "Karachi", price: 3500, duration: "14 hours", departures: "Daily 9PM", amenities: ["WiFi", "AC", "TV", "Sleeper"] },
  { from: "Islamabad", to: "Muzaffarabad", price: 1200, duration: "3 hours", departures: "Every 3 hours", amenities: ["AC", "TV"] },
  { from: "Lahore", to: "Murree", price: 1800, duration: "5 hours", departures: "Daily 7AM", amenities: ["WiFi", "AC", "TV"] },
  { from: "Lahore", to: "Peshawar", price: 1600, duration: "5 hours", departures: "Every 4 hours", amenities: ["AC", "TV"] },
  { from: "Islamabad", to: "Swat", price: 1400, duration: "4 hours", departures: "Daily 8AM", amenities: ["WiFi", "AC", "TV"] },
]

const amenities = [
  { icon: Armchair, label: "Reclining Seats" },
  { icon: Wifi, label: "Free WiFi" },
  { icon: Snowflake, label: "Air Conditioned" },
  { icon: Monitor, label: "Entertainment" },
]

export default function BusesPage() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-slate-900">
          <div className="absolute inset-0">
            <Image
              src="/images/bus-booking.jpg"
              alt="Bus Booking"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <Badge className="mb-3 bg-orange-600">Bus Booking</Badge>
              <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
                Comfortable Bus Travel
              </h1>
              <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
                Premium bus services across Pakistan. Travel in comfort and style.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} className="pl-9" />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} className="pl-9" />
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      <Search className="w-4 h-4 mr-2" />
                      Search Buses
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Amenities */}
        <section className="py-10 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {amenities.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-orange-50 rounded-xl p-4"
                >
                  <a.icon className="w-6 h-6 text-orange-600" />
                  <span className="text-sm font-medium text-slate-700">{a.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Routes */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                Popular Routes
              </h2>
              <p className="mt-2 text-slate-500">Daily departures across Pakistan</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {routes.map((route, i) => (
                <motion.div
                  key={`${route.from}-${route.to}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Bus className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-800">{route.from}</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                            <span className="font-semibold text-slate-800">{route.to}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {route.duration}
                            </span>
                            <span>{route.departures}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {route.amenities.map((a) => (
                          <Badge key={a} variant="outline" className="text-[10px]">
                            {a}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <p className="text-xl font-bold text-emerald-600">
                          PKR {route.price.toLocaleString()}
                        </p>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          Book Ticket
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
