"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react"

const posts = [
  {
    title: "Top 10 Destinations to Visit in Pakistan This Summer",
    excerpt:
      "Discover the most breathtaking locations across Pakistan, from the fairy meadows of Gilgit to the serene beaches of Gwadar.",
    image: "/images/blog-travel-guide.jpg",
    date: "June 15, 2024",
    readTime: "8 min read",
    category: "Travel Guide",
    slug: "top-10-destinations-pakistan-summer",
  },
  {
    title: "Complete Guide to Planning Your First Umrah Journey",
    excerpt:
      "Everything you need to know before embarking on your spiritual journey to the holy cities of Makkah and Madinah.",
    image: "/images/umrah-packages.jpg",
    date: "June 10, 2024",
    readTime: "12 min read",
    category: "Umrah Guide",
    slug: "complete-guide-first-umrah",
  },
  {
    title: "How to Get Visa for UAE, Turkey & Schengen Countries",
    excerpt:
      "Step-by-step visa application guide for the most popular destinations. Tips, requirements, and processing times.",
    image: "/images/visa-services.jpg",
    date: "June 5, 2024",
    readTime: "10 min read",
    category: "Visa Tips",
    slug: "visa-guide-uae-turkey-schengen",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function BlogPreview() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600 uppercase tracking-wide">
                Travel Blog
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
              Travel Tips & Guides
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl">
              Expert advice and inspiration for your next adventure
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={item}>
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
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">
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
        </motion.div>
      </div>
    </section>
  )
}
