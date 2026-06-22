import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { getAuthUser, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const { bookingId, amount, method } = body

    const gateway = await prisma.paymentGatewaySetting.findFirst({
      where: { name: method, isActive: true },
    })

    const intent = {
      id: `pi_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      bookingId,
      amount,
      method,
      currency: gateway?.currency || 'PKR',
      clientSecret: `secret_${Date.now()}_${Math.random().toString(36).slice(2, 16)}`,
      gateway: gateway?.displayName || method,
      redirectUrl: gateway?.callbackUrl || null,
      sandbox: gateway?.sandbox ?? true,
      extraFee: gateway?.extraFee || 0,
    }

    return successResponse(intent)
  } catch (error) {
    return errorResponse('Failed to create payment intent', 500)
  }
}
