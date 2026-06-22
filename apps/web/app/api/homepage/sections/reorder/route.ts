import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../../lib/auth'

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const { sections } = body

    await prisma.$transaction(
      sections.map((s: any, index: number) =>
        prisma.homepageSection.update({
          where: { id: s.id },
          data: { sortOrder: index },
        })
      )
    )

    return successResponse(null, 'Sections reordered')
  } catch (error) {
    return errorResponse('Failed to reorder sections', 500)
  }
}
