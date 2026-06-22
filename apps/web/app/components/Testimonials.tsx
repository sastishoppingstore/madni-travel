"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Ahmad Khan",
    role: "Business Traveler",
    avatar: "AK",
    rating: 5,
    text: "Madni Travel made our family trip to Skardu absolutely unforgettable. The hotel arrangements, transport, and guide were all top-notch. Highly recommended!",
  },
  {
    name: "Fatima Ali",
    role: "Family Vacation",
    avatar: "FA",
    rating: 5,
    text: "We booked our Umrah package through Madni Travel and everything was perfectly organized. The hotels in Makkah and Madinah were excellent. Thank you for a spiritual journey!",
  },
  {
    name: "Muhammad Rizwan",
    role: "Adventure Enthusiast",
    avatar: "MR",
    rating: 5,
    text: "The Naran Kaghan tour was amazing! Camping under the stars at Saif-ul-Malook was a dream come true. Great service and very professional team.",
  },
  {
    name: "Sana Malik",
    role: "Frequent Flyer",
    avatar: "SM",
    rating: 5,
    text: "I always book my international flights through Madni Travel. They consistently find the best fares and the customer service is exceptional. Truly Pakistan's best travel agency!",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-emerald-900/5" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-gold-500 fill-gold-500" />
            <span className="text-sm font-medium text-emerald-600 uppercase tracking-wide">
              Testimonials
            </span>
            <Star className="w-5 h-5 text-gold-500 fill-gold-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Real stories from real travelers who trusted us with their journeys
          </p>
          <div className="mt-3 w-16 h-1 bg-emerald-600 mx-auto rounded-full" />
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-xl mb-12 max-w-4xl mx-auto aspect-[21/9]"
        >
          <Image
            src="/images/testimonials.jpg"
            alt="Happy travelers"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/30 to-slate-900/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-4xl sm:text-5xl font-bold">4.9/5</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-500 fill-gold-500" />
                ))}
              </div>
              <p className="mt-2 text-white/80">Based on 2,000+ reviews</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={item}>
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-5 flex flex-col h-full">
                  <Quote className="w-8 h-8 text-emerald-200 mb-3" />
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {t.name}
                        </p>
                        <p className="text-xs text-slate-400">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 mt-2">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 text-gold-500 fill-gold-500"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
