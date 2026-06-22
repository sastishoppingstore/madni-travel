import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../../lib/auth'
import { SalaryCreateSchema } from '../../../lib/validators'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const salaries = await prisma.salary.findMany({
      where: { staffId: params.id },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    })
    return successResponse(salaries)
  } catch (error) {
    return errorResponse('Failed to fetch salaries', 500)
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = SalaryCreateSchema.safeParse(body)
    if (!result.success) {
      return errorResponse(result.error.issues.map((e) => e.message).join(', '))
    }

    const data = result.data
    const netSalary = data.basicSalary + data.allowances + data.bonus - data.deductions

    const salary = await prisma.salary.create({
      data: {
        staffId: params.id,
        month: data.month,
        year: data.year,
        basicSalary: data.basicSalary,
        allowances: data.allowances,
        deductions: data.deductions,
        bonus: data.bonus,
        netSalary,
        dueAmount: netSalary,
        notes: data.notes,
      },
    })

    return successResponse(salary, 'Salary record created')
  } catch (error: any) {
    if (error.code === 'P2002') return errorResponse('Salary record for this month already exists', 409)
    return errorResponse('Failed to create salary', 500)
  }
}
