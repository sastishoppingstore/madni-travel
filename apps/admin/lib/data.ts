// Mock data for demo/fallback when API is unavailable

export const mockDashboardStats = {
  todaySales: 245000,
  todayProfit: 52000,
  pendingTickets: 18,
  confirmedTickets: 42,
  cancelledBookings: 3,
  monthlyRevenue: 1850000,
  monthlyProfit: 420000,
  totalCustomers: 1250,
  totalBookings: 856,
  customerDues: 320000,
  supplierDues: 185000,
};

export const mockMonthlyRevenue = [
  { month: "Jan", revenue: 1200000, profit: 280000 },
  { month: "Feb", revenue: 1450000, profit: 320000 },
  { month: "Mar", revenue: 1100000, profit: 240000 },
  { month: "Apr", revenue: 1600000, profit: 380000 },
  { month: "May", revenue: 1850000, profit: 420000 },
  { month: "Jun", revenue: 2100000, profit: 480000 },
  { month: "Jul", revenue: 1950000, profit: 440000 },
  { month: "Aug", revenue: 1700000, profit: 390000 },
  { month: "Sep", revenue: 1500000, profit: 350000 },
  { month: "Oct", revenue: 1800000, profit: 410000 },
  { month: "Nov", revenue: 2200000, profit: 520000 },
  { month: "Dec", revenue: 2450000, profit: 580000 },
];

export const mockTopPackages = [
  { name: "Dubai 5 Nights", bookings: 85, revenue: 8500000 },
  { name: "Umrah 15 Days", bookings: 72, revenue: 10800000 },
  { name: "Turkey 7 Nights", bookings: 64, revenue: 9600000 },
  { name: "Malaysia 4 Nights", bookings: 48, revenue: 4800000 },
  { name: "Thailand 5 Nights", bookings: 42, revenue: 4200000 },
];

export const mockTopStaff = [
  { name: "Ahmed Khan", sales: 125, revenue: 12500000, commission: 125000 },
  { name: "Fatima Ali", sales: 98, revenue: 9800000, commission: 98000 },
  { name: "Zain Malik", sales: 87, revenue: 8700000, commission: 87000 },
  { name: "Ayesha Siddiqui", sales: 76, revenue: 7600000, commission: 76000 },
  { name: "Omar Farooq", sales: 65, revenue: 6500000, commission: 65000 },
];

export const mockPaymentMethods = [
  { name: "JazzCash", value: 35, amount: 647500 },
  { name: "EasyPaisa", value: 25, amount: 462500 },
  { name: "Bank Transfer", value: 20, amount: 370000 },
  { name: "Cash", value: 12, amount: 222000 },
  { name: "Credit Card", value: 8, amount: 148000 },
];

