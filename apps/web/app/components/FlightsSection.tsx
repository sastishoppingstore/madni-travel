"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowRight, Plane, Shield, Clock, Tag } from "lucide-react"

const features = [
  { icon: Tag, text: "Best Price Guarantee" },
  { icon: Shield, text: "Secure Booking" },
  { icon: Clock, text: "Instant Confirmation" },
]

const destinations = [
  { from: "Lahore", to: "Dubai", price: 45000 },
  { from: "Karachi", to: "Jeddah", price: 52000 },
  { from: "Islamabad", to: "Istanbul", price: 68000 },
  { from: "Lahore", to: "London", price: 95000 },
]

export default function FlightsSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 text-emerald-600 border-emerald-600">
              <Plane className="w-3 h-3 mr-1" />
              Flight Booking
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
              Book Flights Worldwide
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Get the best fares to domestic and international destinations. We partner
              with major airlines to bring you competitive prices and seamless booking
              experience for your next journey.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {features.map((f) => (
                <div
                  key={f.text}
                  className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg"
                >
                  <f.icon className="w-4 h-4 text-emerald-600" />
                  {f.text}
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <p className="text-sm font-medium text-slate-700">Popular Routes:</p>
              {destinations.map((d) => (
                <div
                  key={`${d.from}-${d.to}`}
                  className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-700 font-medium">{d.from}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-700 font-medium">{d.to}</span>
                  </div>
                  <span className="text-emerald-600 font-bold text-sm">
                    PKR {d.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/flights">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Search Flights
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
                src="/images/flights-section.jpg"
                alt="Book Flights Worldwide"
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
                      <p className="text-2xl font-bold">PKR 35,000</p>
                    </div>
                    <Link href="/flights">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-emerald-200" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
