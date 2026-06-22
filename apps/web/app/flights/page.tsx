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
  Plane,
  ArrowRight,
  Calendar,
  Users,
  Search,
  Clock,
  Luggage,
  Utensils,
  Wifi,
  Armchair,
  ArrowLeftRight,
} from "lucide-react"
import Image from "next/image"

const flightDeals = [
  { airline: "PIA", from: "Lahore", to: "Dubai", price: 42000, duration: "3h 30m", stops: "Non-stop", date: "Jul 15, 2024" },
  { airline: "Emirates", from: "Karachi", to: "Jeddah", price: 58000, duration: "4h 15m", stops: "Non-stop", date: "Jul 20, 2024" },
  { airline: "Turkish Airlines", from: "Islamabad", to: "Istanbul", price: 72000, duration: "6h 30m", stops: "Non-stop", date: "Aug 5, 2024" },
  { airline: "Qatar Airways", from: "Lahore", to: "London", price: 98000, duration: "9h 45m", stops: "1 stop", date: "Aug 12, 2024" },
  { airline: "PIA", from: "Karachi", to: "Dubai", price: 39000, duration: "2h 20m", stops: "Non-stop", date: "Jul 25, 2024" },
  { airline: "Etihad", from: "Islamabad", to: "Abu Dhabi", price: 55000, duration: "3h 50m", stops: "Non-stop", date: "Aug 1, 2024" },
]

export default function FlightsPage() {
  const [tripType, setTripType] = useState<"oneWay" | "roundTrip">("oneWay")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-slate-900">
          <div className="absolute inset-0">
            <Image
              src="/images/flights-section.jpg"
              alt="Flights"
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
              <Badge className="mb-3 bg-emerald-600">Book Flights</Badge>
              <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
                Find the Best Flight Deals
              </h1>
              <p className="mt-3 text-slate-300 max-w-xl mx-auto">
                Compare prices and book flights to domestic and international destinations
              </p>
            </motion.div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex gap-2 mb-4">
                    <Button
                      variant={tripType === "oneWay" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTripType("oneWay")}
                      className={tripType === "oneWay" ? "bg-emerald-600" : ""}
                    >
                      One Way
                    </Button>
                    <Button
                      variant={tripType === "roundTrip" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTripType("roundTrip")}
                      className={tripType === "roundTrip" ? "bg-emerald-600" : ""}
                    >
                      Round Trip
                    </Button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">From</label>
                      <div className="relative">
                        <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 -rotate-45" />
                        <Input
                          placeholder="Departure city"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">To</label>
                      <div className="relative">
                        <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-45" />
                        <Input
                          placeholder="Destination city"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-10">
                        <Search className="w-4 h-4 mr-2" />
                        Search Flights
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Deals */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                Popular Flight Deals
              </h2>
              <p className="mt-2 text-slate-500">Best fares on top routes this month</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flightDeals.map((flight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-emerald-600">
                          {flight.airline}
                        </Badge>
                        <span className="text-xs text-slate-400">{flight.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-lg font-bold text-slate-800">{flight.from}</p>
                          <p className="text-xs text-slate-400">Pakistan</p>
                        </div>
                        <div className="flex flex-col items-center px-4">
                          <span className="text-xs text-slate-400">{flight.duration}</span>
                          <div className="flex items-center gap-1 my-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-600" />
                            <div className="w-16 h-0.5 bg-emerald-200" />
                            <Plane className="w-4 h-4 text-emerald-600 rotate-90" />
                            <div className="w-16 h-0.5 bg-emerald-200" />
                            <div className="w-2 h-2 rounded-full bg-emerald-600" />
                          </div>
                          <Badge variant="success" className="text-[10px]">{flight.stops}</Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-slate-800">{flight.to}</p>
                          <p className="text-xs text-slate-400">International</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t flex items-center justify-between">
                        <p className="text-xl font-bold text-emerald-600">
                          PKR {flight.price.toLocaleString()}
                        </p>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Armchair, title: "Comfortable Seats", desc: "Extra legroom options" },
                { icon: Wifi, title: "In-Flight WiFi", desc: "Stay connected" },
                { icon: Utensils, title: "Meals Included", desc: "Complimentary dining" },
                { icon: Luggage, title: "Generous Baggage", desc: "30kg included" },
              ].map((f) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                    <f.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">{f.title}</h3>
                  <p className="text-sm text-slate-500">{f.desc}</p>
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
