import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, getAuthUser, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'
import { HomepageSectionSchema } from '../../lib/validators'

export async function GET(request: NextRequest) {
  try {
    const sections = await prisma.homepageSection.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: 'asc' },
    })
    return successResponse(sections)
  } catch (error) {
    return errorResponse('Failed to fetch sections', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = HomepageSectionSchema.safeParse(body)
    if (!result.success) return errorResponse(result.error.issues.map((e) => e.message).join(', '))

    const section = await prisma.homepageSection.create({ data: result.data })
    return successResponse(section, 'Section created')
  } catch (error: any) {
    if (error.code === 'P2002') return errorResponse('Section key already exists', 409)
    return errorResponse('Failed to create section', 500)
  }
}
