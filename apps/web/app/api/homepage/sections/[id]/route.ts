import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const section = await prisma.homepageSection.findUnique({ where: { id: params.id } })
    if (!section) return errorResponse('Section not found', 404)
    return successResponse(section)
  } catch (error) {
    return errorResponse('Failed to fetch section', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const section = await prisma.homepageSection.update({
      where: { id: params.id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        coverImage: body.coverImage,
        buttonText: body.buttonText,
        buttonLink: body.buttonLink,
        bgColor: body.bgColor,
        textColor: body.textColor,
        sortOrder: body.sortOrder,
        isVisible: body.isVisible,
        is3D: body.is3D,
        metaData: body.metaData,
      },
    })
    return successResponse(section, 'Section updated')
  } catch (error) {
    return errorResponse('Failed to update section', 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    await prisma.homepageSection.delete({ where: { id: params.id } })
    return successResponse(null, 'Section deleted')
  } catch (error) {
    return errorResponse('Failed to delete section', 500)
  }
}
