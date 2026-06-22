import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const coupon = await prisma.coupon.findUnique({ where: { id: params.id } })
    if (!coupon) return errorResponse('Coupon not found', 404)
    return successResponse(coupon)
  } catch (error) {
    return errorResponse('Failed to fetch coupon', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const coupon = await prisma.coupon.update({
      where: { id: params.id },
      data: {
        code: body.code?.toUpperCase(),
        description: body.description,
        discountType: body.discountType,
        discountValue: body.discountValue,
        minAmount: body.minAmount,
        maxDiscount: body.maxDiscount,
        usageLimit: body.usageLimit,
        validFrom: body.validFrom ? new Date(body.validFrom) : undefined,
        validUntil: body.validUntil ? new Date(body.validUntil) : null,
        isActive: body.isActive,
      },
    })

    return successResponse(coupon, 'Coupon updated')
  } catch (error: any) {
    if (error.code === 'P2002') return errorResponse('Code already exists', 409)
    return errorResponse('Failed to update coupon', 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    await prisma.coupon.delete({ where: { id: params.id } })
    return successResponse(null, 'Coupon deleted')
  } catch (error) {
    return errorResponse('Failed to delete coupon', 500)
  }
}
