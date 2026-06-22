import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const lastEntry = await prisma.cashLedger.findFirst({ orderBy: { createdAt: 'desc' } })
    const balance = lastEntry?.balance || 0

    const [totalIncome, totalExpense] = await Promise.all([
      prisma.cashLedger.aggregate({ _sum: { amount: true }, where: { type: 'INCOME' } }),
      prisma.cashLedger.aggregate({ _sum: { amount: true }, where: { type: 'EXPENSE' } }),
    ])

    return successResponse({
      currentBalance: balance,
      totalIncome: totalIncome._sum.amount || 0,
      totalExpense: totalExpense._sum.amount || 0,
    })
  } catch (error) {
    return errorResponse('Failed to fetch balance', 500)
  }
}
