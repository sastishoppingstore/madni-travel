import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const payment = await prisma.payment.findUnique({
      where: { id: params.id },
      include: { booking: true },
    })
    if (!payment) return errorResponse('Payment not found', 404)
    return successResponse(payment)
  } catch (error) {
    return errorResponse('Failed to fetch payment', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const payment = await prisma.payment.update({
      where: { id: params.id },
      data: {
        status: body.status,
        transactionId: body.transactionId,
        notes: body.notes,
      },
    })
    return successResponse(payment, 'Payment updated')
  } catch (error) {
    return errorResponse('Failed to update payment', 500)
  }
}
