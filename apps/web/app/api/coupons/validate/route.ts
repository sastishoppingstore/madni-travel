import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { successResponse, errorResponse } from '../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, amount } = body

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (!coupon) return errorResponse('Invalid coupon code', 400)
    if (!coupon.isActive) return errorResponse('Coupon is inactive', 400)
    if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) return errorResponse('Coupon expired', 400)
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) return errorResponse('Usage limit reached', 400)
    if (amount && coupon.minAmount > amount) return errorResponse(`Minimum amount PKR ${coupon.minAmount} required`, 400)

    let discount = 0
    if (coupon.discountType === 'PERCENTAGE') {
      discount = (amount * coupon.discountValue) / 100
      if (coupon.maxDiscount && discount > coupon.maxDiscount) discount = coupon.maxDiscount
    } else {
      discount = coupon.discountValue
    }

    return successResponse({
      valid: true,
      coupon,
      discount,
      finalAmount: amount - discount,
    })
  } catch (error) {
    return errorResponse('Failed to validate coupon', 500)
  }
}
