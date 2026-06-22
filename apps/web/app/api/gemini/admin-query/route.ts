import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const { query } = body

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [bookingsCount, totalRevenue, posSales, expenses, staffCount] = await Promise.all([
      prisma.booking.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.booking.aggregate({ _sum: { paidAmount: true }, where: { createdAt: { gte: startOfMonth } } }),
      prisma.pOSSale.aggregate({ _sum: { totalAmount: true, profit: true }, where: { createdAt: { gte: startOfMonth } } }),
      prisma.expense.aggregate({ _sum: { amount: true }, where: { date: { gte: startOfMonth } } }),
      prisma.staff.count({ where: { status: 'ACTIVE' } }),
    ])

    const revenue = (totalRevenue._sum.paidAmount || 0) + (posSales._sum.totalAmount || 0)
    const profit = (posSales._sum.profit || 0)
    const totalExpenses = expenses._sum.amount || 0

    let response = ''
    const q = query.toLowerCase()

    if (q.includes('sale') || q.includes('revenue') || q.includes('income')) {
      response = `This month we have PKR ${revenue.toLocaleString()} in total revenue from ${bookingsCount} bookings and PKR ${(posSales._sum.totalAmount || 0).toLocaleString()} in POS sales.`
    } else if (q.includes('profit') || q.includes('earn')) {
      response = `This month's gross profit is PKR ${profit.toLocaleString()} from POS sales. Total revenue is PKR ${revenue.toLocaleString()} with expenses of PKR ${totalExpenses.toLocaleString()}.`
    } else if (q.includes('booking') || q.includes('reservation')) {
      response = `We have ${bookingsCount} bookings this month with PKR ${(totalRevenue._sum.paidAmount || 0).toLocaleString()} in booking revenue.`
    } else if (q.includes('staff') || q.includes('employee')) {
      response = `We currently have ${staffCount} active staff members.`
    } else if (q.includes('expense') || q.includes('cost')) {
      response = `This month's expenses total PKR ${totalExpenses.toLocaleString()}.`
    } else {
      response = `Here's a quick summary: ${bookingsCount} bookings this month, PKR ${revenue.toLocaleString()} total revenue, PKR ${profit.toLocaleString()} profit, PKR ${totalExpenses.toLocaleString()} expenses, and ${staffCount} active staff members.`
    }

    const settings = await prisma.geminiSetting.findFirst()
    if (settings?.apiKey) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai')
        const genAI = new GoogleGenerativeAI(settings.apiKey)
        const model = genAI.getGenerativeModel({ model: settings.modelName || 'gemini-pro' })

        const context = `You are Madni Travel's AI assistant. Here is the current business data for this month:
- Bookings: ${bookingsCount}
- Revenue: PKR ${revenue.toLocaleString()}
- POS Profit: PKR ${profit.toLocaleString()}
- Expenses: PKR ${totalExpenses.toLocaleString()}
- Active Staff: ${staffCount}

User query: ${query}

Provide a helpful response based on this data.`

        const aiResponse = await model.generateContent(context)
        response = aiResponse.response.text()
      } catch (aiError) {
        console.error('Gemini admin query error:', aiError)
      }
    }

    return successResponse({ reply: response, data: { bookingsCount, revenue, profit, totalExpenses, staffCount } })
  } catch (error) {
    return errorResponse('Admin query failed', 500)
  }
}
