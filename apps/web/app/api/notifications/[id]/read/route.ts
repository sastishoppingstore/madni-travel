import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { getAuthUser, successResponse, errorResponse, unauthorizedResponse } from '../../../lib/auth'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorizedResponse()

    const notification = await prisma.notification.update({
      where: { id: params.id },
      data: { isRead: true },
    })

    return successResponse(notification, 'Notification marked as read')
  } catch (error) {
    return errorResponse('Failed to update notification', 500)
  }
}
