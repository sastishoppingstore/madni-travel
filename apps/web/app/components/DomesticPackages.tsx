"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { MapPin, Clock, Users, ArrowRight, Star } from "lucide-react"

const packages = [
  {
    title: "Murree Hills",
    image: "/images/murree-package.jpg",
    description: "Experience the scenic beauty of Murree with cable car rides, mall road walks, and hilltop views.",
    price: 18500,
    duration: "3 Days / 2 Nights",
    groupSize: "2-10 People",
    rating: 4.8,
    tag: "Most Popular",
  },
  {
    title: "Skardu Valley",
    image: "/images/skardu-package.jpg",
    description: "Explore the breathtaking Shangrila Resort, Deosai Plains, and Satpara Lake in Skardu.",
    price: 45000,
    duration: "5 Days / 4 Nights",
    groupSize: "2-8 People",
    rating: 4.9,
    tag: "Top Rated",
  },
  {
    title: "Hunza Valley",
    image: "/images/hunza-package.jpg",
    description: "Visit the magical Attabad Lake, Passu Cones, and experience the hospitality of Hunza.",
    price: 38000,
    duration: "5 Days / 4 Nights",
    groupSize: "2-10 People",
    rating: 4.9,
    tag: "Best Seller",
  },
  {
    title: "Naran Kaghan",
    image: "/images/naran-kaghan.jpg",
    description: "Camp under the stars at Saif-ul-Malook, visit Lalazar Plateau and Babusar Top.",
    price: 28000,
    duration: "4 Days / 3 Nights",
    groupSize: "2-12 People",
    rating: 4.7,
    tag: "Adventure",
  },
  {
    title: "Kashmir",
    image: "/images/kashmir-section.jpg",
    description: "Discover the paradise on Earth with Neelum Valley, Ratti Gali Lake, and Arang Kel.",
    price: 32000,
    duration: "5 Days / 4 Nights",
    groupSize: "2-10 People",
    rating: 4.8,
    tag: "Trending",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function DomesticPackages() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-3 bg-emerald-600">Domestic Tours</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            Popular Domestic Packages
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Explore the breathtaking beauty of Pakistan with our carefully curated domestic tour packages
          </p>
          <div className="mt-3 w-16 h-1 bg-emerald-600 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {packages.map((pkg) => (
            <motion.div key={pkg.title} variants={cardItem}>
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-gold-500 text-white border-0">
                    {pkg.tag}
                  </Badge>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-0.5">
                    <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                    <span className="text-xs font-semibold">{pkg.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-xl font-bold text-white font-display">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center gap-1 text-white/80 text-xs mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>Pakistan</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                    {pkg.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {pkg.groupSize}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Starting from</p>
                      <p className="text-xl font-bold text-emerald-600">
                        PKR {pkg.price.toLocaleString()}
                      </p>
                    </div>
                    <Link href="/holidays">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Book Now
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* View All Card */}
          <motion.div variants={cardItem}>
            <Link href="/holidays">
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-emerald-600 cursor-pointer group">
                <CardContent className="p-5 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display mb-2">
                    View All Packages
                  </h3>
                  <p className="text-emerald-100 text-sm mb-4">
                    Discover more amazing destinations across Pakistan
                  </p>
                  <div className="flex items-center text-white font-medium group-hover:gap-2 transition-all">
                    Explore All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
