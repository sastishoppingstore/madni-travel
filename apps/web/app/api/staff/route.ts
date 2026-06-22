import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../lib/auth'
import { StaffCreateSchema } from '../lib/validators'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const role = searchParams.get('role')
    const search = searchParams.get('search')

    const where: any = {}
    if (status) where.status = status
    if (role) where.role = role
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    const staff = await prisma.staff.findMany({
      where,
      include: {
        _count: { select: { sales: true, salaries: true, commissions: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return successResponse(staff)
  } catch (error) {
    return errorResponse('Failed to fetch staff', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = StaffCreateSchema.safeParse(body)
    if (!result.success) {
      return errorResponse(result.error.issues.map((e) => e.message).join(', '))
    }

    const data = result.data
    const staff = await prisma.staff.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        department: data.department,
        salary: data.salary,
        commissionRate: data.commissionRate,
        joinDate: data.joinDate ? new Date(data.joinDate) : new Date(),
        notes: data.notes,
      },
    })

    return successResponse(staff, 'Staff member created')
  } catch (error: any) {
    if (error.code === 'P2002') {
      return errorResponse('Email already exists', 409)
    }
    return errorResponse('Failed to create staff', 500)
  }
}
