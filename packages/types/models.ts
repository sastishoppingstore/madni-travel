export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
  count?: number
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export interface DashboardStats {
  todaySales: number
  todayProfit: number
  pendingTickets: number
  confirmedTickets: number
  cancelledBookings: number
  monthlyRevenue: number
  monthlyProfit: number
  totalCustomers: number
  totalBookings: number
}

export interface SEOMetadata {
  title: string
  description: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonicalUrl?: string
  robots?: string
  schemaType?: string
}

export interface WhatsAppMessage {
  to: string
  template?: string
  body?: string
  variables?: Record<string, string>
}

export interface EmailData {
  to: string
  subject: string
  body: string
  html?: string
  attachments?: Array<{
    filename: string
    content: string | Buffer
  }>
}

export interface GeminiChatMessage {
  role: 'user' | 'model'
  content: string
}

export interface PaymentIntent {
  amount: number
  currency: string
  orderId: string
  customerEmail?: string
  customerPhone?: string
  returnUrl?: string
}

export interface FlightSearchParams {
  from: string
  to: string
  departDate: string
  returnDate?: string
  adults: number
  children: number
  infants: number
  classType: string
  tripType: 'ONE_WAY' | 'ROUND_TRIP' | 'MULTI_CITY'
}

export interface FlightResult {
  id: string
  airline: string
  flightNo: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  stops: number
  price: number
  currency: string
  classType: string
  availableSeats: number
}

export interface HomepageSectionData {
  id: string
  key: string
  title: string
  subtitle?: string
  description?: string
  coverImage?: string
  buttonText?: string
  buttonLink?: string
  bgColor?: string
  textColor?: string
  sortOrder: number
  isVisible: boolean
  is3D: boolean
  metaData?: Record<string, unknown>
}

export interface POSCartItem {
  serviceType: string
  description: string
  purchasePrice: number
  salePrice: number
  tax: number
  serviceCharge: number
  discount: number
  quantity: number
  total: number
  profit: number
}
