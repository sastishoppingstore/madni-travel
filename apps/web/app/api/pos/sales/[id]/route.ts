import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const sale = await prisma.pOSSale.findUnique({
      where: { id: params.id },
      include: { staff: { select: { id: true, name: true } } },
    })
    if (!sale) return errorResponse('Sale not found', 404)
    return successResponse(sale)
  } catch (error) {
    return errorResponse('Failed to fetch sale', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const sale = await prisma.pOSSale.update({
      where: { id: params.id },
      data: {
        status: body.status,
        paidAmount: body.paidAmount,
        dueAmount: body.dueAmount,
        notes: body.notes,
      },
    })
    return successResponse(sale, 'Sale updated')
  } catch (error) {
    return errorResponse('Failed to update sale', 500)
  }
}
