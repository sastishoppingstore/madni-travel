"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatingButtons from "../components/FloatingButtons"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, Clock, BookOpen, ArrowRight, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const posts = [
  {
    title: "Top 10 Destinations to Visit in Pakistan This Summer",
    excerpt: "Discover the most breathtaking locations across Pakistan, from the fairy meadows of Gilgit to the serene beaches of Gwadar. Our curated list covers everything you need for an unforgettable summer.",
    image: "/images/blog-travel-guide.jpg",
    date: "June 15, 2024",
    readTime: "8 min read",
    category: "Travel Guide",
    slug: "top-10-destinations-pakistan-summer",
  },
  {
    title: "Complete Guide to Planning Your First Umrah Journey",
    excerpt: "Everything you need to know before embarking on your spiritual journey to the holy cities of Makkah and Madinah. Tips, packing lists, and essential preparations.",
    image: "/images/umrah-packages.jpg",
    date: "June 10, 2024",
    readTime: "12 min read",
    category: "Umrah Guide",
    slug: "complete-guide-first-umrah",
  },
  {
    title: "How to Get Visa for UAE, Turkey & Schengen Countries",
    excerpt: "Step-by-step visa application guide for the most popular destinations. Understand requirements, processing times, and tips for a successful application.",
    image: "/images/visa-services.jpg",
    date: "June 5, 2024",
    readTime: "10 min read",
    category: "Visa Tips",
    slug: "visa-guide-uae-turkey-schengen",
  },
  {
    title: "Skardu vs Hunza: Which Northern Paradise to Choose?",
    excerpt: "A detailed comparison of Pakistan's two most famous northern destinations to help you decide where to spend your next vacation.",
    image: "/images/skardu-package.jpg",
    date: "May 28, 2024",
    readTime: "7 min read",
    category: "Travel Guide",
    slug: "skardu-vs-hunza-comparison",
  },
  {
    title: "Budget Travel Tips: Explore Pakistan Under PKR 20,000",
    excerpt: "Yes, it's possible! Learn how to plan an amazing trip across Pakistan without breaking the bank. Smart tips for accommodation, transport, and food.",
    image: "/images/naran-kaghan.jpg",
    date: "May 20, 2024",
    readTime: "6 min read",
    category: "Budget Travel",
    slug: "budget-travel-pakistan-20000",
  },
  {
    title: "Best Time to Visit Murree: A Seasonal Guide",
    excerpt: "From summer greenery to winter snowfall, discover the best times to visit Murree and what each season has to offer.",
    image: "/images/murree-package.jpg",
    date: "May 15, 2024",
    readTime: "5 min read",
    category: "Seasonal Guide",
    slug: "best-time-visit-murree",
  },
]

const categories = ["All", "Travel Guide", "Umrah Guide", "Visa Tips", "Budget Travel", "Seasonal Guide"]

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 bg-slate-900">
          <div className="absolute inset-0">
            <Image
              src="/images/blog-travel-guide.jpg"
              alt="Blog"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-emerald-400 uppercase tracking-wide">Travel Blog</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
                Travel Tips & Stories
              </h1>
              <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
                Expert advice, destination guides, and travel inspiration to help you plan your perfect trip.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={cat === "All" ? "default" : "outline"}
                  className={cat === "All" ? "bg-emerald-600 cursor-pointer" : "cursor-pointer hover:bg-emerald-50"}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <Badge className="absolute top-3 left-3 bg-emerald-600 text-white border-0">
                          {post.category}
                        </Badge>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-2 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-emerald-600 text-sm font-medium group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
