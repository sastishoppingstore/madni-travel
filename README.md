# Madni Travel - Complete Travel Platform

A premium, production-ready travel booking platform built with Next.js, featuring a stunning 3D animated website, full ERP admin panel, comprehensive backend API, and a cross-platform mobile app.

## Features

### Public Website
- **3D Animated Homepage** — Three.js rotating globe with orbiting elements
- **16 AI-Generated Cover Images** — Premium section banners with titles and descriptions
- **Flight Booking System** — Search, select, book with passenger details
- **Holiday Packages** — Domestic (Murree, Skardu, Hunza, Naran, Kashmir) & International
- **Umrah Packages** — Sacred journeys with hotel details
- **Visa Services** — 6+ countries with processing info
- **Hotel & Bus Booking** — Comprehensive search and booking
- **AI Chatbot** — Gemini-powered floating assistant
- **WhatsApp Integration** — One-click WhatsApp support
- **Customer Dashboard** — Booking history, profile management
- **Blog** — Travel guides and articles
- **Fully Responsive** — Mobile-first design
- **SEO Optimized** — Rank Math-like SEO system

### Admin Panel (ERP + POS)
- **Dashboard** — 13+ analytics widgets with charts
- **POS System** — Full point-of-sale with auto-calculations
- **Booking Management** — All booking types with status tracking
- **Staff Management** — Salaries, commissions, roles
- **Payment Gateway Settings** — JazzCash, EasyPaisa, PayFast config
- **WhatsApp API Settings** — Meta Cloud API with test sender
- **SMTP Email Settings** — Full email configuration with test
- **Gemini AI Settings** — Chatbot configuration with test chat
- **SEO Manager** — Rank Math-like page-by-page SEO control
- **Website Builder** — Drag-and-drop homepage section editor
- **Reports** — Sales, profit, staff performance with charts
- **Media Manager** — Image upload and management
- **Coupon System** — Discount codes management
- **Audit Logs** — Complete activity tracking

### Backend API (85+ endpoints)
- **Authentication** — JWT-based auth with role-based access
- **Bookings CRUD** — Full lifecycle management
- **Payments** — Intent creation, verification, webhooks
- **WhatsApp** — Message sending via Meta API
- **Email** — SMTP email with templates
- **Gemini AI** — Chat and admin queries
- **SEO** — Page management, sitemap, redirects
- **Settings** — All configurable from admin panel
- **Reports** — Aggregated analytics data

### Mobile App (Expo)
- **Cross-Platform** — iOS and Android
- **All Services** — Flights, packages, Umrah, visa, hotels, buses
- **Booking Flow** — Complete search to confirmation
- **AI Chatbot** — Gemini-powered travel assistant
- **User Profile** — Booking history, settings

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Website | Next.js 14, TypeScript, Tailwind CSS, Three.js, Framer Motion |
| Admin Panel | Next.js 14, TypeScript, Tailwind CSS, Recharts, shadcn/ui |
| Backend API | Next.js API Routes, Prisma, PostgreSQL, Zod |
| Mobile App | Expo, React Native, TypeScript, Zustand |
| Database | PostgreSQL (via Prisma ORM) |
| Auth | JWT with bcrypt |
| AI | Google Gemini API |
| Payments | JazzCash, EasyPaisa, PayFast |
| Messaging | WhatsApp Cloud API, SMTP |

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (or use Docker)
- pnpm (recommended)

### 1. Clone & Install

```bash
git clone <repository-url>
cd madni-travel
pnpm install
```

### 2. Setup Database

```bash
# Using Docker
docker-compose up -d

# Push Prisma schema
pnpm db:push

# Generate Prisma client
pnpm db:generate
```

### 3. Environment Variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Run Development Servers

```bash
# Run all apps
pnpm dev

# Or run individually
cd apps/web && pnpm dev      # Website + API (port 3000)
cd apps/admin && pnpm dev    # Admin panel (port 3001)
cd apps/mobile && pnpm start # Mobile app (Expo)
```

### 5. Admin Access