export const mockRecentBookings = [
  { id: "1", bookingNo: "MT-20240622-A1B2C3", customerName: "Muhammad Ali", type: "FLIGHT", status: "CONFIRMED", totalAmount: 45000, paidAmount: 45000, dueAmount: 0, createdAt: "2024-06-22T10:30:00Z" },
  { id: "2", bookingNo: "MT-20240622-D4E5F6", customerName: "Sara Ahmed", type: "UMRAH", status: "PAID_PENDING_CONFIRMATION", totalAmount: 185000, paidAmount: 100000, dueAmount: 85000, createdAt: "2024-06-22T09:15:00Z" },
  { id: "3", bookingNo: "MT-20240621-G7H8I9", customerName: "Hassan Raza", type: "PACKAGE", status: "CONFIRMED", totalAmount: 125000, paidAmount: 125000, dueAmount: 0, createdAt: "2024-06-21T16:45:00Z" },
  { id: "4", bookingNo: "MT-20240621-J1K2L3", customerName: "Ayesha Khan", type: "VISA", status: "PENDING_PAYMENT", totalAmount: 15000, paidAmount: 5000, dueAmount: 10000, createdAt: "2024-06-21T14:20:00Z" },
  { id: "5", bookingNo: "MT-20240620-M4N5O6", customerName: "Usman Tariq", type: "HOTEL", status: "CONFIRMED", totalAmount: 32000, paidAmount: 32000, dueAmount: 0, createdAt: "2024-06-20T11:00:00Z" },
  { id: "6", bookingNo: "MT-20240620-P7Q8R9", customerName: "Nadia Hussain", type: "FLIGHT", status: "TICKET_ISSUED", totalAmount: 78000, paidAmount: 78000, dueAmount: 0, createdAt: "2024-06-20T08:30:00Z" },
  { id: "7", bookingNo: "MT-20240619-S1T2U3", customerName: "Bilal Khan", type: "BUS", status: "CONFIRMED", totalAmount: 8000, paidAmount: 8000, dueAmount: 0, createdAt: "2024-06-19T15:10:00Z" },
  { id: "8", bookingNo: "MT-20240619-V4W5X6", customerName: "Zara Sheikh", type: "PACKAGE", status: "PAID_PENDING_CONFIRMATION", totalAmount: 210000, paidAmount: 150000, dueAmount: 60000, createdAt: "2024-06-19T12:00:00Z" },
  { id: "9", bookingNo: "MT-20240618-Y7Z8A9", customerName: "Imran Farooq", type: "FLIGHT", status: "CANCELLED", totalAmount: 55000, paidAmount: 0, dueAmount: 0, createdAt: "2024-06-18T09:45:00Z" },
  { id: "10", bookingNo: "MT-20240618-B1C2D3", customerName: "Mariam Ansari", type: "UMRAH", status: "CONFIRMED", totalAmount: 195000, paidAmount: 195000, dueAmount: 0, createdAt: "2024-06-18T07:20:00Z" },
];

export const mockStaff = [
  { id: "1", name: "Ahmed Khan", email: "ahmed@madnitravel.com", phone: "+92-300-1234567", role: "MANAGER", department: "Sales", salary: 80000, commissionRate: 1.0, joinDate: "2023-01-15", status: "ACTIVE" },
  { id: "2", name: "Fatima Ali", email: "fatima@madnitravel.com", phone: "+92-300-7654321", role: "AGENT", department: "Sales", salary: 45000, commissionRate: 0.8, joinDate: "2023-03-20", status: "ACTIVE" },
  { id: "3", name: "Zain Malik", email: "zain@madnitravel.com", phone: "+92-301-2345678", role: "AGENT", department: "Sales", salary: 45000, commissionRate: 0.8, joinDate: "2023-05-10", status: "ACTIVE" },
  { id: "4", name: "Ayesha Siddiqui", email: "ayesha@madnitravel.com", phone: "+92-302-3456789", role: "SUPERVISOR", department: "Operations", salary: 65000, commissionRate: 0.5, joinDate: "2023-02-01", status: "ACTIVE" },
  { id: "5", name: "Omar Farooq", email: "omar@madnitravel.com", phone: "+92-303-4567890", role: "CASHIER", department: "Finance", salary: 50000, commissionRate: 0.3, joinDate: "2023-06-15", status: "ACTIVE" },
  { id: "6", name: "Hassan Raza", email: "hassan@madnitravel.com", phone: "+92-304-5678901", role: "AGENT", department: "Sales", salary: 45000, commissionRate: 0.8, joinDate: "2023-08-01", status: "ON_LEAVE" },
  { id: "7", name: "Sara Ahmed", email: "sara@madnitravel.com", phone: "+92-305-6789012", role: "SUPPORT", department: "Support", salary: 40000, commissionRate: 0.2, joinDate: "2023-09-10", status: "ACTIVE" },
];

