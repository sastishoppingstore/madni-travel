import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const BookingCreateSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email'),
  customerPhone: z.string().min(1, 'Phone is required'),
  type: z.enum(['FLIGHT', 'HOTEL', 'PACKAGE', 'VISA', 'BUS', 'UMRAH', 'CUSTOM']),
  totalAmount: z.number().positive('Total amount must be positive'),
  adultCount: z.number().int().min(1).default(1),
  childCount: z.number().int().min(0).default(0),
  infantCount: z.number().int().min(0).default(0),
  travelDate: z.string().optional(),
  returnDate: z.string().optional(),
  notes: z.string().optional(),
  supplierId: z.string().optional(),
  flightDetails: z.object({
    airline: z.string().optional(),
    flightNo: z.string().optional(),
    fromAirport: z.string(),
    toAirport: z.string(),
    fromCity: z.string(),
    toCity: z.string(),
    departureDate: z.string(),
    arrivalDate: z.string().optional(),
    classType: z.string().default('ECONOMY'),
    tripType: z.string().default('ONE_WAY'),
    baseFare: z.number().default(0),
    taxes: z.number().default(0),
    serviceFee: z.number().default(0),
    passengers: z.string().optional(),
  }).optional(),
  hotelDetails: z.object({
    hotelName: z.string(),
    city: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    roomType: z.string(),
    roomCount: z.number().int().default(1),
    nightCount: z.number().int().default(1),
  }).optional(),
  packageDetails: z.object({
    packageId: z.string().optional(),
    packageName: z.string(),
    destination: z.string(),
    duration: z.number().int().default(3),
  }).optional(),
  visaDetails: z.object({
    visaTypeId: z.string().optional(),
    country: z.string(),
    visaTypeName: z.string(),
    processingTime: z.string().default('7-10 days'),
    passportNo: z.string().optional(),
  }).optional(),
});

export const BookingStatusUpdateSchema = z.object({
  status: z.enum([
    'DRAFT', 'PENDING_PAYMENT', 'PAYMENT_FAILED', 'PAID_PENDING_CONFIRMATION',
    'CONFIRMED', 'TICKET_ISSUED', 'CANCELLED', 'REFUNDED', 'EXPIRED'
  ]),
  pnr: z.string().optional(),
  eTicketNo: z.string().optional(),
  ticketUrl: z.string().optional(),
  internalNotes: z.string().optional(),
});

export const StaffCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  role: z.enum(['MANAGER', 'SUPERVISOR', 'AGENT', 'CASHIER', 'SUPPORT']).default('AGENT'),
  department: z.string().optional(),
  salary: z.number().default(0),
  commissionRate: z.number().default(0),
  joinDate: z.string().optional(),
  notes: z.string().optional(),
});

export const SupplierCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  contactPerson: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const ExpenseCreateSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
  date: z.string().optional(),
  paymentMethod: z.string().default('CASH'),
  notes: z.string().optional(),
});

export const POSSaleCreateSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerPhone: z.string().optional(),
  serviceType: z.enum(['FLIGHT', 'HOTEL', 'PACKAGE', 'VISA', 'BUS', 'UMRAH', 'CUSTOM']),
  serviceDescription: z.string().optional(),
  purchasePrice: z.number().default(0),
  salePrice: z.number().default(0),
  tax: z.number().default(0),
  serviceCharge: z.number().default(0),
  discount: z.number().default(0),
  totalAmount: z.number().positive('Total amount is required'),
  paidAmount: z.number().default(0),
  paymentMethod: z.enum([
    'JAZZCASH', 'EASYPAISA', 'PAYFAST', 'SAFEPAY', 'BANK_TRANSFER',
    'CASH_AT_OFFICE', 'CREDIT_CARD', 'DEBIT_CARD', 'ONLINE'
  ]).default('CASH_AT_OFFICE'),
  staffId: z.string().optional(),
  notes: z.string().optional(),
});

