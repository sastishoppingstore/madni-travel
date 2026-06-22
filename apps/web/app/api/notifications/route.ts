import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { getAuthUser, requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../lib/auth'
import { NotificationCreateSchema } from '../lib/validators'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const isRead = searchParams.get('isRead')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: any = {}
    if (user.role === 'CUSTOMER') {
      where.userId = user.id
    }
    if (isRead !== null) where.isRead = isRead === 'true'

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    const unreadCount = await prisma.notification.count({
      where: { ...(user.role === 'CUSTOMER' ? { userId: user.id } : {}), isRead: false },
    })

    return successResponse({ notifications, unreadCount })
  } catch (error) {
    return errorResponse('Failed to fetch notifications', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = NotificationCreateSchema.safeParse(body)
    if (!result.success) return errorResponse(result.error.issues.map((e) => e.message).join(', '))

    const notification = await prisma.notification.create({
      data: result.data,
    })

    return successResponse(notification, 'Notification created')
  } catch (error) {
    return errorResponse('Failed to create notification', 500)
  }
}
