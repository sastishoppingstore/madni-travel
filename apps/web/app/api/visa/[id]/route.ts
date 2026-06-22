import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const visa = await prisma.visaService.findUnique({ where: { id: params.id } })
    if (!visa) return errorResponse('Visa service not found', 404)
    return successResponse(visa)
  } catch (error) {
    return errorResponse('Failed to fetch visa', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const visa = await prisma.visaService.update({
      where: { id: params.id },
      data: body,
    })
    return successResponse(visa, 'Visa service updated')
  } catch (error) {
    return errorResponse('Failed to update visa', 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    await prisma.visaService.delete({ where: { id: params.id } })
    return successResponse(null, 'Visa service deleted')
  } catch (error) {
    return errorResponse('Failed to delete visa', 500)
  }
}
