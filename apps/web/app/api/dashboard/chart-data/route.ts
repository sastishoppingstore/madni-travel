import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const months = parseInt(searchParams.get('months') || '6')

    const labels: string[] = []
    const bookingData: number[] = []
    const revenueData: number[] = []
    const expenseData: number[] = []

    for (let i = months - 1; i >= 0; i--) {
      const d = new Date()
      d.setMonth(d.getMonth() - i)
      const monthStart = new Date(d.getFullYear(), d.getMonth(), 1)
      const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59)

      labels.push(d.toLocaleString('default', { month: 'short', year: '2-digit' }))

      const [bookings, revenue, expenses] = await Promise.all([
        prisma.booking.count({ where: { createdAt: { gte: monthStart, lte: monthEnd } } }),
        prisma.booking.aggregate({ _sum: { paidAmount: true }, where: { createdAt: { gte: monthStart, lte: monthEnd } } }),
        prisma.expense.aggregate({ _sum: { amount: true }, where: { date: { gte: monthStart, lte: monthEnd } } }),
      ])

      bookingData.push(bookings)
      revenueData.push(revenue._sum.paidAmount || 0)
      expenseData.push(expenses._sum.amount || 0)
    }

    return successResponse({ labels, bookings: bookingData, revenue: revenueData, expenses: expenseData })
  } catch (error) {
    return errorResponse('Failed to fetch chart data', 500)
  }
}
