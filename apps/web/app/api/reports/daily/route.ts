import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const dateParam = searchParams.get('date')
    const date = dateParam ? new Date(dateParam) : new Date()
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)

    const [bookings, posSales, payments, expenses] = await Promise.all([
      prisma.booking.findMany({ where: { createdAt: { gte: startOfDay, lte: endOfDay } }, select: { totalAmount: true, paidAmount: true, type: true, status: true } }),
      prisma.pOSSale.findMany({ where: { createdAt: { gte: startOfDay, lte: endOfDay } }, select: { totalAmount: true, profit: true, paidAmount: true } }),
      prisma.payment.findMany({ where: { createdAt: { gte: startOfDay, lte: endOfDay }, status: 'PAID' }, select: { amount: true, method: true } }),
      prisma.expense.findMany({ where: { date: { gte: startOfDay, lte: endOfDay } }, select: { amount: true, category: true } }),
    ])

    const totalIncome = payments.reduce((s, p) => s + p.amount, 0) + posSales.reduce((s, p) => s + p.paidAmount, 0)
    const totalExpense = expenses.reduce((s, e) => s + e.amount, 0)

    return successResponse({
      date: startOfDay.toISOString().split('T')[0],
      bookings: { count: bookings.length, revenue: bookings.reduce((s, b) => s + b.totalAmount, 0), byType: bookings.reduce((acc: any, b) => { acc[b.type] = (acc[b.type] || 0) + 1; return acc }, {}) },
      posSales: { count: posSales.length, revenue: posSales.reduce((s, p) => s + p.totalAmount, 0), profit: posSales.reduce((s, p) => s + (p.profit || 0), 0) },
      payments: { total: payments.reduce((s, p) => s + p.amount, 0), byMethod: payments.reduce((acc: any, p) => { acc[p.method] = (acc[p.method] || 0) + p.amount; return acc }, {}) },
      expenses: { total: totalExpense, byCategory: expenses.reduce((acc: any, e) => { acc[e.category] = (acc[e.category] || 0) + e.amount; return acc }, {}) },
      summary: { totalIncome, totalExpense, cashInHand: totalIncome - totalExpense },
    })
  } catch (error) {
    return errorResponse('Failed to generate daily report', 500)
  }
}
