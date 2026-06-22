// API Request/Response types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  phone?: string
}

export interface BookingCreateRequest {
  type: string
  customerName: string
  customerEmail: string
  customerPhone: string
  adultCount?: number
  childCount?: number
  infantCount?: number
  travelDate?: string
  returnDate?: string
  totalAmount: number
  notes?: string
  flightDetails?: {
    fromAirport: string
    toAirport: string
    fromCity: string
    toCity: string
    departureDate: string
    classType?: string
    tripType?: string
    passengers?: unknown[]
  }
  hotelDetails?: {
    hotelName: string
    city: string
    checkIn: string
    checkOut: string
    roomType: string
  }
  packageDetails?: {
    packageId?: string
    packageName: string
    destination: string
    duration?: number
  }
  visaDetails?: {
    visaTypeId?: string
    country: string
    visaTypeName: string
  }
  busDetails?: {
    fromCity: string
    toCity: string
    busType?: string
  }
  umrahDetails?: {
    packageId?: string
    packageName: string
    duration?: number
  }
}

export interface PaymentCreateRequest {
  bookingId: string
  amount: number
  method: string
  transactionId?: string
  notes?: string
}

export interface POSSaleRequest {
  customerName: string
  customerPhone?: string
  serviceType: string
  serviceDescription?: string
  purchasePrice: number
  salePrice: number
  tax?: number
  serviceCharge?: number
  discount?: number
  paidAmount?: number
  paymentMethod?: string
  staffId?: string
  notes?: string
}

export interface SettingsUpdateRequest {
  key: string
  value: string
  category?: string
}

export interface SEOPageRequest {
  pagePath: string
  pageName: string
  seoTitle?: string
  metaDescription?: string
  focusKeyword?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  robotsIndex?: boolean
  schemaType?: string
}

export interface HomepageSectionRequest {
  key: string
  title: string
  subtitle?: string
  description?: string
  coverImage?: string
  buttonText?: string
  buttonLink?: string
  bgColor?: string
  textColor?: string
  sortOrder?: number
  isVisible?: boolean
  is3D?: boolean
  metaData?: string
}
