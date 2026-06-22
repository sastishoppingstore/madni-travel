import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const templates = await prisma.emailTemplate.findMany({ orderBy: { createdAt: 'desc' } })
    return successResponse(templates)
  } catch (error) {
    return errorResponse('Failed to fetch email templates', 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const template = await prisma.emailTemplate.upsert({
      where: { name: body.name },
      create: {
        name: body.name,
        subject: body.subject,
        body: body.body,
        isActive: body.isActive ?? true,
      },
      update: {
        subject: body.subject,
        body: body.body,
        isActive: body.isActive,
      },
    })

    return successResponse(template, 'Template saved')
  } catch (error) {
    return errorResponse('Failed to save template', 500)
  }
}
