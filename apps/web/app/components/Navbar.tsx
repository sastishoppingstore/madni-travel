"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  Plane,
  Palmtree,
  Globe,
  FileText,
  Hotel,
  Bus,
  BookOpen,
  Info,
  User,
  UserPlus,
  LogOut,
  ChevronDown,
  Phone,
  LayoutDashboard,
} from "lucide-react"
import { cn } from "@/app/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"

const navLinks = [
  { href: "/flights", label: "Flights", icon: Plane },
  { href: "/holidays", label: "Holidays", icon: Palmtree },
  { href: "/umrah", label: "Umrah", icon: Globe },
  { href: "/visa", label: "Visa", icon: FileText },
  { href: "/hotels", label: "Hotels", icon: Hotel },
  { href: "/buses", label: "Buses", icon: Bus },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/about", label: "About", icon: Info },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => pathname === href

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-3"
      )}
      style={
        !isScrolled ? { top: "32px" } : undefined
      }
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
              <Plane className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-xl font-bold font-display leading-tight transition-colors",
                isScrolled ? "text-emerald-700" : "text-white"
              )}>
                Madni
              </span>
              <span className={cn(
                "text-[10px] -mt-1 font-medium tracking-widest uppercase transition-colors",
                isScrolled ? "text-gold-500" : "text-gold-300"
              )}>
                Travel
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  isActive(link.href)
                    ? isScrolled
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-white/20 text-white"
                    : isScrolled
                    ? "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/contact">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  isScrolled ? "text-slate-600 hover:text-emerald-700" : "text-white hover:bg-white/10"
                )}
              >
                <Phone className="w-4 h-4 mr-1" />
                Contact
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  isScrolled ? "text-slate-600 hover:text-emerald-700" : "text-white hover:bg-white/10"
                )}
              >
                <User className="w-4 h-4 mr-1" />
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(isScrolled ? "text-slate-800" : "text-white")}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                        <Plane className="w-5 h-5 text-white transform -rotate-45" />
                      </div>
                      <div>
                        <span className="text-xl font-bold text-emerald-700">Madni</span>
                        <span className="block text-[10px] text-gold-500 tracking-widest uppercase -mt-1">
                          Travel
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="flex-1 overflow-auto py-4">
                    <div className="px-4 space-y-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            isActive(link.href)
                              ? "bg-emerald-50 text-emerald-700"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          )}
                        >
                          <link.icon className="w-5 h-5" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 px-6 border-t pt-6">
                      <div className="grid grid-cols-2 gap-2">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">
                            <User className="w-4 h-4 mr-1" />
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsOpen(false)}>
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                            <UserPlus className="w-4 h-4 mr-1" />
                            Register
                          </Button>
                        </Link>
                      </div>
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full mt-2">
                          <LayoutDashboard className="w-4 h-4 mr-1" />
                          Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
