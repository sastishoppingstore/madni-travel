import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const settings = await prisma.geminiSetting.findFirst()
    return successResponse(settings)
  } catch (error) {
    return errorResponse('Failed to fetch Gemini settings', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const settings = await prisma.geminiSetting.upsert({
      where: { id: body.id || 'default' },
      create: {
        apiKey: body.apiKey,
        modelName: body.modelName || 'gemini-pro',
        temperature: body.temperature || 0.7,
        systemPrompt: body.systemPrompt,
        greeting: body.greeting || "Assalamualaikum! I'm your Madni Travel AI assistant.",
        maxTokens: body.maxTokens || 2048,
        isActive: body.isActive ?? false,
      },
      update: {
        apiKey: body.apiKey,
        modelName: body.modelName,
        temperature: body.temperature,
        systemPrompt: body.systemPrompt,
        greeting: body.greeting,
        maxTokens: body.maxTokens,
        isActive: body.isActive,
      },
    })

    return successResponse(settings, 'Gemini settings saved')
  } catch (error) {
    return errorResponse('Failed to save Gemini settings', 500)
  }
}
