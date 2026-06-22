"use client"

import { useState } from "react"
import { X, Phone, Percent } from "lucide-react"

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-emerald-600 text-white py-2 px-4 text-center text-sm">
      <div className="flex items-center justify-center gap-2">
        <Percent className="w-4 h-4" />
        <span className="font-medium">
          Special Summer Offer! Get <strong className="text-gold-300">15% OFF</strong> on all domestic holiday packages. Book now!
        </span>
        <a
          href="tel:+923216001973"
          className="inline-flex items-center gap-1 ml-2 underline underline-offset-2 hover:text-gold-300 transition-colors"
        >
          <Phone className="w-3 h-3" />
          Call Now
        </a>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-emerald-700 rounded transition-colors"
        aria-label="Close announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
