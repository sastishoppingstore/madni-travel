import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../../lib/auth'
import { CommissionCreateSchema } from '../../../lib/validators'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const commissions = await prisma.commission.findMany({
      where: { staffId: params.id },
      orderBy: { createdAt: 'desc' },
    })
    return successResponse(commissions)
  } catch (error) {
    return errorResponse('Failed to fetch commissions', 500)
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = CommissionCreateSchema.safeParse(body)
    if (!result.success) {
      return errorResponse(result.error.issues.map((e) => e.message).join(', '))
    }

    const commission = await prisma.commission.create({
      data: {
        staffId: params.id,
        amount: result.data.amount,
        description: result.data.description,
        saleId: result.data.saleId,
      },
    })

    return successResponse(commission, 'Commission record created')
  } catch (error) {
    return errorResponse('Failed to create commission', 500)
  }
}
