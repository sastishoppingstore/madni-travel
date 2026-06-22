import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'
import nodemailer from 'nodemailer'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const settings = await prisma.sMTPSetting.findFirst()
    return successResponse(settings)
  } catch (error) {
    return errorResponse('Failed to fetch SMTP settings', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const settings = await prisma.sMTPSetting.upsert({
      where: { id: body.id || 'default' },
      create: {
        host: body.host,
        port: body.port || 587,
        username: body.username,
        password: body.password,
        encryption: body.encryption || 'tls',
        fromEmail: body.fromEmail,
        fromName: body.fromName,
        replyTo: body.replyTo,
        isActive: body.isActive ?? true,
      },
      update: {
        host: body.host,
        port: body.port,
        username: body.username,
        password: body.password,
        encryption: body.encryption,
        fromEmail: body.fromEmail,
        fromName: body.fromName,
        replyTo: body.replyTo,
        isActive: body.isActive,
      },
    })

    return successResponse(settings, 'SMTP settings saved')
  } catch (error) {
    return errorResponse('Failed to save SMTP settings', 500)
  }
}
