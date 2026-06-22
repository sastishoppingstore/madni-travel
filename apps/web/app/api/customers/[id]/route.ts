import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const customer = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        bookings: { orderBy: { createdAt: 'desc' }, take: 10 },
        customerDues: true,
        notifications: { orderBy: { createdAt: 'desc' }, take: 10 },
      },
    })

    if (!customer) return errorResponse('Customer not found', 404)
    return successResponse(customer)
  } catch (error) {
    return errorResponse('Failed to fetch customer', 500)
  }
}
