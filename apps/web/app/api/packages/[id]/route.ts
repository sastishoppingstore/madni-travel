import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const pkg = await prisma.holidayPackage.findUnique({ where: { id: params.id } })
    if (!pkg) return errorResponse('Package not found', 404)
    return successResponse(pkg)
  } catch (error) {
    return errorResponse('Failed to fetch package', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const pkg = await prisma.holidayPackage.update({
      where: { id: params.id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        destination: body.destination,
        duration: body.duration,
        price: body.price,
        salePrice: body.salePrice,
        coverImage: body.coverImage,
        gallery: body.gallery,
        highlights: body.highlights,
        itinerary: body.itinerary,
        inclusions: body.inclusions,
        exclusions: body.exclusions,
        terms: body.terms,
        isFeatured: body.isFeatured,
        isActive: body.isActive,
        sortOrder: body.sortOrder,
        seoTitle: body.seoTitle,
        seoDesc: body.seoDesc,
      },
    })

    return successResponse(pkg, 'Package updated')
  } catch (error) {
    return errorResponse('Failed to update package', 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    await prisma.holidayPackage.delete({ where: { id: params.id } })
    return successResponse(null, 'Package deleted')
  } catch (error) {
    return errorResponse('Failed to delete package', 500)
  }
}
