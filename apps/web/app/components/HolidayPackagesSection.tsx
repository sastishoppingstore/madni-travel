"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowRight, Palmtree, Calendar, Users, Star } from "lucide-react"

const features = [
  { icon: Star, text: "Top Rated Packages" },
  { icon: Calendar, text: "Flexible Dates" },
  { icon: Users, text: "Group Discounts" },
]

export default function HolidayPackagesSection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
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
                src="/images/holiday-packages.jpg"
                alt="Explore Holiday Packages"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs text-white/70">Holiday Packages</p>
                      <p className="text-2xl font-bold">From PKR 25,000</p>
                    </div>
                    <Link href="/holidays">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Explore
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-gold-200" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:order-2"
          >
            <Badge variant="outline" className="mb-4 text-gold-600 border-gold-500">
              <Palmtree className="w-3 h-3 mr-1" />
              Holiday Packages
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
              Explore Holiday Packages
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Curated packages for unforgettable vacations. From the snow-capped peaks of
              the north to the pristine beaches of the south, we have the perfect package
              for every traveler.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {features.map((f) => (
                <div
                  key={f.text}
                  className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-2 rounded-lg shadow-sm"
                >
                  <f.icon className="w-4 h-4 text-gold-500" />
                  {f.text}
                </div>
              ))}
            </div>

            <ul className="mt-6 space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Customizable itineraries to match your preferences
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Expert local guides at every destination
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                All-inclusive packages with meals and transport
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Family and group discounts available
              </li>
            </ul>

            <div className="mt-8">
              <Link href="/holidays">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  View Packages
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
