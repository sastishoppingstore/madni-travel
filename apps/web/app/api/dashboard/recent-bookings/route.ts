import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const bookings = await prisma.booking.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        bookingNo: true,
        customerName: true,
        type: true,
        status: true,
        totalAmount: true,
        paidAmount: true,
        createdAt: true,
      },
    })

    return successResponse(bookings)
  } catch (error) {
    return errorResponse('Failed to fetch recent bookings', 500)
  }
}
