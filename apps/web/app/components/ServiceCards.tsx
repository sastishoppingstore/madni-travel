"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Plane,
  Palmtree,
  Globe,
  FileText,
  Hotel,
  Bus,
} from "lucide-react"
import { Card, CardContent } from "./ui/card"

const services = [
  {
    title: "Flights",
    description: "Book domestic & international flights at best fares",
    icon: Plane,
    href: "/flights",
    color: "bg-sky-500",
    lightColor: "bg-sky-50 text-sky-600",
  },
  {
    title: "Holidays",
    description: "Curated holiday packages for unforgettable vacations",
    icon: Palmtree,
    href: "/holidays",
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Umrah",
    description: "Premium Umrah packages with best accommodations",
    icon: Globe,
    href: "/umrah",
    color: "bg-gold-500",
    lightColor: "bg-amber-50 text-amber-600",
  },
  {
    title: "Visa",
    description: "Hassle-free visa processing for all countries",
    icon: FileText,
    href: "/visa",
    color: "bg-violet-500",
    lightColor: "bg-violet-50 text-violet-600",
  },
  {
    title: "Hotels",
    description: "Best rates at luxury hotels worldwide",
    icon: Hotel,
    href: "/hotels",
    color: "bg-rose-500",
    lightColor: "bg-rose-50 text-rose-600",
  },
  {
    title: "Buses",
    description: "Premium bus services across Pakistan",
    icon: Bus,
    href: "/buses",
    color: "bg-orange-500",
    lightColor: "bg-orange-50 text-orange-600",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function ServiceCards() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            Our Services
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Everything you need for your perfect journey, all in one place
          </p>
          <div className="mt-3 w-16 h-1 bg-emerald-600 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={item}>
              <Link href={service.href}>
                <Card className="group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <div
                      className={`w-14 h-14 rounded-2xl ${service.lightColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
