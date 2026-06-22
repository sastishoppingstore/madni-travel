import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'
import { WhatsAppMessageSchema } from '../../lib/validators'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = WhatsAppMessageSchema.safeParse(body)
    if (!result.success) return errorResponse(result.error.issues.map((e) => e.message).join(', '))

    const { phone, message, templateName } = result.data
    const settings = await prisma.whatsAppSetting.findFirst()

    if (!settings || !settings.isActive) {
      return errorResponse('WhatsApp is not configured', 400)
    }

    if (settings.accessToken && settings.phoneNumberId) {
      try {
        const url = `${settings.apiBaseUrl}/${settings.phoneNumberId}/messages`
        const payload = templateName
          ? { messaging_product: 'whatsapp', to: phone, type: 'template', template: { name: templateName, language: { code: settings.languageCode || 'en' } } }
          : { messaging_product: 'whatsapp', to: phone, type: 'text', text: { body: message } }

        const response = await fetch(url, {
          method: 'POST',
          headers: { Authorization: `Bearer ${settings.accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          const data = await response.json()
          return successResponse({ sent: true, messageId: data.messages?.[0]?.id }, 'WhatsApp message sent')
        }
      } catch (apiError) {
        console.error('WhatsApp API error:', apiError)
      }
    }

    // Fallback to wa.me link
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    return successResponse({ sent: false, fallbackLink: waLink, message: 'WhatsApp API failed, use fallback link' })
  } catch (error) {
    return errorResponse('Failed to send WhatsApp message', 500)
  }
}
