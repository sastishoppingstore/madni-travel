"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowRight, FileText, Check, Clock, Shield } from "lucide-react"

const countries = [
  { name: "UAE", days: "3-5 days", type: "Tourist/Business" },
  { name: "Saudi Arabia", days: "5-7 days", type: "Umrah/Work" },
  { name: "Turkey", days: "7-10 days", type: "Tourist" },
  { name: "UK", days: "15-30 days", type: "Visitor/Study" },
  { name: "Schengen", days: "15-30 days", type: "Tourist/Business" },
  { name: "Malaysia", days: "5-7 days", type: "Tourist" },
]

const steps = [
  "Submit required documents",
  "We review and process your application",
  "Visa processing with embassy",
  "Receive your visa",
]

export default function VisaSection() {
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
                src="/images/visa-services.jpg"
                alt="Hassle-Free Visa Services"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm">99% Success Rate</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm">Fast Processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-violet-200" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:order-2"
          >
            <Badge variant="outline" className="mb-4 text-violet-600 border-violet-500">
              <FileText className="w-3 h-3 mr-1" />
              Visa Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
              Hassle-Free Visa Services
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              We handle all visa processing for you. Our experienced team ensures
              smooth and quick visa approvals for all major destinations worldwide.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {countries.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-700">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.type}</p>
                  </div>
                  <Badge variant="success" className="text-xs shrink-0">
                    {c.days}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-slate-700 mb-2">How it works:</p>
              <div className="flex flex-wrap gap-2">
                {steps.map((step, i) => (
                  <div
                    key={step}
                    className="flex items-center gap-1.5 text-sm text-slate-600"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-xs flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link href="/visa">
                <Button
                  size="lg"
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                  Apply for Visa
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
