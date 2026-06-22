import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('isActive')
    const isFeatured = searchParams.get('isFeatured')

    const where: any = {}
    if (isActive !== null) where.isActive = isActive === 'true'
    if (isFeatured !== null) where.isFeatured = isFeatured === 'true'

    const packages = await prisma.umrahPackage.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    })

    return successResponse(packages)
  } catch (error) {
    return errorResponse('Failed to fetch Umrah packages', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const pkg = await prisma.umrahPackage.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        duration: body.duration || 15,
        price: body.price || 0,
        salePrice: body.salePrice || 0,
        currency: body.currency || 'PKR',
        coverImage: body.coverImage,
        makkahHotel: body.makkahHotel,
        makkahNights: body.makkahNights || 7,
        madinahHotel: body.madinahHotel,
        madinahNights: body.madinahNights || 7,
        includesFlights: body.includesFlights ?? true,
        includesVisa: body.includesVisa ?? true,
        includesTransport: body.includesTransport ?? true,
        includesFood: body.includesFood ?? true,
        includesGuide: body.includesGuide ?? true,
        isFeatured: body.isFeatured ?? false,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder || 0,
        seoTitle: body.seoTitle,
        seoDesc: body.seoDesc,
      },
    })

    return successResponse(pkg, 'Umrah package created')
  } catch (error) {
    console.error('Create Umrah error:', error)
    return errorResponse('Failed to create Umrah package', 500)
  }
}
