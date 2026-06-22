import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../lib/auth'
import { CashLedgerCreateSchema } from '../lib/validators'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const type = searchParams.get('type')
    const skip = (page - 1) * limit

    const where: any = {}
    if (type) where.type = type

    const [entries, total] = await Promise.all([
      prisma.cashLedger.findMany({ where, orderBy: { date: 'desc' }, skip, take: limit }),
      prisma.cashLedger.count({ where }),
    ])

    return successResponse({ entries, total, page, pages: Math.ceil(total / limit) })
  } catch (error) {
    return errorResponse('Failed to fetch cash ledger', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = CashLedgerCreateSchema.safeParse(body)
    if (!result.success) return errorResponse(result.error.issues.map((e) => e.message).join(', '))

    const data = result.data

    // Calculate balance
    const lastEntry = await prisma.cashLedger.findFirst({ orderBy: { createdAt: 'desc' } })
    const currentBalance = lastEntry?.balance || 0
    const newBalance = data.type === 'INCOME' ? currentBalance + data.amount : currentBalance - data.amount

    const entry = await prisma.cashLedger.create({
      data: {
        type: data.type,
        category: data.category,
        description: data.description,
        amount: data.amount,
        balance: newBalance,
        reference: data.reference,
      },
    })

    return successResponse(entry, 'Cash ledger entry created')
  } catch (error) {
    return errorResponse('Failed to create entry', 500)
  }
}