export const mockCustomers = [
  { id: "1", name: "Muhammad Ali", email: "m.ali@email.com", phone: "+92-300-1111111", status: "ACTIVE", totalBookings: 12, totalSpent: 450000, createdAt: "2023-01-10" },
  { id: "2", name: "Sara Ahmed", email: "sara@email.com", phone: "+92-300-2222222", status: "ACTIVE", totalBookings: 8, totalSpent: 320000, createdAt: "2023-02-15" },
  { id: "3", name: "Hassan Raza", email: "hassan@email.com", phone: "+92-300-3333333", status: "ACTIVE", totalBookings: 5, totalSpent: 185000, createdAt: "2023-04-20" },
  { id: "4", name: "Ayesha Khan", email: "ayesha@email.com", phone: "+92-300-4444444", status: "ACTIVE", totalBookings: 3, totalSpent: 95000, createdAt: "2023-06-05" },
  { id: "5", name: "Usman Tariq", email: "usman@email.com", phone: "+92-300-5555555", status: "INACTIVE", totalBookings: 1, totalSpent: 22000, createdAt: "2023-08-12" },
  { id: "6", name: "Nadia Hussain", email: "nadia@email.com", phone: "+92-300-6666666", status: "ACTIVE", totalBookings: 6, totalSpent: 275000, createdAt: "2023-03-18" },
  { id: "7", name: "Bilal Khan", email: "bilal@email.com", phone: "+92-300-7777777", status: "ACTIVE", totalBookings: 4, totalSpent: 140000, createdAt: "2023-05-22" },
  { id: "8", name: "Zara Sheikh", email: "zara@email.com", phone: "+92-300-8888888", status: "ACTIVE", totalBookings: 7, totalSpent: 380000, createdAt: "2023-07-01" },
];

export const mockSuppliers = [
  { id: "1", name: "PIA Pakistan Intl Airlines", type: "Airline", contactPerson: "Kamran Akhtar", email: "sales@piac.aero", phone: "+92-21-111-786-786", address: "PIA Head Office, Karachi", balance: 125000, isActive: true },
  { id: "2", name: "Emirates Airlines", type: "Airline", contactPerson: "Sarah Johnson", email: "pk.sales@emirates.com", phone: "+92-21-3530-5555", address: "Emirates Tower, Karachi", balance: 250000, isActive: true },
  { id: "3", name: "Saudi Airlines", type: "Airline", contactPerson: "Ahmed Al-Rashid", email: "sales@saudia.com", phone: "+966-12-684-0000", address: "Jeddah, Saudi Arabia", balance: 180000, isActive: true },
  { id: "4", name: "Hilton Hotels", type: "Hotel", contactPerson: "Robert Chen", email: "groups@hilton.com", phone: "+92-42-111-445-666", address: "Hilton Lahore", balance: 85000, isActive: true },
  { id: "5", name: "Marriott Hotels", type: "Hotel", contactPerson: "Jennifer Lee", email: "sales@marriott.com", phone: "+92-51-282-1234", address: "Marriott Islamabad", balance: 120000, isActive: true },
  { id: "6", name: "VFS Global Pakistan", type: "Visa", contactPerson: "Ali Hassan", email: "info@vfsglobal.com", phone: "+92-42-3576-1234", address: "Lahore, Pakistan", balance: 45000, isActive: true },
];

export const mockExpenses = [
  { id: "1", category: "Rent", description: "Office Rent - June 2024", amount: 150000, date: "2024-06-01", paymentMethod: "BANK_TRANSFER" },
  { id: "2", category: "Utilities", description: "Electricity Bill", amount: 35000, date: "2024-06-05", paymentMethod: "BANK_TRANSFER" },
  { id: "3", category: "Salaries", description: "Staff Salaries", amount: 420000, date: "2024-06-01", paymentMethod: "BANK_TRANSFER" },
  { id: "4", category: "Marketing", description: "Facebook Ads", amount: 25000, date: "2024-06-10", paymentMethod: "CREDIT_CARD" },
  { id: "5", category: "Office Supplies", description: "Stationery & Printing", amount: 8500, date: "2024-06-12", paymentMethod: "CASH" },
  { id: "6", category: "Maintenance", description: "AC Servicing", amount: 12000, date: "2024-06-15", paymentMethod: "CASH" },
  { id: "7", category: "Internet", description: "Internet & Phone Bills", amount: 15000, date: "2024-06-01", paymentMethod: "BANK_TRANSFER" },
  { id: "8", category: "Software", description: "CRM & Booking System", amount: 18000, date: "2024-06-01", paymentMethod: "CREDIT_CARD" },
];

