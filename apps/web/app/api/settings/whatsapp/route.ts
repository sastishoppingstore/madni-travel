import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const settings = await prisma.whatsAppSetting.findFirst()
    return successResponse(settings)
  } catch (error) {
    return errorResponse('Failed to fetch WhatsApp settings', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const settings = await prisma.whatsAppSetting.upsert({
      where: { id: body.id || 'default' },
      create: {
        provider: body.provider || 'meta',
        apiBaseUrl: body.apiBaseUrl || 'https://graph.facebook.com/v18.0',
        accessToken: body.accessToken,
        phoneNumberId: body.phoneNumberId,
        businessAccountId: body.businessAccountId,
        templateName: body.templateName || 'madni_travel_',
        languageCode: body.languageCode || 'en',
        fallbackLink: body.fallbackLink,
        isActive: body.isActive ?? false,
      },
      update: {
        provider: body.provider,
        apiBaseUrl: body.apiBaseUrl,
        accessToken: body.accessToken,
        phoneNumberId: body.phoneNumberId,
        businessAccountId: body.businessAccountId,
        templateName: body.templateName,
        languageCode: body.languageCode,
        fallbackLink: body.fallbackLink,
        isActive: body.isActive,
      },
    })

    return successResponse(settings, 'WhatsApp settings saved')
  } catch (error) {
    return errorResponse('Failed to save WhatsApp settings', 500)
  }
}
