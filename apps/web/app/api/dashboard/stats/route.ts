import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const [
      totalBookings,
      todayBookings,
      pendingBookings,
      confirmedBookings,
      totalRevenue,
      todayRevenue,
      dueAmount,
      totalCustomers,
      totalStaff,
      activePackages,
      posSales,
      expenses,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.booking.count({ where: { status: 'PENDING_PAYMENT' } }),
      prisma.booking.count({ where: { status: 'CONFIRMED' } }),
      prisma.booking.aggregate({ _sum: { paidAmount: true }, where: { createdAt: { gte: startOfMonth } } }),
      prisma.booking.aggregate({ _sum: { paidAmount: true }, where: { createdAt: { gte: startOfToday } } }),
      prisma.booking.aggregate({ _sum: { dueAmount: true } }),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.staff.count({ where: { status: 'ACTIVE' } }),
      prisma.holidayPackage.count({ where: { isActive: true } }),
      prisma.pOSSale.aggregate({ _sum: { totalAmount: true }, where: { createdAt: { gte: startOfMonth } } }),
      prisma.expense.aggregate({ _sum: { amount: true }, where: { date: { gte: startOfMonth } } }),
    ])

    const byType = await prisma.booking.groupBy({
      by: ['type'],
      _count: { id: true },
      where: { createdAt: { gte: startOfMonth } },
    })

    return successResponse({
      totalBookings,
      todayBookings,
      pendingBookings,
      confirmedBookings,
      totalRevenue: (totalRevenue._sum.paidAmount || 0) + (posSales._sum.totalAmount || 0),
      todayRevenue: todayRevenue._sum.paidAmount || 0,
      totalDue: dueAmount._sum.dueAmount || 0,
      totalCustomers,
      totalStaff,
      activePackages,
      posRevenue: posSales._sum.totalAmount || 0,
      expenses: expenses._sum.amount || 0,
      byType,
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return errorResponse('Failed to fetch stats', 500)
  }
}