export const mockCashLedger = [
  { id: "1", date: "2024-06-22", type: "INCOME", category: "Flight Booking", description: "INV-20240622-A1B2 - Muhammad Ali", amount: 45000, balance: 245000 },
  { id: "2", date: "2024-06-22", type: "INCOME", category: "Umrah Package", description: "INV-20240622-B3C4 - Sara Ahmed", amount: 185000, balance: 200000 },
  { id: "3", date: "2024-06-21", type: "INCOME", category: "Holiday Package", description: "INV-20240621-D5E6 - Hassan Raza", amount: 125000, balance: 15000 },
  { id: "4", date: "2024-06-21", type: "EXPENSE", category: "Supplier Payment", description: "Payment to PIA", amount: 75000, balance: -110000 },
  { id: "5", date: "2024-06-20", type: "INCOME", category: "Hotel Booking", description: "INV-20240620-F7G8 - Usman Tariq", amount: 32000, balance: -35000 },
  { id: "6", date: "2024-06-20", type: "EXPENSE", category: "Office Rent", description: "June 2024 Rent", amount: 150000, balance: -67000 },
  { id: "7", date: "2024-06-19", type: "INCOME", category: "Bus Booking", description: "INV-20240619-H9I0 - Bilal Khan", amount: 8000, balance: 83000 },
  { id: "8", date: "2024-06-19", type: "EXPENSE", category: "Utilities", description: "Electricity Bill", amount: 35000, balance: 75000 },
];

export const mockRefunds = [
  { id: "1", bookingId: "9", amount: 55000, reason: "Flight cancelled by airline", status: "PROCESSED", processedAt: "2024-06-19T10:00:00Z", createdAt: "2024-06-18T09:45:00Z" },
  { id: "2", bookingId: null, amount: 15000, reason: "Customer request - change of plans", status: "PENDING", processedAt: null, createdAt: "2024-06-21T14:30:00Z" },
  { id: "3", bookingId: null, amount: 8500, reason: "Overpayment correction", status: "APPROVED", processedAt: null, createdAt: "2024-06-20T11:15:00Z" },
];

