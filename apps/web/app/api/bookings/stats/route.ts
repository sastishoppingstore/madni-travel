import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'month'

    const now = new Date()
    let startDate: Date

    switch (period) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    }

    const [
      totalBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      totalRevenue,
      paidAmount,
      dueAmount,
      byType,
    ] = await Promise.all([
      prisma.booking.count({ where: { createdAt: { gte: startDate } } }),
      prisma.booking.count({ where: { status: 'CONFIRMED', createdAt: { gte: startDate } } }),
      prisma.booking.count({ where: { status: { in: ['PENDING_PAYMENT', 'PAID_PENDING_CONFIRMATION'] }, createdAt: { gte: startDate } } }),
      prisma.booking.count({ where: { status: 'CANCELLED', createdAt: { gte: startDate } } }),
      prisma.booking.aggregate({ _sum: { totalAmount: true }, where: { createdAt: { gte: startDate } } }),
      prisma.booking.aggregate({ _sum: { paidAmount: true }, where: { createdAt: { gte: startDate } } }),
      prisma.booking.aggregate({ _sum: { dueAmount: true }, where: { createdAt: { gte: startDate } } }),
      prisma.booking.groupBy({
        by: ['type'],
        _count: { id: true },
        where: { createdAt: { gte: startDate } },
      }),
    ])

    return successResponse({
      totalBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      paidAmount: paidAmount._sum.paidAmount || 0,
      dueAmount: dueAmount._sum.dueAmount || 0,
      byType,
      period,
    })
  } catch (error) {
    console.error('Booking stats error:', error)
    return errorResponse('Failed to fetch stats', 500)
  }
}
