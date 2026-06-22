import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const pkg = await prisma.umrahPackage.findUnique({ where: { id: params.id } })
    if (!pkg) return errorResponse('Package not found', 404)
    return successResponse(pkg)
  } catch (error) {
    return errorResponse('Failed to fetch package', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const pkg = await prisma.umrahPackage.update({
      where: { id: params.id },
      data: body,
    })
    return successResponse(pkg, 'Umrah package updated')
  } catch (error) {
    return errorResponse('Failed to update', 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    await prisma.umrahPackage.delete({ where: { id: params.id } })
    return successResponse(null, 'Umrah package deleted')
  } catch (error) {
    return errorResponse('Failed to delete', 500)
  }
}
