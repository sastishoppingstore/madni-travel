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

    const [posSales, expenses, bookings, supplierPayments] = await Promise.all([
      prisma.pOSSale.findMany({ where, select: { totalAmount: true, profit: true, purchasePrice: true } }),
      prisma.expense.findMany({ where: dateFrom ? { date: { gte: new Date(dateFrom), ...(dateTo ? { lte: new Date(dateTo) } : {}) } } : undefined, select: { amount: true, category: true } }),
      prisma.booking.findMany({ where, select: { totalAmount: true, paidAmount: true } }),
      prisma.supplierPayment.findMany({ where: dateFrom ? { createdAt: { gte: new Date(dateFrom) } } : undefined, select: { amount: true, type: true } }),
    ])

    const posRevenue = posSales.reduce((s, p) => s + p.totalAmount, 0)
    const posProfit = posSales.reduce((s, p) => s + (p.profit || 0), 0)
    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0)
    const bookingRevenue = bookings.reduce((s, b) => s + b.paidAmount, 0)
    const supplierCost = supplierPayments.filter(p => p.type === 'PAYMENT').reduce((s, p) => s + p.amount, 0)

    return successResponse({
      revenue: { posRevenue, bookingRevenue, total: posRevenue + bookingRevenue },
      costs: { supplierCost, totalExpenses, total: supplierCost + totalExpenses },
      profit: { grossProfit: posProfit + bookingRevenue - supplierCost, netProfit: posProfit + bookingRevenue - supplierCost - totalExpenses, posProfit },
      expenseBreakdown: expenses.reduce((acc: any, e) => { acc[e.category] = (acc[e.category] || 0) + e.amount; return acc }, {}),
    })
  } catch (error) {
    return errorResponse('Failed to generate profit report', 500)
  }
}
