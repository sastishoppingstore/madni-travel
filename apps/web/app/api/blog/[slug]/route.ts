import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } })
    if (!post) return errorResponse('Post not found', 404)

    await prisma.blogPost.update({
      where: { slug: params.slug },
      data: { views: { increment: 1 } },
    })

    return successResponse(post)
  } catch (error) {
    return errorResponse('Failed to fetch post', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const post = await prisma.blogPost.update({
      where: { slug: params.slug },
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        author: body.author,
        category: body.category,
        tags: body.tags,
        isPublished: body.isPublished,
        seoTitle: body.seoTitle,
        seoDesc: body.seoDesc,
      },
    })

    return successResponse(post, 'Blog post updated')
  } catch (error: any) {
    if (error.code === 'P2002') return errorResponse('Slug already exists', 409)
    return errorResponse('Failed to update post', 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    await prisma.blogPost.delete({ where: { slug: params.slug } })
    return successResponse(null, 'Blog post deleted')
  } catch (error) {
    return errorResponse('Failed to delete post', 500)
  }
}
