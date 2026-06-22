"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatingButtons from "../components/FloatingButtons"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { motion } from "framer-motion"
import {
  FileText,
  Check,
  Clock,
  Shield,
  ArrowRight,
  Phone,
  Globe,
  Calendar,
  DollarSign,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"

const visaTypes = [
  {
    country: "UAE",
    flag: "AE",
    types: ["Tourist Visa", "Business Visa", "Transit Visa"],
    processing: "3-5 working days",
    validity: "30-90 days",
    fee: 15000,
  },
  {
    country: "Saudi Arabia",
    flag: "SA",
    types: ["Umrah Visa", "Tourist Visa", "Business Visa"],
    processing: "5-7 working days",
    validity: "30 days",
    fee: 18000,
  },
  {
    country: "Turkey",
    flag: "TR",
    types: ["Tourist Visa", "Business Visa"],
    processing: "7-10 working days",
    validity: "30-180 days",
    fee: 12000,
  },
  {
    country: "UK",
    flag: "GB",
    types: ["Visitor Visa", "Business Visa", "Student Visa"],
    processing: "15-30 working days",
    validity: "6 months - 10 years",
    fee: 35000,
  },
  {
    country: "Schengen",
    flag: "EU",
    types: ["Tourist Visa", "Business Visa"],
    processing: "15-30 working days",
    validity: "90 days",
    fee: 25000,
  },
  {
    country: "Malaysia",
    flag: "MY",
    types: ["Tourist Visa", "Business Visa"],
    processing: "5-7 working days",
    validity: "30-90 days",
    fee: 8000,
  },
]

const steps = [
  { num: 1, title: "Submit Documents", desc: "Upload passport, photos & supporting docs" },
  { num: 2, title: "We Review", desc: "Our team checks and prepares your application" },
  { num: 3, title: "Processing", desc: "Application submitted to the embassy" },
  { num: 4, title: "Receive Visa", desc: "Get your visa delivered to your doorstep" },
]

export default function VisaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-slate-900">
          <div className="absolute inset-0">
            <Image
              src="/images/visa-services.jpg"
              alt="Visa Services"
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
              <Badge className="mb-3 bg-violet-600">Visa Services</Badge>
              <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
                Hassle-Free Visa Services
              </h1>
              <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
                We handle all visa processing for you. Quick approvals, minimal documentation,
                and expert guidance throughout the process.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">{step.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Visa Types Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                Visa Services by Country
              </h2>
              <p className="mt-2 text-slate-500">We process visas for all major destinations</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visaTypes.map((visa, i) => (
                <motion.div
                  key={visa.country}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="border-0 shadow-md hover:shadow-xl transition-all h-full">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-slate-800">{visa.country}</h3>
                        <Shield className="w-5 h-5 text-violet-500" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {visa.types.map((t) => (
                            <Badge key={t} variant="outline" className="text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-2">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {visa.processing}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {visa.validity}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <p className="text-sm font-bold text-emerald-600">
                            From PKR {visa.fee.toLocaleString()}
                          </p>
                          <Button size="sm" variant="outline" className="text-xs h-7">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-violet-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Ready to Apply?
            </h2>
            <p className="mt-3 text-violet-100">
              Contact us today to start your visa application process.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="bg-white text-violet-700 hover:bg-gray-100">
                <Phone className="w-4 h-4 mr-2" />
                0321 6001973
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Upload Documents
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
