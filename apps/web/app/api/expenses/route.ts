import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../lib/auth'
import { ExpenseCreateSchema } from '../lib/validators'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const skip = (page - 1) * limit

    const where: any = {}
    if (category) where.category = category
    if (dateFrom || dateTo) {
      where.date = {}
      if (dateFrom) where.date.gte = new Date(dateFrom)
      if (dateTo) where.date.lte = new Date(dateTo)
    }

    const [expenses, total, byCategory] = await Promise.all([
      prisma.expense.findMany({ where, orderBy: { date: 'desc' }, skip, take: limit }),
      prisma.expense.count({ where }),
      prisma.expense.groupBy({ by: ['category'], _sum: { amount: true }, where: dateFrom ? { date: { gte: new Date(dateFrom) } } : undefined }),
    ])

    return successResponse({ expenses, total, page, pages: Math.ceil(total / limit), byCategory })
  } catch (error) {
    return errorResponse('Failed to fetch expenses', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = ExpenseCreateSchema.safeParse(body)
    if (!result.success) return errorResponse(result.error.issues.map((e) => e.message).join(', '))

    const expense = await prisma.$transaction(async (tx) => {
      const newExpense = await tx.expense.create({
        data: {
          category: result.data.category,
          description: result.data.description,
          amount: result.data.amount,
          date: result.data.date ? new Date(result.data.date) : new Date(),
          paymentMethod: result.data.paymentMethod,
          notes: result.data.notes,
        },
      })
      await tx.cashLedger.create({
        data: { type: 'EXPENSE', category: result.data.category, description: result.data.description, amount: result.data.amount, balance: 0, reference: newExpense.id },
      })
      return newExpense
    })

    return successResponse(expense, 'Expense recorded')
  } catch (error) {
    return errorResponse('Failed to create expense', 500)
  }
}
