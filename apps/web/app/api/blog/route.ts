import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../lib/auth'
import { BlogPostCreateSchema } from '../lib/validators'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const skip = (page - 1) * limit

    const where: any = { isPublished: true }
    if (category) where.category = category
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({ where, orderBy: { publishedAt: 'desc' }, skip, take: limit }),
      prisma.blogPost.count({ where }),
    ])

    return successResponse({ posts, total, page, pages: Math.ceil(total / limit) })
  } catch (error) {
    return errorResponse('Failed to fetch blog posts', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = BlogPostCreateSchema.safeParse(body)
    if (!result.success) return errorResponse(result.error.issues.map((e) => e.message).join(', '))

    const post = await prisma.blogPost.create({
      data: {
        ...result.data,
        publishedAt: result.data.isPublished ? new Date() : null,
      },
    })

    return successResponse(post, 'Blog post created')
  } catch (error: any) {
    if (error.code === 'P2002') return errorResponse('Slug already exists', 409)
    return errorResponse('Failed to create blog post', 500)
  }
}
