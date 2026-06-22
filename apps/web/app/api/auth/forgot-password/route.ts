import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { signToken, successResponse, errorResponse } from '../../lib/auth'
import { ForgotPasswordSchema } from '../../lib/validators'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = ForgotPasswordSchema.safeParse(body)

    if (!result.success) {
      return errorResponse(result.error.issues.map((e) => e.message).join(', '))
    }

    const { email } = result.data

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return successResponse(null, 'If an account exists, a reset email has been sent')
    }

    const resetToken = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return successResponse({
      resetToken,
      message: 'Password reset link generated',
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return errorResponse('Failed to process request', 500)
  }
}
