"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatingButtons from "../components/FloatingButtons"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { motion } from "framer-motion"
import {
  Globe,
  Check,
  Star,
  ArrowRight,
  Phone,
  Plane,
  Hotel,
  Car,
  Users,
  Calendar,
} from "lucide-react"
import Image from "next/image"

const umrahPackages = [
  {
    name: "Economy Umrah Package",
    price: 185000,
    nights: 14,
    hotel: "3-Star Hotel",
    distance: "800m from Haram",
    features: [
      "Return airfare",
      "3-star hotel in Makkah & Madinah",
      "Shared transport",
      "Umrah visa processing",
      "Basic Ziyarat",
    ],
  },
  {
    name: "Premium Umrah Package",
    price: 285000,
    nights: 14,
    hotel: "5-Star Hotel",
    distance: "200m from Haram",
    features: [
      "Return business class airfare",
      "5-star hotel in Makkah & Madinah",
      "Private VIP transport",
      "Umrah visa processing",
      "Comprehensive Ziyarat tours",
      "Personal religious guide",
    ],
  },
  {
    name: "Luxury Umrah Package",
    price: 425000,
    nights: 14,
    hotel: "5-Star Luxury",
    distance: "100m from Haram",
    features: [
      "Return first class airfare",
      "Luxury 5-star suites in Makkah & Madinah",
      "Private luxury transport",
      "Umrah visa processing (express)",
      "Premium Ziyarat with scholar",
      "24/7 personal concierge",
      "All meals included",
    ],
  },
]

const includedServices = [
  { icon: Plane, title: "Air Tickets", desc: "Return flights included" },
  { icon: Hotel, title: "Hotels", desc: "Near Haram in both cities" },
  { icon: Car, title: "Transport", desc: "Airport & Ziyarat transfers" },
  { icon: Globe, title: "Visa", desc: "Complete visa assistance" },
  { icon: Users, title: "Guide", desc: "Experienced religious guide" },
  { icon: Calendar, title: "Flexible", desc: "Multiple departure dates" },
]

export default function UmrahPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-slate-900">
          <div className="absolute inset-0">
            <Image
              src="/images/umrah-packages.jpg"
              alt="Umrah Packages"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-slate-900/70" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="mb-3 bg-gold-500">Umrah Services</Badge>
              <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
                Sacred Umrah Journeys
              </h1>
              <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
                Premium Umrah packages with best hotels in Makkah & Madinah. 
                Let us handle all arrangements while you focus on your spiritual journey.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Included */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {includedServices.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center p-4 bg-emerald-50 rounded-xl"
                >
                  <s.icon className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-800">{s.title}</p>
                  <p className="text-xs text-slate-500">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                Choose Your Umrah Package
              </h2>
              <p className="mt-2 text-slate-500">Packages for every budget and preference</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {umrahPackages.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card
                    className={`h-full ${
                      i === 1
                        ? "border-2 border-emerald-500 shadow-xl"
                        : "border-0 shadow-lg"
                    }`}
                  >
                    <CardContent className="p-6 flex flex-col h-full">
                      {i === 1 && (
                        <Badge className="mb-3 bg-emerald-600 self-start">
                          Most Popular
                        </Badge>
                      )}
                      <h3 className="text-xl font-bold text-slate-900 font-display">
                        {pkg.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        {pkg.nights} Nights
                        <span className="mx-1">|</span>
                        <Hotel className="w-4 h-4" />
                        {pkg.hotel}
                      </div>
                      <p className="text-xs text-emerald-600 mt-1">{pkg.distance}</p>

                      <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-emerald-600">
                          PKR {pkg.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-400">/person</span>
                      </div>

                      <ul className="mt-4 space-y-2 flex-1">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full mt-6 ${
                          i === 1
                            ? "bg-emerald-600 hover:bg-emerald-700"
                            : "bg-slate-800 hover:bg-slate-900"
                        }`}
                        size="lg"
                      >
                        Book Package
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-emerald-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Need Help Choosing?
            </h2>
            <p className="mt-3 text-emerald-200">
              Our Umrah specialists are here to guide you through every step.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Call 0321 6001973
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-400 text-emerald-100 hover:bg-emerald-800"
              >
                Request a Callback
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
