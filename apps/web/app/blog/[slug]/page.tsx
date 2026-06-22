"use client"

import { useParams } from "next/navigation"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import FloatingButtons from "../../components/FloatingButtons"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  ArrowLeft,
  User,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const blogData: Record<string, {
  title: string
  excerpt: string
  content: string[]
  image: string
  date: string
  readTime: string
  category: string
  author: string
}> = {
  "top-10-destinations-pakistan-summer": {
    title: "Top 10 Destinations to Visit in Pakistan This Summer",
    excerpt: "Discover the most breathtaking locations across Pakistan for your summer vacation.",
    image: "/images/blog-travel-guide.jpg",
    date: "June 15, 2024",
    readTime: "8 min read",
    category: "Travel Guide",
    author: "Ahmad Khan",
    content: [
      "Pakistan is blessed with some of the most stunning landscapes in the world. From the towering peaks of the north to the pristine beaches of the south, there is something for every traveler.",
      "1. Hunza Valley - Known as heaven on earth, Hunza offers breathtaking views of Rakaposhi and Passu Cones. The valley is famous for its cherry blossoms in spring and vibrant colors in summer.",
      "2. Skardu - Home to Shangrila Resort and Deosai Plains, Skardu is a must-visit for nature lovers. The crystal clear waters of Satpara Lake will leave you mesmerized.",
      "3. Naran Kaghan - Perfect for summer camping, this region offers stunning lakes, meadows, and the famous Babusar Top.",
      "4. Murree - A classic hill station with beautiful walks, cable car rides, and stunning viewpoints.",
      "5. Neelum Valley - Often called the 'Paradise of Kashmir', featuring the beautiful Ratti Gali Lake.",
      "6. Swat Valley - Known as the Switzerland of Pakistan, with lush green meadows and clear rivers.",
      "7. Fairy Meadows - Offering the most spectacular views of Nanga Parbat, the world's ninth highest peak.",
      "8. Kalash Valley - Home to the unique Kalash people with their distinct culture and festivals.",
      "9. Gwadar - Experience the emerging port city with pristine beaches and unique rock formations.",
      "10. Lahore - The cultural heart of Pakistan, featuring historical sites, delicious food, and vibrant markets.",
    ],
  },
  "complete-guide-first-umrah": {
    title: "Complete Guide to Planning Your First Umrah Journey",
    excerpt: "Everything you need to know before embarking on your spiritual journey.",
    image: "/images/umrah-packages.jpg",
    date: "June 10, 2024",
    readTime: "12 min read",
    category: "Umrah Guide",
    author: "Fatima Ali",
    content: [
      "Performing Umrah is a deeply spiritual experience that every Muslim dreams of. This comprehensive guide will help you prepare for this blessed journey.",
      "Preparation Before Departure: Ensure your passport is valid for at least 6 months. Apply for your Umrah visa well in advance. Get vaccinated as required by Saudi authorities.",
      "What to Pack: Ihram (two white unstitched cloths for men), comfortable walking shoes, unscented soap and shampoo, a small prayer mat, and essential medications.",
      "Understanding the Rituals: Umrah consists of four main rituals - Ihram, Tawaf (circumambulation of Kaaba), Sa'i (walking between Safa and Marwa), and Halq/Taqsir (shaving or cutting hair).",
      "Tips for a Comfortable Journey: Stay hydrated, wear comfortable footwear, and pace yourself during Tawaf. The experience is spiritually rewarding but can be physically demanding.",
    ],
  },
  "visa-guide-uae-turkey-schengen": {
    title: "How to Get Visa for UAE, Turkey & Schengen Countries",
    excerpt: "Step-by-step visa application guide for popular destinations.",
    image: "/images/visa-services.jpg",
    date: "June 5, 2024",
    readTime: "10 min read",
    category: "Visa Tips",
    author: "Muhammad Rizwan",
    content: [
      "Applying for a visa can be overwhelming, but with the right guidance, it becomes a straightforward process. Here's everything you need to know.",
      "UAE Visa: Pakistani citizens can apply for a tourist visa through airlines, hotels, or travel agencies. Required documents include passport (valid 6 months), photos, bank statement, and CNIC.",
      "Turkey Visa: Apply through the Turkish e-Visa system. You'll need a valid passport, return ticket, hotel booking, and sufficient funds. Processing takes 7-10 working days.",
      "Schengen Visa: Apply at the embassy of your main destination country. Requirements include travel insurance, proof of accommodation, flight reservations, bank statements, and employment proof.",
      "Pro Tips: Apply at least one month before your travel date. Ensure all documents are complete and accurate. A cover letter explaining your travel purpose helps strengthen your application.",
    ],
  },
}

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const post = blogData[slug] || {
    title: "Travel Guide",
    excerpt: "Travel tips and guides for your next adventure.",
    image: "/images/blog-travel-guide.jpg",
    date: "June 2024",
    readTime: "5 min read",
    category: "Travel Guide",
    author: "Madni Travel Team",
    content: [
      "Traveling opens your mind to new cultures, experiences, and perspectives. At Madni Travel, we believe everyone deserves to explore the world.",
      "Planning Your Trip: Start by choosing your destination based on your interests and budget. Research the best time to visit, local customs, and must-see attractions.",
      "Booking Tips: Book flights and hotels in advance for the best rates. Consider package deals that include transfers and guided tours.",
      "Travel Essentials: Always carry copies of important documents, stay connected with a local SIM, and keep emergency contacts handy.",
      "With Madni Travel, your dream vacation is just a booking away. Contact us today to plan your next adventure!",
    ],
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Image */}
        <section className="relative h-[50vh] min-h-[400px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
              <Link href="/blog" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              <Badge className="mb-3 bg-emerald-600">{post.category}</Badge>
              <h1 className="text-2xl sm:text-4xl font-bold text-white font-display">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-white/70">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>
              <Separator className="my-8" />
              <div className="prose prose-slate max-w-none">
                {post.content.map((paragraph, i) => (
                  <p key={i} className="text-slate-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t">
                <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share this article
                </p>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
