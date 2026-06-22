"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Smartphone, Bell, MapPin, CreditCard, Star, Download } from "lucide-react"

const features = [
  { icon: Bell, text: "Get instant booking notifications" },
  { icon: MapPin, text: "Track your trips in real-time" },
  { icon: CreditCard, text: "Secure & easy payments" },
  { icon: Star, text: "Exclusive app-only deals" },
]

export default function AppDownload() {
  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600 uppercase tracking-wide">
                Mobile App
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
              Download Our App
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Book on the go with the Madni Travel app. Get exclusive deals,
              instant notifications, and manage all your bookings from one place.
            </p>

            <div className="mt-6 space-y-3">
              {features.map((f) => (
                <div
                  key={f.text}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <f.icon className="w-4 h-4 text-emerald-600" />
                  </div>
                  {f.text}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0225 3.503c-1.4655-.6417-3.1141-1.0004-4.1369-1.0004-1.0225 0-2.6712.3587-4.1366 1.0004l-2.0225-3.5029a.4162.4162 0 00-.5677-.1521.4156.4156 0 00-.1521.5676l1.9973 3.4591C2.6889 11.1867.3432 14.6589.3432 18.6617h23.3136c0-4.0028-2.3457-7.475-5.7748-9.3403" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] leading-none">Download on the</p>
                  <p className="text-sm font-semibold leading-tight">App Store</p>
                </div>
              </Link>
              <Link
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] leading-none">Get it on</p>
                  <p className="text-sm font-semibold leading-tight">Google Play</p>
                </div>
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
                src="/images/app-download.jpg"
                alt="Download Madni Travel App"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs text-white/70">Download now</p>
                      <p className="text-xl font-bold">Madni Travel App</p>
                    </div>
                    <Download className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
