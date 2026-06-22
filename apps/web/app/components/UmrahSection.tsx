"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowRight, Globe, Check, Star } from "lucide-react"

const features = [
  "Economy & Business class air tickets",
  "5-star hotel accommodation in Makkah & Madinah",
  "VIP transport services",
  "Experienced religious guides",
  "Ziyarat tours included",
  "Complete visa processing assistance",
]

const packages = [
  { name: "Economy Umrah", price: 185000, nights: 14 },
  { name: "Premium Umrah", price: 285000, nights: 14 },
  { name: "Luxury Umrah", price: 425000, nights: 14 },
]

export default function UmrahSection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-900/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 text-emerald-600 border-emerald-600">
              <Globe className="w-3 h-3 mr-1" />
              Umrah Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
              Sacred Umrah Journeys
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Premium Umrah packages with best hotels in Makkah & Madinah. Let us
              handle all the arrangements while you focus on your spiritual journey.
            </p>

            <ul className="mt-6 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            {/* Package Cards */}
            <div className="mt-8 grid gap-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm border border-slate-100"
                >
                  <div>
                    <p className="font-medium text-slate-800">{pkg.name}</p>
                    <p className="text-xs text-slate-500">{pkg.nights} nights</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600">
                      PKR {pkg.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400">per person</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Link href="/umrah">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  View Umrah Packages
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  Get a Quote
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
                src="/images/umrah-packages.jpg"
                alt="Sacred Umrah Journeys"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs text-white/70 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                        4.9 Rating
                      </p>
                      <p className="text-2xl font-bold">2,500+ pilgrims served</p>
                    </div>
                    <Link href="/umrah">
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
