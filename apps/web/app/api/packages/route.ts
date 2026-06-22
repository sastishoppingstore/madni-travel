import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, getAuthUser, successResponse, errorResponse, unauthorizedResponse } from '../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('isActive')
    const isFeatured = searchParams.get('isFeatured')
    const destination = searchParams.get('destination')

    const where: any = {}
    if (isActive !== null) where.isActive = isActive === 'true'
    if (isFeatured !== null) where.isFeatured = isFeatured === 'true'
    if (destination) where.destination = { contains: destination, mode: 'insensitive' }

    const packages = await prisma.holidayPackage.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    })

    return successResponse(packages)
  } catch (error) {
    return errorResponse('Failed to fetch packages', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const pkg = await prisma.holidayPackage.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        destination: body.destination,
        duration: body.duration || 3,
        price: body.price || 0,
        salePrice: body.salePrice || 0,
        currency: body.currency || 'PKR',
        coverImage: body.coverImage,
        gallery: body.gallery,
        highlights: body.highlights,
        itinerary: body.itinerary,
        inclusions: body.inclusions,
        exclusions: body.exclusions,
        terms: body.terms,
        isFeatured: body.isFeatured ?? false,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder || 0,
        seoTitle: body.seoTitle,
        seoDesc: body.seoDesc,
      },
    })

    return successResponse(pkg, 'Package created successfully')
  } catch (error) {
    console.error('Create package error:', error)
    return errorResponse('Failed to create package', 500)
  }
}
