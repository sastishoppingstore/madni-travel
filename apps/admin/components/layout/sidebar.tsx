"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Bot,
  ShoppingCart,
  CalendarRange,
  Users,
  UserCog,
  Banknote,
  HandCoins,
  Truck,
  Receipt,
  BookOpen,
  RotateCcw,
  BarChart3,
  Settings,
  Globe,
  Monitor,
  Image,
  Package,
  Star,
  FileText,
  Ticket,
  Building2,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plane,
  Hotel,
  Bus,
  CreditCard,
  MessageCircle,
  Mail,
  Sparkles,
  Wifi,
  Menu,
  X,
  TicketCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "AI Assistant", href: "/admin/ai-assistant", icon: Bot },
  { label: "POS Sale", href: "/admin/pos", icon: ShoppingCart },
  {
    label: "Bookings",
    href: "#",
    icon: CalendarRange,
    submenu: [
      { label: "Flight Bookings", href: "/admin/bookings/flights", icon: Plane },
      { label: "Package Bookings", href: "/admin/bookings/packages", icon: Package },
      { label: "Umrah Bookings", href: "/admin/bookings/umrah", icon: Star },
      { label: "Visa Bookings", href: "/admin/bookings/visa", icon: FileText },
      { label: "Hotel Bookings", href: "/admin/bookings/hotels", icon: Hotel },
      { label: "Bus Bookings", href: "/admin/bookings/buses", icon: Bus },
    ],
  },
  { label: "Manual Ticket Entry", href: "/admin/manual-ticket", icon: TicketCheck },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Staff / Workers", href: "/admin/staff", icon: UserCog },
  { label: "Salaries", href: "/admin/salaries", icon: Banknote },
  { label: "Commissions", href: "/admin/commissions", icon: HandCoins },
  { label: "Suppliers", href: "/admin/suppliers", icon: Truck },
  { label: "Expenses", href: "/admin/expenses", icon: Receipt },
  { label: "Cash Ledger", href: "/admin/cash-ledger", icon: BookOpen },
  { label: "Refunds", href: "/admin/refunds", icon: RotateCcw },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  {
    label: "Settings",
    href: "#",
    icon: Settings,
    submenu: [
      { label: "Payment Gateways", href: "/admin/settings/payments", icon: CreditCard },
      { label: "WhatsApp API", href: "/admin/settings/whatsapp", icon: MessageCircle },
      { label: "SMTP Email", href: "/admin/settings/smtp", icon: Mail },
      { label: "Gemini AI", href: "/admin/settings/gemini", icon: Sparkles },
      { label: "Flight API", href: "/admin/settings/flight-api", icon: Wifi },
    ],
  },
  { label: "SEO Manager", href: "/admin/seo", icon: Globe },
  { label: "Website Builder", href: "/admin/website", icon: Monitor },
  { label: "Media Manager", href: "/admin/media", icon: Image },
  { label: "Package Manager", href: "/admin/packages", icon: Package },
  { label: "Umrah Manager", href: "/admin/umrah", icon: Star },
  { label: "Visa Manager", href: "/admin/visa", icon: FileText },
  { label: "Blog Manager", href: "/admin/blog", icon: FileText },
  { label: "Coupons", href: "/admin/coupons", icon: Ticket },
  { label: "Company Settings", href: "/admin/company", icon: Building2 },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: ClipboardList },
];

export function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(["Bookings"]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isSubmenuActive = (submenu?: NavItem[]) =>
    submenu?.some((s) => pathname === s.href);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden bg-secondary-800 text-white p-2 rounded-md"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out flex flex-col overflow-hidden",
          collapsed ? "w-[72px]" : "w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
              <Plane className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-hidden"
              >
                <h1 className="text-lg font-bold text-white whitespace-nowrap">
                  Madni Travel
                </h1>
                <p className="text-[10px] text-white/50 -mt-1">Admin Panel</p>
              </motion.div>
            )}
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1 rounded hover:bg-white/10 text-white/70"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 rounded hover:bg-white/10 text-white/70"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 min-h-0 overflow-y-auto sidebar-scroll py-3 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isOpen = openMenus.includes(item.label);
            const submenuActive = isSubmenuActive(item.submenu);

            if (hasSubmenu) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => !collapsed && toggleMenu(item.label)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                      submenuActive || isOpen
                        ? "bg-primary-600/20 text-primary-400"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className="h-[18px] w-[18px] flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform",
                            isOpen && "rotate-180"
                          )}
                        />
                      </>
                    )}
                  </button>
                  <AnimatePresence>
                    {isOpen && !collapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-7 mt-1 space-y-1 border-l border-white/10 pl-3">
                          {item.submenu?.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className={cn(
                                  "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
                                  isActive(sub.href)
                                    ? "bg-primary-600 text-white"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                                )}
                              >
                                <SubIcon className="h-3.5 w-3.5" />
                                <span>{sub.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  isActive(item.href)
                    ? "bg-primary-600 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-[18px] w-[18px] flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="shrink-0 p-4 border-t border-white/10">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-white/50 mb-1">Logged in as</p>
              <p className="text-sm text-white font-medium">Super Admin</p>
              <p className="text-xs text-primary-400">admin@madnitravel.com</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