export const PaymentCreateSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  amount: z.number().positive('Amount must be positive'),
  method: z.enum([
    'JAZZCASH', 'EASYPAISA', 'PAYFAST', 'SAFEPAY', 'BANK_TRANSFER',
    'CASH_AT_OFFICE', 'CREDIT_CARD', 'DEBIT_CARD', 'ONLINE'
  ]),
  transactionId: z.string().optional(),
  notes: z.string().optional(),
});

export const CouponCreateSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  description: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED']).default('PERCENTAGE'),
  discountValue: z.number().min(0).default(0),
  minAmount: z.number().default(0),
  maxDiscount: z.number().optional(),
  usageLimit: z.number().int().optional(),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const CashLedgerCreateSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE']),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
  reference: z.string().optional(),
});

export const RefundCreateSchema = z.object({
  bookingId: z.string().optional(),
  saleId: z.string().optional(),
  amount: z.number().positive('Amount must be positive'),
  reason: z.string().optional(),
});

export const NotificationCreateSchema = z.object({
  userId: z.string().optional(),
  bookingId: z.string().optional(),
  type: z.enum([
    'BOOKING_CREATED', 'PAYMENT_RECEIVED', 'TICKET_PENDING',
    'TICKET_CONFIRMED', 'TICKET_UPLOADED', 'BOOKING_CANCELLED',
    'REFUND_PROCESSED', 'GENERAL'
  ]),
  channel: z.enum(['EMAIL', 'WHATSAPP', 'SMS', 'PUSH']).default('EMAIL'),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
});

export const HomepageSectionSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
  bgColor: z.string().optional(),
  textColor: z.string().optional(),
  sortOrder: z.number().int().default(0),
  isVisible: z.boolean().default(true),
  is3D: z.boolean().default(false),
  metaData: z.string().optional(),
});

export const BlogPostCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  coverImage: z.string().optional(),
  author: z.string().default('Madni Travel'),
  category: z.string().default('Travel Guide'),
  tags: z.string().optional(),
  isPublished: z.boolean().default(true),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
});

export const SEOPageSchema = z.object({
  pagePath: z.string().min(1, 'Page path is required'),
  pageName: z.string().min(1, 'Page name is required'),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  focusKeyword: z.string().optional(),
  canonicalUrl: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  robotsIndex: z.boolean().default(true),
  sitemapInclude: z.boolean().default(true),
  schemaType: z.string().optional(),
  breadcrumbs: z.string().optional(),
  faqSchema: z.string().optional(),
  customSchema: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const FlightSearchSchema = z.object({
  from: z.string().min(1, 'From is required'),
  to: z.string().min(1, 'To is required'),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  adults: z.number().int().min(1).max(9).default(1),
  children: z.number().int().min(0).default(0),
  infants: z.number().int().min(0).default(0),
  class: z.enum(['ECONOMY', 'BUSINESS', 'FIRST']).default('ECONOMY'),
  tripType: z.enum(['ONE_WAY', 'ROUND_TRIP', 'MULTI_CITY']).default('ONE_WAY'),
});

export const WhatsAppMessageSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  message: z.string().min(1, 'Message is required'),
  templateName: z.string().optional(),
});

export const EmailSendSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  templateName: z.string().optional(),
  variables: z.record(z.string(), z.unknown()).optional(),
});

export const GeminiChatSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  conversationId: z.string().optional(),
  context: z.string().optional(),
});

export const SalaryCreateSchema = z.object({
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2000).max(2100),
  basicSalary: z.number().positive(),
  allowances: z.number().default(0),
  deductions: z.number().default(0),
  bonus: z.number().default(0),
  netSalary: z.number().positive(),
  notes: z.string().optional(),
});

export const CommissionCreateSchema = z.object({
  amount: z.number().positive(),
  description: z.string().optional(),
  saleId: z.string().optional(),
});
