"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatingButtons from "../components/FloatingButtons"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { motion } from "framer-motion"
import {
  Plane,
  Award,
  Users,
  Globe,
  Heart,
  Target,
  Shield,
  Star,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import Image from "next/image"

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Travelers" },
  { icon: Globe, value: "50+", label: "Destinations" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Star, value: "4.9", label: "Average Rating" },
]

const values = [
  {
    icon: Heart,
    title: "Passion for Travel",
    description: "We love what we do and it shows in every trip we plan. Your happiness is our success.",
  },
  {
    icon: Target,
    title: "Customer First",
    description: "Every decision we make is centered around providing the best experience for our customers.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "No hidden fees, no surprises. We believe in honest pricing and clear communication.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We continuously strive to exceed expectations and set new standards in travel services.",
  },
]

const milestones = [
  { year: "2010", event: "Madni Travel founded in Lahore" },
  { year: "2013", event: "Expanded to Islamabad and Karachi" },
  { year: "2015", event: "Launched Umrah services" },
  { year: "2017", event: "Served 5,000th customer" },
  { year: "2019", event: "Introduced online booking platform" },
  { year: "2021", event: "Launched mobile app" },
  { year: "2023", event: "Served 10,000th customer" },
  { year: "2024", event: "Expanded to 50+ destinations" },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-emerald-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px"
            }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-3 bg-white/20 text-white">About Us</Badge>
              <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
                Pakistan's Most Trusted Travel Partner
              </h1>
              <p className="mt-3 text-emerald-100 max-w-2xl mx-auto">
                Since 2010, Madni Travel has been helping Pakistanis explore the world with
                confidence, comfort, and affordability.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <s.icon className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-slate-900">{s.value}</p>
                  <p className="text-sm text-slate-500">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <Image
                    src="/images/why-choose-us.jpg"
                    alt="Madni Travel Team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                  Our Story
                </h2>
                <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Madni Travel was founded in 2010 with a simple mission: to make travel
                    accessible, affordable, and enjoyable for every Pakistani. What started
                    as a small office has grown into one of Pakistan's most trusted
                    travel agencies, now based in Sargodha.
                  </p>
                  <p>
                    Over the years, we have served more than 10,000 travelers, helping them
                    explore destinations across Pakistan and the world. From family vacations
                    to corporate travel, from Umrah pilgrimages to adventure expeditions,
                    we handle every trip with care and dedication.
                  </p>
                  <p>
                    Our team of experienced travel consultants works tirelessly to find the
                    best deals, craft perfect itineraries, and ensure seamless travel
                    experiences. We believe that travel is not just about reaching a
                    destination — it's about the journey, the memories, and the stories
                    you bring back.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                Our Values
              </h2>
              <p className="mt-2 text-slate-500">The principles that guide everything we do</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all h-full text-center p-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                      <v.icon className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-slate-800">{v.title}</h3>
                    <p className="text-sm text-slate-500 mt-2">{v.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                Our Journey
              </h2>
              <p className="mt-2 text-slate-500">Milestones that define our growth</p>
            </motion.div>
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-16 shrink-0">
                    <span className="text-lg font-bold text-emerald-600">{m.year}</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
                  <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-slate-700">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
