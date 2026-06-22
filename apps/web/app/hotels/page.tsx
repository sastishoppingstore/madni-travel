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
  Hotel,
  MapPin,
  Star,
  Search,
  Wifi,
  Car,
  Utensils,
  Waves,
  Dumbbell,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"

const hotels = [
  {
    name: "Pearl Continental Lahore",
    city: "Lahore",
    rating: 4.8,
    reviews: 1240,
    price: 18500,
    image: "/images/hotel-booking.jpg",
    amenities: ["WiFi", "Pool", "Gym", "Restaurant"],
  },
  {
    name: "Serena Hotel Islamabad",
    city: "Islamabad",
    rating: 4.9,
    reviews: 980,
    price: 22000,
    image: "/images/why-choose-us.jpg",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant"],
  },
  {
    name: "Marriott Karachi",
    city: "Karachi",
    rating: 4.7,
    reviews: 850,
    price: 20000,
    image: "/images/holiday-packages.jpg",
    amenities: ["WiFi", "Pool", "Gym", "Restaurant"],
  },
  {
    name: "Shangrila Resort Skardu",
    city: "Skardu",
    rating: 4.6,
    reviews: 620,
    price: 15000,
    image: "/images/skardu-package.jpg",
    amenities: ["WiFi", "Lake View", "Restaurant"],
  },
  {
    name: "Hunza Serena Inn",
    city: "Hunza",
    rating: 4.5,
    reviews: 450,
    price: 12000,
    image: "/images/hunza-package.jpg",
    amenities: ["WiFi", "Mountain View", "Restaurant"],
  },
  {
    name: "Bhurban Apartments",
    city: "Murree",
    rating: 4.4,
    reviews: 380,
    price: 8500,
    image: "/images/murree-package.jpg",
    amenities: ["WiFi", "Heater", "Restaurant"],
  },
]

export default function HotelsPage() {
  const [search, setSearch] = useState("")

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-slate-900">
          <div className="absolute inset-0">
            <Image
              src="/images/hotel-booking.jpg"
              alt="Hotel Booking"
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
              <Badge className="mb-3 bg-rose-600">Hotel Booking</Badge>
              <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
                Luxury Hotel Bookings
              </h1>
              <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
                Best rates at top hotels worldwide. Book your perfect stay with Madni Travel.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search by city or hotel name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Button className="bg-rose-600 hover:bg-rose-700">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Hotels Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                Popular Hotels
              </h2>
              <p className="mt-2 text-slate-500">Handpicked hotels for a perfect stay</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel, i) => (
                <motion.div
                  key={hotel.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-0.5">
                        <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                        <span className="text-xs font-semibold">{hotel.rating}</span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-slate-800">{hotel.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3 h-3" />
                        {hotel.city}
                        <span className="mx-1">|</span>
                        <span>{hotel.reviews} reviews</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {hotel.amenities.map((a) => (
                          <Badge key={a} variant="outline" className="text-[10px]">
                            {a}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t">
                        <div>
                          <p className="text-xs text-slate-400">per night</p>
                          <p className="text-xl font-bold text-emerald-600">
                            PKR {hotel.price.toLocaleString()}
                          </p>
                        </div>
                        <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
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
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
