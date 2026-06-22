import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    const isActive = searchParams.get('isActive')

    const where: any = {}
    if (country) where.country = { contains: country, mode: 'insensitive' }
    if (isActive !== null) where.isActive = isActive === 'true'

    const visas = await prisma.visaService.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    })

    return successResponse(visas)
  } catch (error) {
    return errorResponse('Failed to fetch visa services', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const visa = await prisma.visaService.create({
      data: {
        country: body.country,
        countryCode: body.countryCode,
        type: body.type,
        title: body.title,
        description: body.description,
        requirements: body.requirements,
        processingTime: body.processingTime || '7-10 working days',
        validity: body.validity,
        price: body.price || 0,
        currency: body.currency || 'PKR',
        coverImage: body.coverImage,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder || 0,
      },
    })

    return successResponse(visa, 'Visa service created')
  } catch (error) {
    console.error('Create visa error:', error)
    return errorResponse('Failed to create visa service', 500)
  }
}
