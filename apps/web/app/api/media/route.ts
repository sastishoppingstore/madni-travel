import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const folder = searchParams.get('folder')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where: any = {}
    if (folder) where.folder = folder

    const [media, total] = await Promise.all([
      prisma.mediaFile.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.mediaFile.count({ where }),
    ])

    return successResponse({ media, total, page, pages: Math.ceil(total / limit) })
  } catch (error) {
    return errorResponse('Failed to fetch media', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const media = await prisma.mediaFile.create({
      data: {
        filename: body.filename,
        originalName: body.originalName,
        mimeType: body.mimeType,
        size: body.size,
        url: body.url,
        folder: body.folder || 'general',
        alt: body.alt,
      },
    })

    return successResponse(media, 'Media uploaded')
  } catch (error) {
    return errorResponse('Failed to upload media', 500)
  }
}
