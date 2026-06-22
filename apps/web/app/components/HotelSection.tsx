"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowRight, Hotel, Star, MapPin, Wifi, Car, Utensils } from "lucide-react"

const amenities = [
  { icon: Wifi, label: "Free WiFi" },
  { icon: Car, label: "Free Parking" },
  { icon: Utensils, label: "Restaurant" },
]

const hotels = [
  { name: "PC Hotel Lahore", city: "Lahore", rating: 4.8, price: 18000 },
  { name: "Serena Hotel", city: "Islamabad", rating: 4.9, price: 22000 },
  { name: "Marriott Karachi", city: "Karachi", rating: 4.7, price: 20000 },
  { name: "Shangrila Skardu", city: "Skardu", rating: 4.6, price: 15000 },
]

export default function HotelSection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 text-rose-600 border-rose-400">
              <Hotel className="w-3 h-3 mr-1" />
              Hotel Booking
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
              Luxury Hotel Bookings
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Best rates at top hotels worldwide. Whether you need a luxury stay or a
              budget-friendly option, we have partnerships with hotels across the globe
              to give you the best deals.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {amenities.map((a) => (
                <div
                  key={a.label}
                  className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-2 rounded-lg shadow-sm"
                >
                  <a.icon className="w-4 h-4 text-rose-500" />
                  {a.label}
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-sm font-medium text-slate-700">Popular Hotels:</p>
              {hotels.map((h) => (
                <div
                  key={h.name}
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
                      <Hotel className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{h.name}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" />
                        {h.city}
                        <Star className="w-3 h-3 text-gold-500 fill-gold-500 ml-1" />
                        {h.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">
                      PKR {h.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400">/night</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/hotels">
                <Button
                  size="lg"
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                >
                  Search Hotels
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/hotel-booking.jpg"
                alt="Luxury Hotel Bookings"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs text-white/70">Starting from</p>
                      <p className="text-2xl font-bold">PKR 5,000/night</p>
                    </div>
                    <Link href="/hotels">
                      <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-rose-200" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
