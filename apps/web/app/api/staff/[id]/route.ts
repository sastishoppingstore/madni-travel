import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const staff = await prisma.staff.findUnique({
      where: { id: params.id },
      include: {
        sales: { orderBy: { createdAt: 'desc' }, take: 10 },
        salaries: { orderBy: { createdAt: 'desc' }, take: 12 },
        commissions: { orderBy: { createdAt: 'desc' }, take: 10 },
        _count: { select: { sales: true, salaries: true, commissions: true } },
      },
    })

    if (!staff) return errorResponse('Staff not found', 404)
    return successResponse(staff)
  } catch (error) {
    return errorResponse('Failed to fetch staff', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const staff = await prisma.staff.update({
      where: { id: params.id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        role: body.role,
        department: body.department,
        salary: body.salary,
        commissionRate: body.commissionRate,
        status: body.status,
        notes: body.notes,
      },
    })

    return successResponse(staff, 'Staff updated')
  } catch (error: any) {
    if (error.code === 'P2002') return errorResponse('Email already exists', 409)
    return errorResponse('Failed to update staff', 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    await prisma.staff.update({
      where: { id: params.id },
      data: { status: 'TERMINATED' },
    })
    return successResponse(null, 'Staff member terminated')
  } catch (error) {
    return errorResponse('Failed to delete staff', 500)
  }
}
