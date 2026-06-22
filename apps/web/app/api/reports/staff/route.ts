import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    const where: any = {}
    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) where.createdAt.gte = new Date(dateFrom)
      if (dateTo) where.createdAt.lte = new Date(dateTo)
    }

    const staff = await prisma.staff.findMany({
      where: { status: 'ACTIVE' },
      include: {
        sales: { where, select: { totalAmount: true, profit: true } },
        commissions: { where, select: { amount: true, status: true } },
        salaries: { select: { netSalary: true, paidAmount: true, dueAmount: true, status: true } },
      },
    })

    const report = staff.map(s => ({
      id: s.id, name: s.name, email: s.email, role: s.role, department: s.department,
      totalSales: s.sales.length,
      totalRevenue: s.sales.reduce((sum, sale) => sum + sale.totalAmount, 0),
      totalProfit: s.sales.reduce((sum, sale) => sum + (sale.profit || 0), 0),
      commissionEarned: s.commissions.filter(c => c.status === 'PAID').reduce((sum, c) => sum + c.amount, 0),
      commissionPending: s.commissions.filter(c => c.status === 'PENDING').reduce((sum, c) => sum + c.amount, 0),
      salaryPaid: s.salaries.filter(sal => sal.status === 'PAID').reduce((sum, sal) => sum + sal.paidAmount, 0),
      salaryDue: s.salaries.reduce((sum, sal) => sum + sal.dueAmount, 0),
    }))

    return successResponse(report)
  } catch (error) {
    return errorResponse('Failed to generate staff report', 500)
  }
}
