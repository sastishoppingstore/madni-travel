"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Users,
  Sliders,
  Heart,
} from "lucide-react"

const features = [
  {
    icon: BadgeCheck,
    title: "Best Prices",
    description:
      "We guarantee the most competitive prices with our best price promise on all bookings.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available round the clock to assist you with any queries.",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description:
      "Your payments and personal data are protected with industry-standard encryption.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: Users,
    title: "Expert Agents",
    description:
      "Our experienced travel consultants help plan your perfect trip with insider knowledge.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Sliders,
    title: "Custom Packages",
    description:
      "Tailor your travel experience with our flexible and customizable package options.",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: Heart,
    title: "Happy Customers",
    description:
      "Over 10,000 satisfied travelers trust us with their journeys every year.",
    color: "bg-teal-100 text-teal-600",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
              <Image
                src="/images/why-choose-us.jpg"
                alt="Why Choose Madni Travel"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-5xl font-bold">15+</p>
                <p className="text-lg mt-1">Years of Excellence</p>
                <div className="mt-4 flex gap-4">
                  <div>
                    <p className="text-2xl font-bold">10K+</p>
                    <p className="text-xs text-white/70">Happy Travelers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">50+</p>
                    <p className="text-xs text-white/70">Destinations</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">4.9</p>
                    <p className="text-xs text-white/70">Average Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
                Why Choose Us
              </h2>
              <p className="mt-3 text-slate-500">
                We go above and beyond to make your travel experience memorable
              </p>
              <div className="mt-3 w-16 h-1 bg-emerald-600 rounded-full" />
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-5"
            >
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  variants={item}
                  className="group"
                >
                  <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-slate-100 group-hover:border-emerald-200">
                    <div
                      className={`w-11 h-11 rounded-lg ${f.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <f.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
