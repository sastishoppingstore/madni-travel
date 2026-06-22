import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const providers = await prisma.flightAPISetting.findMany({ orderBy: { createdAt: 'desc' } })
    return successResponse(providers)
  } catch (error) {
    return errorResponse('Failed to fetch flight API settings', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const provider = await prisma.flightAPISetting.upsert({
      where: { id: body.id || 'new' },
      create: {
        providerName: body.providerName,
        providerType: body.providerType || 'Generic',
        baseUrl: body.baseUrl,
        apiKey: body.apiKey,
        apiSecret: body.apiSecret,
        clientId: body.clientId,
        clientSecret: body.clientSecret,
        sandbox: body.sandbox ?? true,
        isActive: body.isActive ?? false,
        currency: body.currency || 'PKR',
        markupPercent: body.markupPercent || 0,
        fixedServiceFee: body.fixedServiceFee || 0,
        timeout: body.timeout || 30,
      },
      update: {
        providerName: body.providerName,
        providerType: body.providerType,
        baseUrl: body.baseUrl,
        apiKey: body.apiKey,
        apiSecret: body.apiSecret,
        clientId: body.clientId,
        clientSecret: body.clientSecret,
        sandbox: body.sandbox,
        isActive: body.isActive,
        currency: body.currency,
        markupPercent: body.markupPercent,
        fixedServiceFee: body.fixedServiceFee,
        timeout: body.timeout,
      },
    })

    return successResponse(provider, 'Flight API provider saved')
  } catch (error) {
    return errorResponse('Failed to save flight API settings', 500)
  }
}
