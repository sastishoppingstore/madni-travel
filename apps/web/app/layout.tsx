import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Madni Travel - Discover the World with Us",
    template: "%s | Madni Travel",
  },
  description:
    "Madni Travel is Pakistan's leading travel agency offering flights, holiday packages, Umrah tours, visa services, hotel bookings, and bus reservations. Book your next adventure today!",
  keywords: [
    "Madni Travel",
    "travel agency Pakistan",
    "flight booking",
    "holiday packages",
    "Umrah packages",
    "visa services",
    "hotel booking",
    "bus booking",
    "Pakistan tours",
    "Skardu",
    "Hunza",
    "Murree",
    "Naran Kaghan",
    "Kashmir",
  ],
  authors: [{ name: "Madni Travel" }],
  creator: "Madni Travel",
  publisher: "Madni Travel",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://madnitravel.com",
    siteName: "Madni Travel",
    title: "Madni Travel - Discover the World with Us",
    description:
      "Pakistan's leading travel agency for flights, holidays, Umrah, visa, hotels & bus bookings.",
    images: ["/images/hero-3d-travel.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Madni Travel - Discover the World with Us",
    description: "Pakistan's leading travel agency for flights, holidays, Umrah & more.",
    images: ["/images/hero-3d-travel.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://madnitravel.com",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen bg-white font-sans overflow-x-hidden">{children}</body>
    </html>
  )
}
