import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const gateways = await prisma.paymentGatewaySetting.findMany({ orderBy: { sortOrder: 'asc' } })
    return successResponse(gateways)
  } catch (error) {
    return errorResponse('Failed to fetch payment gateways', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const gateway = await prisma.paymentGatewaySetting.upsert({
      where: { id: body.id || 'new' },
      create: {
        name: body.name,
        displayName: body.displayName,
        gatewayType: body.gatewayType,
        isActive: body.isActive ?? false,
        sandbox: body.sandbox ?? true,
        merchantId: body.merchantId,
        storeId: body.storeId,
        username: body.username,
        password: body.password,
        publicKey: body.publicKey,
        privateKey: body.privateKey,
        secretKey: body.secretKey,
        webhookSecret: body.webhookSecret,
        callbackUrl: body.callbackUrl,
        successUrl: body.successUrl,
        failedUrl: body.failedUrl,
        currency: body.currency || 'PKR',
        extraFee: body.extraFee || 0,
        instructions: body.instructions,
        logo: body.logo,
        sortOrder: body.sortOrder || 0,
      },
      update: {
        name: body.name,
        displayName: body.displayName,
        gatewayType: body.gatewayType,
        isActive: body.isActive,
        sandbox: body.sandbox,
        merchantId: body.merchantId,
        storeId: body.storeId,
        username: body.username,
        password: body.password,
        publicKey: body.publicKey,
        privateKey: body.privateKey,
        secretKey: body.secretKey,
        webhookSecret: body.webhookSecret,
        callbackUrl: body.callbackUrl,
        successUrl: body.successUrl,
        failedUrl: body.failedUrl,
        currency: body.currency,
        extraFee: body.extraFee,
        instructions: body.instructions,
        logo: body.logo,
        sortOrder: body.sortOrder,
      },
    })

    return successResponse(gateway, 'Payment gateway saved')
  } catch (error) {
    return errorResponse('Failed to save payment gateway', 500)
  }
}
