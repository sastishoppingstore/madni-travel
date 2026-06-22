import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'today'

    const now = new Date()
    let startDate: Date

    switch (period) {
      case 'today': startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); break
      case 'week': startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); break
      case 'month': startDate = new Date(now.getFullYear(), now.getMonth(), 1); break
      default: startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    }

    const [totalSales, totalRevenue, totalProfit, totalDue, byServiceType] = await Promise.all([
      prisma.pOSSale.count({ where: { createdAt: { gte: startDate } } }),
      prisma.pOSSale.aggregate({ _sum: { totalAmount: true }, where: { createdAt: { gte: startDate } } }),
      prisma.pOSSale.aggregate({ _sum: { profit: true }, where: { createdAt: { gte: startDate } } }),
      prisma.pOSSale.aggregate({ _sum: { dueAmount: true }, where: { createdAt: { gte: startDate } } }),
      prisma.pOSSale.groupBy({
        by: ['serviceType'],
        _sum: { totalAmount: true, profit: true },
        _count: { id: true },
        where: { createdAt: { gte: startDate } },
      }),
    ])

    return successResponse({
      totalSales,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      totalProfit: totalProfit._sum.profit || 0,
      totalDue: totalDue._sum.dueAmount || 0,
      byServiceType,
      period,
    })
  } catch (error) {
    return errorResponse('Failed to fetch POS stats', 500)
  }
}
