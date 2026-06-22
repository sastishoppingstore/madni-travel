import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const supplier = await prisma.supplier.findUnique({
      where: { id: params.id },
      include: {
        bookings: { orderBy: { createdAt: 'desc' }, take: 10 },
        payments: { orderBy: { createdAt: 'desc' }, take: 10 },
      },
    })
    if (!supplier) return errorResponse('Supplier not found', 404)
    return successResponse(supplier)
  } catch (error) {
    return errorResponse('Failed to fetch supplier', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const supplier = await prisma.supplier.update({
      where: { id: params.id },
      data: body,
    })
    return successResponse(supplier, 'Supplier updated')
  } catch (error) {
    return errorResponse('Failed to update supplier', 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    await prisma.supplier.delete({ where: { id: params.id } })
    return successResponse(null, 'Supplier deleted')
  } catch (error) {
    return errorResponse('Failed to delete supplier', 500)
  }
}