export const mockSEOPages = [
  { id: "1", pagePath: "/", pageName: "Homepage", seoTitle: "Madni Travel - Best Travel Agency in Pakistan", metaDescription: "Book flights, hotels, Umrah packages & visa services at best prices. Trusted travel partner since 2010.", focusKeyword: "travel agency pakistan", canonicalUrl: "https://madnitravel.com/", ogTitle: "Madni Travel - Your Trusted Travel Partner", ogDescription: "Best travel deals on flights, hotels, and packages", ogImage: "https://example.com/og-home.jpg", twitterTitle: "Madni Travel", twitterDescription: "Best travel agency in Pakistan", twitterImage: "https://example.com/og-home.jpg", robotsIndex: true, sitemapInclude: true, schemaType: "TravelAgency", seoScore: 85 },
  { id: "2", pagePath: "/flights", pageName: "Flights", seoTitle: "Book Cheap Flights - Domestic & International | Madni Travel", metaDescription: "Compare and book cheap flights to domestic and international destinations. Best airfare deals guaranteed.", focusKeyword: "cheap flights pakistan", canonicalUrl: "https://madnitravel.com/flights", ogTitle: "Book Cheap Flights", ogDescription: "Lowest airfares on domestic & international flights", ogImage: "https://example.com/og-flights.jpg", twitterTitle: "Cheap Flights", twitterDescription: "Best flight deals", twitterImage: "https://example.com/og-flights.jpg", robotsIndex: true, sitemapInclude: true, schemaType: "Product", seoScore: 72 },
  { id: "3", pagePath: "/umrah", pageName: "Umrah Packages", seoTitle: "Umrah Packages 2024 - Affordable & Luxury Options | Madni Travel", metaDescription: "Book affordable Umrah packages from Pakistan. Economy to 5-star packages available. Visa included.", focusKeyword: "umrah packages 2024", canonicalUrl: "https://madnitravel.com/umrah", ogTitle: "Umrah Packages 2024", ogDescription: "Affordable Umrah packages from Pakistan", ogImage: "https://example.com/og-umrah.jpg", twitterTitle: "Umrah Packages", twitterDescription: "Book your Umrah today", twitterImage: "https://example.com/og-umrah.jpg", robotsIndex: true, sitemapInclude: true, schemaType: "Product", seoScore: 90 },
  { id: "4", pagePath: "/packages", pageName: "Holiday Packages", seoTitle: "Holiday Packages - Dubai, Turkey, Malaysia | Madni Travel", metaDescription: "Explore international holiday packages at best prices. Dubai, Turkey, Thailand, Malaysia & more.", focusKeyword: "holiday packages pakistan", canonicalUrl: "https://madnitravel.com/packages", ogTitle: "Holiday Packages", ogDescription: "Best holiday deals", ogImage: "https://example.com/og-packages.jpg", twitterTitle: "Holiday Packages", twitterDescription: "Amazing travel deals", twitterImage: "https://example.com/og-packages.jpg", robotsIndex: true, sitemapInclude: true, schemaType: "Product", seoScore: 68 },
  { id: "5", pagePath: "/visa", pageName: "Visa Services", seoTitle: "Visa Services - Tourist, Business, Student | Madni Travel", metaDescription: "Fast visa processing for all countries. Tourist visa, business visa, student visa services.", focusKeyword: "visa services pakistan", canonicalUrl: "https://madnitravel.com/visa", ogTitle: "Visa Services", ogDescription: "Fast visa processing", ogImage: "https://example.com/og-visa.jpg", twitterTitle: "Visa Services", twitterDescription: "Get your visa fast", twitterImage: "https://example.com/og-visa.jpg", robotsIndex: true, sitemapInclude: true, schemaType: "Service", seoScore: 78 },
  { id: "6", pagePath: "/contact", pageName: "Contact Us", seoTitle: "Contact Madni Travel - 24/7 Support", metaDescription: "Get in touch with Madni Travel for bookings and support. 24/7 customer service available.", focusKeyword: "contact madni travel", canonicalUrl: "https://madnitravel.com/contact", ogTitle: "Contact Us", ogDescription: "24/7 travel support", ogImage: "", twitterTitle: "", twitterDescription: "", twitterImage: "", robotsIndex: true, sitemapInclude: true, schemaType: "Organization", seoScore: 55 },
  { id: "7", pagePath: "/about", pageName: "About Us", seoTitle: "About Madni Travel - Leading Travel Agency Since 2010", metaDescription: "Learn about Madni Travel, Pakistan's leading travel agency. Our story, mission, and team.", focusKeyword: "about madni travel", canonicalUrl: "https://madnitravel.com/about", ogTitle: "About Madni Travel", ogDescription: "Pakistan's leading travel agency", ogImage: "", twitterTitle: "", twitterDescription: "", twitterImage: "", robotsIndex: true, sitemapInclude: true, schemaType: "Organization", seoScore: 62 },
];

export const mockRedirects = [
  { id: "1", fromPath: "/old-packages", toPath: "/packages", type: "301", isActive: true },
  { id: "2", fromPath: "/umrah-2023", toPath: "/umrah", type: "301", isActive: true },
  { id: "3", fromPath: "/flight-booking", toPath: "/flights", type: "301", isActive: true },
  { id: "4", fromPath: "/contact-us-old", toPath: "/contact", type: "302", isActive: false },
];

