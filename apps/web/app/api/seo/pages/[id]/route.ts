import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const page = await prisma.sEOPage.findUnique({ where: { id: params.id } })
    if (!page) return errorResponse('Page not found', 404)
    return successResponse(page)
  } catch (error) {
    return errorResponse('Failed to fetch page', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const page = await prisma.sEOPage.update({ where: { id: params.id }, data: body })
    return successResponse(page, 'SEO page updated')
  } catch (error) {
    return errorResponse('Failed to update page', 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    await prisma.sEOPage.delete({ where: { id: params.id } })
    return successResponse(null, 'SEO page deleted')
  } catch (error) {
    return errorResponse('Failed to delete page', 500)
  }
}