After database setup, create an admin user via API:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@madnitravel.com","password":"admin123","phone":"+920000000000"}'
```

Then update the user role to SUPER_ADMIN in the database.

## Project Structure

```
madni-travel/
├── apps/
│   ├── web/                 # Public website + Backend API
│   │   ├── app/
│   │   │   ├── page.tsx     # Homepage (3D animated)
│   │   │   ├── flights/
│   │   │   ├── holidays/
│   │   │   ├── umrah/
│   │   │   ├── visa/
│   │   │   ├── hotels/
│   │   │   ├── buses/
│   │   │   ├── blog/
│   │   │   ├── dashboard/
│   │   │   └── api/         # All API routes
│   │   └── public/images/   # 16 AI-generated cover images
│   ├── admin/               # Admin panel (ERP + POS)
│   │   └── app/admin/
│   │       ├── page.tsx     # Dashboard
│   │       ├── pos/
│   │       ├── bookings/
│   │       ├── settings/
│   │       ├── seo/
│   │       └── ...
│   └── mobile/              # Expo React Native app
│       └── src/screens/
├── packages/
│   ├── db/                  # Prisma schema + client
│   ├── types/               # Shared TypeScript types
│   ├── seo/                 # SEO helpers
│   ├── pdf/                 # PDF generation
│   ├── notifications/       # Email + WhatsApp
│   ├── ai/                  # Gemini integration
│   └── payments/            # Payment gateway abstraction
├── prisma/
│   └── schema.prisma        # Complete database schema
├── docker-compose.yml       # PostgreSQL + Redis
└── turbo.json               # Turborepo configuration
```

## API Configuration (Admin Panel)

All integrations are configurable from the admin panel without code changes:

### Payment Gateways
1. Go to Admin > Settings > Payment Gateways
2. Configure JazzCash, EasyPaisa, or PayFast
3. Toggle sandbox/live mode
4. Enter merchant credentials

### WhatsApp API
1. Go to Admin > Settings > WhatsApp API
2. Select provider (Meta Cloud API recommended)
3. Enter Access Token, Phone Number ID
4. Click "Test Message" to verify

### SMTP Email
1. Go to Admin > Settings > SMTP
2. Enter SMTP host, port, credentials
3. Set From Email and From Name
4. Click "Test Email" to verify

### Gemini AI
1. Go to Admin > Settings > Gemini AI
2. Enter Gemini API Key
3. Customize system prompt and greeting
4. Set temperature and max tokens
5. Click "Test Chatbot" to verify

### Flight API
1. Go to Admin > Settings > Flight API
2. Select provider (Amadeus, GDS, or Generic)
3. Enter API credentials
4. Set markup percentage and service fee

## Database Schema Highlights

The Prisma schema includes 30+ models covering:
- **Users & Auth** — Role-based access (Super Admin, Admin, Manager, Staff, Customer)
- **Bookings** — Unified booking system for all service types
- **Payments** — Multi-gateway payment tracking
- **Staff** — Workers, salaries, commissions
- **Suppliers** — Vendor management
- **SEO** — Page-by-page SEO control
- **Settings** — All configurable integrations
- **POS** — Point of sale transactions
- **Reports** — Audit logs, cash ledger, refunds

## Mobile App Build

### Android APK
```bash
cd apps/mobile
expo build:android
# Or with EAS
eas build -p android
```

### iOS
```bash
cd apps/mobile
expo build:ios
# Or with EAS
eas build -p ios
```

## Deployment

### Website + API (Vercel)
```bash
cd apps/web
vercel --prod
```

### Admin Panel (Vercel)
```bash
cd apps/admin
vercel --prod
```

### Self-Hosted (Docker)
```bash
docker-compose up -d
cd apps/web && npm run build && npm start
cd apps/admin && npm run build && npm start
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| JWT_SECRET | Secret for JWT tokens |
| SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS | Email configuration |
| WHATSAPP_API_KEY, WHATSAPP_PHONE_ID | WhatsApp Cloud API |
| GEMINI_API_KEY | Google Gemini API |
| JAZZCASH_MERCHANT_ID, JAZZCASH_PASSWORD | JazzCash credentials |
| EASYPAISA_STORE_ID, EASYPAISA_HASH_KEY | EasyPaisa credentials |
| FLIGHT_API_KEY, FLIGHT_API_SECRET | Flight API credentials |

## License

Proprietary - Madni Travel Platform

## Support

For support, contact us via:
- WhatsApp: +92-XXX-XXXXXXX
- Email: support@madnitravel.com
- Website: www.madnitravel.com
