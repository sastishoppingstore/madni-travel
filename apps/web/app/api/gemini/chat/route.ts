import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { successResponse, errorResponse } from '../../lib/auth'
import { GeminiChatSchema } from '../../lib/validators'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = GeminiChatSchema.safeParse(body)
    if (!result.success) return errorResponse(result.error.issues.map((e) => e.message).join(', '))

    const { message } = result.data
    const settings = await prisma.geminiSetting.findFirst()

    if (!settings?.apiKey) {
      return successResponse({
        reply: "I'm sorry, the AI service is not configured yet. Please contact support.",
        fallback: true,
      })
    }

    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const genAI = new GoogleGenerativeAI(settings.apiKey)
      const model = genAI.getGenerativeModel({ model: settings.modelName || 'gemini-pro' })

      const chat = model.startChat({
        history: [],
        generationConfig: {
          temperature: settings.temperature || 0.7,
          maxOutputTokens: settings.maxTokens || 2048,
        },
      })

      if (settings.systemPrompt) {
        await chat.sendMessage(settings.systemPrompt)
      }

      const response = await chat.sendMessage(message)
      const reply = response.response.text()

      return successResponse({ reply, fallback: false })
    } catch (aiError) {
      console.error('Gemini API error:', aiError)
      return successResponse({
        reply: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        fallback: true,
      })
    }
  } catch (error) {
    return errorResponse('Chat failed', 500)
  }
}
