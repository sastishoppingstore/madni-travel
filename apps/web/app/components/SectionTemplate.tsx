"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

interface SectionTemplateProps {
  image: string
  title: string
  description: string
  href: string
  buttonText: string
  buttonVariant?: "default" | "outline" | "white"
  reversed?: boolean
  children?: React.ReactNode
}

export default function SectionTemplate({
  image,
  title,
  description,
  href,
  buttonText,
  buttonVariant = "default",
  reversed = false,
  children,
}: SectionTemplateProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
            reversed ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative ${reversed ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-emerald-200" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={reversed ? "lg:order-1" : "lg:order-2"}
          >
            <div className="w-12 h-1 bg-emerald-600 rounded-full mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
              {title}
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              {description}
            </p>
            {children}
            <div className="mt-8">
              <Link href={href}>
                <Button
                  variant={buttonVariant}
                  size="lg"
                  className={
                    buttonVariant === "outline"
                      ? "border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                      : buttonVariant === "white"
                      ? "bg-white text-emerald-700 hover:bg-gray-100"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }
                >
                  {buttonText}
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
