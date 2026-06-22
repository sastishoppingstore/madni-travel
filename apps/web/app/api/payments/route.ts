import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, getAuthUser, successResponse, errorResponse, unauthorizedResponse } from '../lib/auth'
import { PaymentCreateSchema } from '../lib/validators'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const bookingId = searchParams.get('bookingId')
    const method = searchParams.get('method')
    const status = searchParams.get('status')
    const skip = (page - 1) * limit

    const where: any = {}
    if (bookingId) where.bookingId = bookingId
    if (method) where.method = method
    if (status) where.status = status

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        include: { booking: { select: { bookingNo: true, customerName: true, type: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.payment.count({ where }),
    ])

    return successResponse({ payments, total, page, pages: Math.ceil(total / limit) })
  } catch (error) {
    return errorResponse('Failed to fetch payments', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = PaymentCreateSchema.safeParse(body)
    if (!result.success) {
      return errorResponse(result.error.issues.map((e) => e.message).join(', '))
    }

    const { bookingId, amount, method, transactionId, notes } = result.data

    const payment = await prisma.$transaction(async (tx) => {
      const newPayment = await tx.payment.create({
        data: {
          bookingId,
          amount,
          method,
          status: 'PAID',
          transactionId,
          notes,
          paidAt: new Date(),
        },
      })

      await tx.booking.update({
        where: { id: bookingId },
        data: {
          paidAmount: { increment: amount },
          dueAmount: { decrement: amount },
          paymentStatus: 'PAID',
        },
      })

      await tx.cashLedger.create({
        data: {
          type: 'INCOME',
          category: 'Booking Payment',
          description: `Payment for booking ${bookingId}`,
          amount,
          balance: 0,
          reference: transactionId,
        },
      })

      return newPayment
    })

    return successResponse(payment, 'Payment recorded successfully')
  } catch (error) {
    console.error('Create payment error:', error)
    return errorResponse('Failed to record payment', 500)
  }
}
