import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'
import { POSSaleCreateSchema } from '../../lib/validators'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const staffId = searchParams.get('staffId')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const skip = (page - 1) * limit

    const where: any = {}
    if (staffId) where.staffId = staffId
    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) where.createdAt.gte = new Date(dateFrom)
      if (dateTo) where.createdAt.lte = new Date(dateTo)
    }

    const [sales, total] = await Promise.all([
      prisma.pOSSale.findMany({
        where,
        include: { staff: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.pOSSale.count({ where }),
    ])

    return successResponse({ sales, total, page, pages: Math.ceil(total / limit) })
  } catch (error) {
    return errorResponse('Failed to fetch sales', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = POSSaleCreateSchema.safeParse(body)
    if (!result.success) {
      return errorResponse(result.error.issues.map((e) => e.message).join(', '))
    }

    const data = result.data
    const profit = data.salePrice - data.purchasePrice + data.serviceCharge - data.discount
    const invoiceNo = `INV-${Date.now()}`

    const sale = await prisma.$transaction(async (tx) => {
      const newSale = await tx.pOSSale.create({
        data: {
          invoiceNo,
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          serviceType: data.serviceType,
          serviceDescription: data.serviceDescription,
          purchasePrice: data.purchasePrice,
          salePrice: data.salePrice,
          tax: data.tax,
          serviceCharge: data.serviceCharge,
          discount: data.discount,
          totalAmount: data.totalAmount,
          paidAmount: data.paidAmount,
          dueAmount: data.totalAmount - data.paidAmount,
          profit,
          paymentMethod: data.paymentMethod,
          staffId: data.staffId,
          notes: data.notes,
        },
      })

      if (data.staffId && profit > 0) {
        const staff = await tx.staff.findUnique({ where: { id: data.staffId } })
        if (staff && staff.commissionRate > 0) {
          await tx.commission.create({
            data: {
              staffId: data.staffId,
              saleId: newSale.id,
              amount: profit * (staff.commissionRate / 100),
              description: `Commission on ${invoiceNo}`,
            },
          })
        }
      }

      await tx.cashLedger.create({
        data: {
          type: 'INCOME',
          category: 'POS Sale',
          description: `POS Sale ${invoiceNo} - ${data.serviceDescription || data.serviceType}`,
          amount: data.totalAmount,
          balance: 0,
          reference: invoiceNo,
        },
      })

      return newSale
    })

    return successResponse(sale, 'Sale created successfully')
  } catch (error) {
    console.error('POS sale error:', error)
    return errorResponse('Failed to create sale', 500)
  }
}
