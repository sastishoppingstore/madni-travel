import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../lib/auth'
import { RefundCreateSchema } from '../lib/validators'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status

    const [refunds, total] = await Promise.all([
      prisma.refund.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.refund.count({ where }),
    ])

    return successResponse({ refunds, total, page, pages: Math.ceil(total / limit) })
  } catch (error) {
    return errorResponse('Failed to fetch refunds', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = RefundCreateSchema.safeParse(body)
    if (!result.success) return errorResponse(result.error.issues.map((e) => e.message).join(', '))

    const refund = await prisma.refund.create({
      data: {
        bookingId: result.data.bookingId,
        saleId: result.data.saleId,
        amount: result.data.amount,
        reason: result.data.reason,
        status: 'PENDING',
      },
    })

    return successResponse(refund, 'Refund request created')
  } catch (error) {
    return errorResponse('Failed to create refund', 500)
  }
}
