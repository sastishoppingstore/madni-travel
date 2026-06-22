import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const dues = await prisma.customerDue.findMany({
      where: { userId: params.id },
      orderBy: { createdAt: 'desc' },
    })

    const totalDue = dues.reduce((sum, d) => sum + d.due, 0)

    return successResponse({ dues, totalDue })
  } catch (error) {
    return errorResponse('Failed to fetch dues', 500)
  }
}
