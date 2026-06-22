"use client"

import Link from "next/link"
import {
  Plane,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  ArrowRight,
  Heart,
} from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Travel Blog" },
  { href: "/login", label: "Customer Login" },
  { href: "/register", label: "Register" },
  { href: "/dashboard", label: "Dashboard" },
]

const serviceLinks = [
  { href: "/flights", label: "Flight Booking" },
  { href: "/holidays", label: "Holiday Packages" },
  { href: "/umrah", label: "Umrah Packages" },
  { href: "/visa", label: "Visa Services" },
  { href: "/hotels", label: "Hotel Booking" },
  { href: "/buses", label: "Bus Booking" },
]

const popularDestinations = [
  { href: "/holidays", label: "Skardu" },
  { href: "/holidays", label: "Hunza Valley" },
  { href: "/holidays", label: "Murree" },
  { href: "/holidays", label: "Naran Kaghan" },
  { href: "/holidays", label: "Kashmir" },
  { href: "/umrah", label: "Umrah Package" },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Banner */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold font-display">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-slate-400 mt-1">
                Get exclusive deals and travel tips delivered to your inbox.
              </p>
            </div>
            <form
              className="flex w-full md:w-auto gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 w-full md:w-72"
              />
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Plane className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Madni</span>
                <span className="block text-[10px] text-gold-400 tracking-widest uppercase -mt-1">
                  Travel
                </span>
              </div>
            </Link>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Pakistan's most trusted travel agency since 2010. We provide premium
              travel services including flights, holidays, Umrah, visa assistance,
              hotels, and bus bookings.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://facebook.com/madnitravel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/madnitravel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/madnitravel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/madnitravel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  6 Main Mushaf Ali Road,
                  <br />
                  Sargodha, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <a
                  href="tel:+923216001973"
                  className="text-slate-400 text-sm hover:text-emerald-400 transition-colors"
                >
                  0321 6001973
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <a
                  href="mailto:info@madnitravel.com"
                  className="text-slate-400 text-sm hover:text-emerald-400 transition-colors"
                >
                  info@madnitravel.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="text-sm font-medium text-white mb-2">Working Hours</h5>
              <p className="text-slate-400 text-sm">
                Monday - Saturday: 9:00 AM - 9:00 PM
              </p>
              <p className="text-slate-400 text-sm">
                Sunday: 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Madni Travel. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in Pakistan
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
