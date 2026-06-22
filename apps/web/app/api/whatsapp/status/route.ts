import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const settings = await prisma.whatsAppSetting.findFirst()
    return successResponse({
      configured: !!settings?.accessToken && !!settings?.phoneNumberId,
      active: settings?.isActive ?? false,
      provider: settings?.provider || 'meta',
      phoneNumberId: settings?.phoneNumberId || null,
    })
  } catch (error) {
    return successResponse({ configured: false, active: false })
  }
}
