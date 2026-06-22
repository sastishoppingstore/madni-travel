import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const settings = await prisma.companySetting.findMany({ orderBy: { category: 'asc' } })
    return successResponse(settings)
  } catch (error) {
    return errorResponse('Failed to fetch company settings', 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const { settings } = body

    await prisma.$transaction(
      settings.map((s: any) =>
        prisma.companySetting.upsert({
          where: { key: s.key },
          create: { key: s.key, value: s.value, category: s.category || 'GENERAL', label: s.label },
          update: { value: s.value, category: s.category || 'GENERAL', label: s.label },
        })
      )
    )

    return successResponse(null, 'Settings updated')
  } catch (error) {
    return errorResponse('Failed to update settings', 500)
  }
}
