import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { successResponse, errorResponse } from '../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentIntentId, bookingId, transactionId, status } = body

    if (status === 'success' || status === 'PAID') {
      const payment = await prisma.$transaction(async (tx) => {
        const booking = await tx.booking.findUnique({ where: { id: bookingId } })
        if (!booking) throw new Error('Booking not found')

        const newPayment = await tx.payment.create({
          data: {
            bookingId,
            amount: booking.dueAmount,
            method: 'ONLINE',
            status: 'PAID',
            transactionId,
            paidAt: new Date(),
          },
        })

        await tx.booking.update({
          where: { id: bookingId },
          data: {
            paidAmount: { increment: booking.dueAmount },
            dueAmount: 0,
            paymentStatus: 'PAID',
            status: 'PAID_PENDING_CONFIRMATION',
          },
        })

        return newPayment
      })

      return successResponse({ verified: true, payment }, 'Payment verified')
    }

    return successResponse({ verified: false }, 'Payment verification pending')
  } catch (error) {
    console.error('Payment verify error:', error)
    return errorResponse('Failed to verify payment', 500)
  }
}
