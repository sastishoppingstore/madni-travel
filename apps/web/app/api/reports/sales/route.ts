import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    const where: any = {}
    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) where.createdAt.gte = new Date(dateFrom)
      if (dateTo) where.createdAt.lte = new Date(dateTo)
    }

    const [bookings, posSales, payments, byType, byStatus] = await Promise.all([
      prisma.booking.findMany({ where, select: { id: true, totalAmount: true, paidAmount: true, type: true, status: true, createdAt: true }, orderBy: { createdAt: 'desc' } }),
      prisma.pOSSale.findMany({ where, select: { id: true, totalAmount: true, profit: true, serviceType: true, createdAt: true }, orderBy: { createdAt: 'desc' } }),
      prisma.payment.findMany({ where: { ...where, status: 'PAID' }, select: { id: true, amount: true, method: true, createdAt: true }, orderBy: { createdAt: 'desc' } }),
      prisma.booking.groupBy({ by: ['type'], _sum: { totalAmount: true, paidAmount: true }, _count: { id: true }, where }),
      prisma.booking.groupBy({ by: ['status'], _count: { id: true }, _sum: { totalAmount: true }, where }),
    ])

    return successResponse({
      summary: {
        totalBookingRevenue: bookings.reduce((s, b) => s + b.totalAmount, 0),
        totalPOSRevenue: posSales.reduce((s, p) => s + p.totalAmount, 0),
        totalProfit: posSales.reduce((s, p) => s + (p.profit || 0), 0),
        totalPayments: payments.reduce((s, p) => s + p.amount, 0),
        totalBookings: bookings.length,
        totalSales: posSales.length,
      },
      bookings, posSales, payments, byType, byStatus,
    })
  } catch (error) {
    return errorResponse('Failed to generate sales report', 500)
  }
}