export const mockHomepageSections = [
  { id: "1", key: "hero", title: "Discover the World with Madni Travel", subtitle: "Your Journey Begins Here", description: "Book flights, hotels, Umrah packages and visa services at the best prices in Pakistan.", coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?auto=format&fit=crop&w=1920", buttonText: "Book Now", buttonLink: "/flights", bgColor: "#000000", textColor: "#FFFFFF", sortOrder: 1, isVisible: true, is3D: false },
  { id: "2", key: "umrah-cta", title: "Umrah Packages 2024", subtitle: "Special Ramadan Offers", description: "Economy & luxury Umrah packages starting from Rs. 85,000. Visa, flights & hotel included.", coverImage: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1920", buttonText: "View Packages", buttonLink: "/umrah", bgColor: "#059669", textColor: "#FFFFFF", sortOrder: 2, isVisible: true, is3D: false },
  { id: "3", key: "popular-destinations", title: "Popular Destinations", subtitle: "Explore the World", description: "Dubai, Turkey, Thailand, Malaysia and more exciting destinations.", coverImage: "", buttonText: "Explore", buttonLink: "/packages", bgColor: "#F8FAFC", textColor: "#0F172A", sortOrder: 3, isVisible: true, is3D: true },
  { id: "4", key: "why-choose-us", title: "Why Choose Madni Travel", subtitle: "Trusted by 10,000+ Customers", description: "Best prices, 24/7 support, trusted partners, easy booking process.", coverImage: "", buttonText: "Learn More", buttonLink: "/about", bgColor: "#0F172A", textColor: "#FFFFFF", sortOrder: 4, isVisible: true, is3D: false },
  { id: "5", key: "testimonials", title: "What Our Customers Say", subtitle: "Real Reviews from Real Travelers", description: "Read testimonials from our satisfied customers.", coverImage: "", buttonText: "Read Reviews", buttonLink: "/reviews", bgColor: "#F8FAFC", textColor: "#0F172A", sortOrder: 5, isVisible: true, is3D: false },
  { id: "6", key: "newsletter", title: "Subscribe to Our Newsletter", subtitle: "Get Exclusive Deals", description: "Subscribe to receive the latest travel deals and offers directly in your inbox.", coverImage: "", buttonText: "Subscribe", buttonLink: "#newsletter", bgColor: "#059669", textColor: "#FFFFFF", sortOrder: 6, isVisible: true, is3D: false },
];

export const mockBlogPosts = [
  { id: "1", title: "Top 10 Places to Visit in Dubai 2024", slug: "top-10-places-dubai-2024", excerpt: "Discover the best attractions in Dubai this year.", author: "Ahmed Khan", category: "Travel Guide", isPublished: true, publishedAt: "2024-06-15", views: 1250 },
  { id: "2", title: "Complete Umrah Guide for First-Time Pilgrims", slug: "complete-umrah-guide-first-time", excerpt: "Everything you need to know for your first Umrah.", author: "Fatima Ali", category: "Umrah Guide", isPublished: true, publishedAt: "2024-06-10", views: 3400 },
  { id: "3", title: "How to Get Turkey Visa from Pakistan", slug: "turkey-visa-pakistan-guide", excerpt: "Step-by-step guide to apply for Turkey visa.", author: "Zain Malik", category: "Visa Guide", isPublished: true, publishedAt: "2024-06-05", views: 2100 },
  { id: "4", title: "Budget Travel Tips for Southeast Asia", slug: "budget-travel-southeast-asia", excerpt: "Save money while exploring Southeast Asia.", author: "Ayesha Siddiqui", category: "Travel Tips", isPublished: false, publishedAt: null, views: 0 },
  { id: "5", title: "Best Time to Visit Maldives", slug: "best-time-visit-maldives", excerpt: "Find out the perfect season for your Maldives trip.", author: "Ahmed Khan", category: "Travel Guide", isPublished: true, publishedAt: "2024-05-28", views: 980 },
];

export const mockCoupons = [
  { id: "1", code: "SUMMER2024", description: "Summer Sale - 20% off on all packages", discountType: "PERCENTAGE", discountValue: 20, minAmount: 50000, maxDiscount: 20000, usageLimit: 100, usageCount: 45, validFrom: "2024-06-01", validUntil: "2024-08-31", isActive: true },
  { id: "2", code: "WELCOME5000", description: "Welcome discount for new customers", discountType: "FIXED", discountValue: 5000, minAmount: 25000, maxDiscount: 5000, usageLimit: null, usageCount: 128, validFrom: "2024-01-01", validUntil: "2024-12-31", isActive: true },
  { id: "3", code: "UMRAH15", description: "15% off on Umrah packages", discountType: "PERCENTAGE", discountValue: 15, minAmount: 100000, maxDiscount: 30000, usageLimit: 50, usageCount: 23, validFrom: "2024-06-01", validUntil: "2024-12-31", isActive: true },
  { id: "4", code: "FLIGHT10", description: "10% off on flight bookings", discountType: "PERCENTAGE", discountValue: 10, minAmount: 30000, maxDiscount: 10000, usageLimit: 200, usageCount: 87, validFrom: "2024-05-01", validUntil: "2024-07-31", isActive: false },
];

export const mockAuditLogs = [
  { id: "1", action: "CREATE", entity: "Booking", entityId: "MT-20240622-A1B2C3", userId: "1", ipAddress: "192.168.1.100", createdAt: "2024-06-22T10:30:00Z" },
  { id: "2", action: "UPDATE", entity: "Booking", entityId: "MT-20240622-A1B2C3", userId: "1", ipAddress: "192.168.1.100", createdAt: "2024-06-22T10:35:00Z" },
  { id: "3", action: "CONFIRM", entity: "Booking", entityId: "MT-20240622-A1B2C3", userId: "2", ipAddress: "192.168.1.101", createdAt: "2024-06-22T11:00:00Z" },
  { id: "4", action: "CREATE", entity: "POS_Sale", entityId: "INV-20240622-A1B2", userId: "1", ipAddress: "192.168.1.100", createdAt: "2024-06-22T09:15:00Z" },
  { id: "5", action: "DELETE", entity: "Coupon", entityId: "4", userId: "1", ipAddress: "192.168.1.100", createdAt: "2024-06-21T16:45:00Z" },
  { id: "6", action: "UPDATE", entity: "SEOPage", entityId: "3", userId: "2", ipAddress: "192.168.1.101", createdAt: "2024-06-21T14:20:00Z" },
  { id: "7", action: "CREATE", entity: "Staff", entityId: "8", userId: "1", ipAddress: "192.168.1.100", createdAt: "2024-06-20T11:00:00Z" },
  { id: "8", action: "UPDATE", entity: "Supplier", entityId: "1", userId: "2", ipAddress: "192.168.1.102", createdAt: "2024-06-20T09:30:00Z" },
  { id: "9", action: "CREATE", entity: "Refund", entityId: "2", userId: "1", ipAddress: "192.168.1.100", createdAt: "2024-06-19T15:10:00Z" },
  { id: "10", action: "UPDATE", entity: "Setting", entityId: "gemini", userId: "1", ipAddress: "192.168.1.100", createdAt: "2024-06-19T12:00:00Z" },
];

export const mockPackages = [
  { id: "1", title: "Dubai Luxury 5 Nights", slug: "dubai-luxury-5-nights", destination: "Dubai", duration: 5, price: 150000, salePrice: 125000, coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800", isFeatured: true, isActive: true, sortOrder: 1 },
  { id: "2", title: "Turkey Discovery 7 Nights", slug: "turkey-discovery-7-nights", destination: "Turkey", duration: 7, price: 200000, salePrice: 175000, coverImage: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800", isFeatured: true, isActive: true, sortOrder: 2 },
  { id: "3", title: "Malaysia Family 4 Nights", slug: "malaysia-family-4-nights", destination: "Malaysia", duration: 4, price: 120000, salePrice: 100000, coverImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800", isFeatured: false, isActive: true, sortOrder: 3 },
  { id: "4", title: "Thailand Beach 5 Nights", slug: "thailand-beach-5-nights", destination: "Thailand", duration: 5, price: 110000, salePrice: 95000, coverImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800", isFeatured: false, isActive: true, sortOrder: 4 },
  { id: "5", title: "Maldives Honeymoon 6 Nights", slug: "maldives-honeymoon-6-nights", destination: "Maldives", duration: 6, price: 300000, salePrice: 275000, coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800", isFeatured: true, isActive: true, sortOrder: 5 },
];

export const mockUmrahPackages = [
  { id: "1", title: "Economy Umrah 15 Days", slug: "economy-umrah-15-days", duration: 15, price: 85000, salePrice: 85000, makkahHotel: "Dar Al Eiman", makkahNights: 7, madinahHotel: "Al Ansar Golden", madinahNights: 7, includesFlights: true, includesVisa: true, includesTransport: true, includesFood: false, includesGuide: true, isFeatured: false, isActive: true, sortOrder: 1, coverImage: "" },
  { id: "2", title: "Standard Umrah 15 Days", slug: "standard-umrah-15-days", duration: 15, price: 125000, salePrice: 115000, makkahHotel: "Makkah Clock Tower", makkahNights: 7, madinahHotel: "Pullman ZamZam", madinahNights: 7, includesFlights: true, includesVisa: true, includesTransport: true, includesFood: true, includesGuide: true, isFeatured: true, isActive: true, sortOrder: 2, coverImage: "" },
  { id: "3", title: "Premium Umrah 21 Days", slug: "premium-umrah-21-days", duration: 21, price: 185000, salePrice: 175000, makkahHotel: "Hilton Makkah", makkahNights: 10, madinahHotel: "Oberoi Madinah", madinahNights: 10, includesFlights: true, includesVisa: true, includesTransport: true, includesFood: true, includesGuide: true, isFeatured: true, isActive: true, sortOrder: 3, coverImage: "" },
  { id: "4", title: "Ramadan Umrah 10 Days", slug: "ramadan-umrah-10-days", duration: 10, price: 150000, salePrice: 145000, makkahHotel: "Swissotel Makkah", makkahNights: 5, madinahHotel: "Madinah Hilton", madinahNights: 4, includesFlights: true, includesVisa: true, includesTransport: true, includesFood: true, includesGuide: true, isFeatured: true, isActive: true, sortOrder: 4, coverImage: "" },
];

export const mockVisaServices = [
  { id: "1", country: "United Arab Emirates", countryCode: "AE", type: "Tourist", title: "UAE Tourist Visa", processingTime: "3-5 working days", price: 15000 },
  { id: "2", country: "Saudi Arabia", countryCode: "SA", type: "Umrah", title: "Saudi Umrah Visa", processingTime: "5-7 working days", price: 12000 },
  { id: "3", country: "Turkey", countryCode: "TR", type: "Tourist", title: "Turkey Tourist Visa", processingTime: "7-15 working days", price: 18000 },
  { id: "4", country: "United Kingdom", countryCode: "GB", type: "Tourist", title: "UK Tourist Visa", processingTime: "15-20 working days", price: 35000 },
  { id: "5", country: "United States", countryCode: "US", type: "Tourist", title: "US Tourist Visa", processingTime: "10-15 working days", price: 42000 },
  { id: "6", country: "Malaysia", countryCode: "MY", type: "Tourist", title: "Malaysia Tourist Visa", processingTime: "5-7 working days", price: 8000 },
];
