"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatingButtons from "../components/FloatingButtons"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { motion } from "framer-motion"
import {
  Palmtree,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
  Check,
  Phone,
} from "lucide-react"
import Image from "next/image"

const packages = [
  {
    title: "Skardu Valley Adventure",
    image: "/images/skardu-package.jpg",
    duration: "5 Days / 4 Nights",
    groupSize: "2-8 People",
    price: 45000,
    rating: 4.9,
    tag: "Best Seller",
    highlights: ["Shangrila Resort", "Deosai Plains", "Satpara Lake"],
  },
  {
    title: "Hunza Valley Explorer",
    image: "/images/hunza-package.jpg",
    duration: "5 Days / 4 Nights",
    groupSize: "2-10 People",
    price: 38000,
    rating: 4.9,
    tag: "Top Rated",
    highlights: ["Attabad Lake", "Passu Cones", "Baltit Fort"],
  },
  {
    title: "Murree Hills Retreat",
    image: "/images/murree-package.jpg",
    duration: "3 Days / 2 Nights",
    groupSize: "2-10 People",
    price: 18500,
    rating: 4.8,
    tag: "Most Popular",
    highlights: ["Cable Car", "Mall Road", "Pindi Point"],
  },
  {
    title: "Naran Kaghan Expedition",
    image: "/images/naran-kaghan.jpg",
    duration: "4 Days / 3 Nights",
    groupSize: "2-12 People",
    price: 28000,
    rating: 4.7,
    tag: "Adventure",
    highlights: ["Saif-ul-Malook", "Lalazar", "Babusar Top"],
  },
  {
    title: "Neelum Valley Kashmir",
    image: "/images/kashmir-section.jpg",
    duration: "5 Days / 4 Nights",
    groupSize: "2-10 People",
    price: 32000,
    rating: 4.8,
    tag: "Trending",
    highlights: ["Ratti Gali Lake", "Arang Kel", "Sharda"],
  },
  {
    title: "International Dubai Tour",
    image: "/images/holiday-packages.jpg",
    duration: "5 Days / 4 Nights",
    groupSize: "2-6 People",
    price: 125000,
    rating: 4.9,
    tag: "International",
    highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall"],
  },
]

export default function HolidaysPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-slate-900">
          <div className="absolute inset-0">
            <Image
              src="/images/holiday-packages.jpg"
              alt="Holiday Packages"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="mb-3 bg-gold-500">Holiday Packages</Badge>
              <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
                Explore Holiday Packages
              </h1>
              <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
                Curated packages for unforgettable vacations across Pakistan and beyond.
                Choose your adventure and let us handle the rest.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group h-full">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-gold-500 text-white border-0">
                        {pkg.tag}
                      </Badge>
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-0.5">
                        <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                        <span className="text-xs font-semibold">{pkg.rating}</span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <h3 className="text-lg font-bold text-white font-display">{pkg.title}</h3>
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <MapPin className="w-3 h-3" />
                          <span>Available Year Round</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {pkg.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {pkg.groupSize}
                        </span>
                      </div>
                      <div className="space-y-1.5 mb-4">
                        {pkg.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2 text-sm text-slate-600">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            {h}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div>
                          <p className="text-xs text-slate-400">Starting from</p>
                          <p className="text-xl font-bold text-emerald-600">
                            PKR {pkg.price.toLocaleString()}
                          </p>
                        </div>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          Book Now
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-emerald-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Want a Custom Package?
            </h2>
            <p className="mt-3 text-emerald-100">
              Our travel experts can create a personalized itinerary just for you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="white">
                <Phone className="w-4 h-4 mr-2" />
                Call 0321 6001973
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Request a Quote
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
