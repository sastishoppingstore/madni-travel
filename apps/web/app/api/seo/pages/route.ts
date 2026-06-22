import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'
import { SEOPageSchema } from '../../lib/validators'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search')
    const skip = (page - 1) * limit

    const where: any = {}
    if (search) {
      where.OR = [
        { pageName: { contains: search, mode: 'insensitive' } },
        { pagePath: { contains: search, mode: 'insensitive' } },
        { seoTitle: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [pages, total] = await Promise.all([
      prisma.sEOPage.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.sEOPage.count({ where }),
    ])

    return successResponse({ pages, total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    return errorResponse('Failed to fetch SEO pages', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = SEOPageSchema.safeParse(body)
    if (!result.success) return errorResponse(result.error.issues.map((e) => e.message).join(', '))

    const page = await prisma.sEOPage.create({ data: result.data })
    return successResponse(page, 'SEO page created')
  } catch (error: any) {
    if (error.code === 'P2002') return errorResponse('Page path already exists', 409)
    return errorResponse('Failed to create SEO page', 500)
  }
}
