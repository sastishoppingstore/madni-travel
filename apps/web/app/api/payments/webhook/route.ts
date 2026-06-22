import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { successResponse, errorResponse } from '../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get('x-webhook-signature')

    console.log('Webhook received:', { signature, body: JSON.stringify(body).slice(0, 200) })

    const { transactionId, bookingId, amount, status, gateway } = body

    if (status === 'success' || status === 'PAID') {
      await prisma.$transaction(async (tx) => {
        const existingPayment = await tx.payment.findFirst({
          where: { transactionId },
        })

        if (!existingPayment) {
          await tx.payment.create({
            data: {
              bookingId,
              amount: parseFloat(amount),
              method: gateway?.toUpperCase() || 'ONLINE',
              status: 'PAID',
              transactionId,
              paidAt: new Date(),
            },
          })

          await tx.booking.update({
            where: { id: bookingId },
            data: {
              paidAmount: { increment: parseFloat(amount) },
              paymentStatus: 'PAID',
            },
          })
        }
      })

      return successResponse({ received: true }, 'Webhook processed')
    }

    return successResponse({ received: true }, 'Webhook acknowledged')
  } catch (error) {
    console.error('Webhook error:', error)
    return errorResponse('Webhook processing failed', 500)
  }
}
