import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    await prisma.mediaFile.delete({ where: { id: params.id } })
    return successResponse(null, 'Media deleted')
  } catch (error) {
    return errorResponse('Failed to delete media', 500)
  }
}
