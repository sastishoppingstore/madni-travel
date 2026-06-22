import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const refund = await prisma.refund.findUnique({ where: { id: params.id } })
    if (!refund) return errorResponse('Refund not found', 404)
    return successResponse(refund)
  } catch (error) {
    return errorResponse('Failed to fetch refund', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const refund = await prisma.refund.update({
      where: { id: params.id },
      data: {
        status: body.status,
        processedAt: body.status === 'PROCESSED' ? new Date() : undefined,
      },
    })

    return successResponse(refund, 'Refund updated')
  } catch (error) {
    return errorResponse('Failed to update refund', 500)
  }
}
