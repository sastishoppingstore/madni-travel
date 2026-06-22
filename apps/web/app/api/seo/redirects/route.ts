import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const redirects = await prisma.redirect.findMany({ orderBy: { createdAt: 'desc' } })
    return successResponse(redirects)
  } catch (error) {
    return errorResponse('Failed to fetch redirects', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const redirect = await prisma.redirect.create({
      data: {
        fromPath: body.fromPath,
        toPath: body.toPath,
        type: body.type || '301',
        isActive: body.isActive ?? true,
      },
    })

    return successResponse(redirect, 'Redirect created')
  } catch (error: any) {
    if (error.code === 'P2002') return errorResponse('From path already exists', 409)
    return errorResponse('Failed to create redirect', 500)
  }
}
