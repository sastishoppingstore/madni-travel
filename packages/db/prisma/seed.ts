import { prisma } from '../index'

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@madni.travel' },
    update: {},
    create: {
      email: 'admin@madni.travel',
      password: '$2b$10$Bn6R3hR.MihXO6mGjmfEs.C1LzSD2haPlI7Iux/CzeUdEn7NMmLe2',
      name: 'Madni Admin',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    },
  })

  await prisma.staff.upsert({
    where: { email: 'staff@madni.travel' },
    update: {},
    create: {
      name: 'Travel Ops',
      email: 'staff@madni.travel',
      role: 'MANAGER',
      status: 'ACTIVE',
      salary: 85000,
      commissionRate: 5,
    },
  })

  await prisma.supplier.deleteMany()
  await prisma.supplier.create({
    data: {
      name: 'Madni Airlines Desk',
      type: 'Airline',
      contactPerson: 'Operations Team',
      email: 'ops@madni.travel',
      phone: '+92-300-0000000',
      address: '6 Main Mushaf Ali Road, Sargodha',
    },
  })

  await prisma.companySetting.upsert({
    where: { key: 'company_name' },
    update: { value: 'Madni Travel', label: 'Company Name' },
    create: {
      key: 'company_name',
      value: 'Madni Travel',
      category: 'GENERAL',
      label: 'Company Name',
    },
  })

  await prisma.companySetting.upsert({
    where: { key: 'support_email' },
    update: { value: 'support@madni.travel', label: 'Support Email' },
    create: {
      key: 'support_email',
      value: 'support@madni.travel',
      category: 'GENERAL',
      label: 'Support Email',
    },
  })

  await prisma.paymentGatewaySetting.deleteMany()
  await prisma.paymentGatewaySetting.create({
    data: {
      name: 'JazzCash',
      displayName: 'JazzCash',
      gatewayType: 'JAZZCASH',
      isActive: true,
      sandbox: true,
      currency: 'PKR',
      sortOrder: 1,
    },
  })

  await prisma.whatsAppSetting.deleteMany()
  await prisma.whatsAppSetting.create({
    data: {
      provider: 'meta',
      templateName: 'madni_travel_',
      languageCode: 'en',
      isActive: false,
    },
  })

  await prisma.geminiSetting.upsert({
    where: { id: 'seed-gemini' },
    update: { isActive: false },
    create: {
      id: 'seed-gemini',
      modelName: 'gemini-2.5-flash',
      isActive: false,
      greeting: 'Assalamualaikum! How can I help?',
    },
  })

  await prisma.sMTPSetting.deleteMany()
  await prisma.sMTPSetting.create({
    data: {
      host: 'smtp.example.com',
      port: 587,
      username: 'smtp-user',
      password: 'smtp-password',
      encryption: 'tls',
      fromEmail: 'noreply@madni.travel',
      fromName: 'Madni Travel',
      replyTo: 'support@madni.travel',
      isActive: false,
    },
  })

  await prisma.flightAPISetting.deleteMany()
  await prisma.flightAPISetting.create({
    data: {
      providerName: 'Demo Flights',
      providerType: 'Generic',
      baseUrl: 'https://api.example.com',
      isActive: true,
      sandbox: true,
      markupPercent: 10,
      fixedServiceFee: 0,
      currency: 'PKR',
    },
  })

  await prisma.holidayPackage.upsert({
    where: { slug: 'dubai-shopping' },
    update: { isActive: true },
    create: {
      title: 'Dubai Shopping Festival',
      slug: 'dubai-shopping',
      description: 'A premium short holiday to Dubai.',
      destination: 'Dubai, UAE',
      duration: 5,
      price: 85000,
      salePrice: 79999,
      coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      isFeatured: true,
      isActive: true,
    },
  })

  await prisma.umrahPackage.upsert({
    where: { slug: 'premium-umrah' },
    update: { isActive: true },
    create: {
      title: 'Premium Umrah Package',
      slug: 'premium-umrah',
      description: 'Comfortable and guided Umrah package.',
      duration: 15,
      price: 285000,
      salePrice: 259000,
      coverImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800',
      isFeatured: true,
      isActive: true,
    },
  })

  await prisma.visaService.deleteMany()
  await prisma.visaService.create({
    data: {
      country: 'Saudi Arabia',
      countryCode: 'SA',
      type: 'Umrah Visa',
      title: 'Saudi Arabia Umrah Visa',
      description: 'Visa support for Umrah travelers.',
      processingTime: '3-5 days',
      price: 15000,
      isActive: true,
      sortOrder: 1,
    },
  })

  await prisma.homepageSection.upsert({
    where: { key: 'hero' },
    update: { isVisible: true },
    create: {
      key: 'hero',
      title: 'Madani Travel',
      subtitle: 'Journey with Trust, Travel with Peace',
      description: 'Flights, hotels, umrah and holiday packages in one place.',
      isVisible: true,
      is3D: false,
      sortOrder: 1,
    },
  })

  await prisma.blogPost.upsert({
    where: { slug: 'travel-tips-for-umrah' },
    update: { isPublished: true },
    create: {
      title: 'Travel Tips for Umrah',
      slug: 'travel-tips-for-umrah',
      excerpt: 'Practical tips to prepare for a smooth Umrah journey.',
      content: 'Pack light, keep documents ready, and travel with a trusted operator.',
      author: 'Madni Travel',
      category: 'Umrah',
      isPublished: true,
    },
  })

  await prisma.sEOPage.upsert({
    where: { pagePath: '/' },
    update: { isActive: true },
    create: {
      pagePath: '/',
      pageName: 'Home',
      seoTitle: 'Madni Travel - Journey with Trust, Travel with Peace',
      metaDescription: 'Book flights, hotels, umrah and holiday packages.',
      isActive: true,
    },
  })

  console.log('Seed complete')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
