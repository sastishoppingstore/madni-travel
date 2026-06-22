"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowRight, Bus, Wifi, Armchair, Snowflake, Monitor } from "lucide-react"

const features = [
  { icon: Armchair, label: "Reclining Seats" },
  { icon: Wifi, label: "Free WiFi" },
  { icon: Snowflake, label: "Air Conditioned" },
  { icon: Monitor, label: "Entertainment" },
]

const routes = [
  { from: "Lahore", to: "Islamabad", price: 1500, duration: "4.5 hours" },
  { from: "Lahore", to: "Karachi", price: 3500, duration: "14 hours" },
  { from: "Islamabad", to: "Muzaffarabad", price: 1200, duration: "3 hours" },
  { from: "Lahore", to: "Murree", price: 1800, duration: "5 hours" },
]

export default function BusSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/bus-booking.jpg"
                alt="Comfortable Bus Travel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-4 text-white">
                    {features.map((f) => (
                      <div key={f.label} className="flex items-center gap-1.5">
                        <f.icon className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs">{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-orange-200" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:order-2"
          >
            <Badge variant="outline" className="mb-4 text-orange-600 border-orange-400">
              <Bus className="w-3 h-3 mr-1" />
              Bus Booking
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
              Comfortable Bus Travel
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Premium bus services across Pakistan. Travel in comfort with our
              luxury coaches featuring reclining seats, WiFi, air conditioning, and
              onboard entertainment.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg"
                >
                  <f.icon className="w-4 h-4 text-orange-500" />
                  {f.label}
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-sm font-medium text-slate-700">Popular Routes:</p>
              {routes.map((r) => (
                <div
                  key={`${r.from}-${r.to}`}
                  className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Bus className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {r.from} &rarr; {r.to}
                      </p>
                      <p className="text-xs text-slate-400">{r.duration}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-emerald-600">
                    PKR {r.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/buses">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Book Bus Tickets
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
