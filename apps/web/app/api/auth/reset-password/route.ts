import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { verifyToken, hashPassword, successResponse, errorResponse } from '../../lib/auth'
import { ResetPasswordSchema } from '../../lib/validators'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = ResetPasswordSchema.safeParse(body)

    if (!result.success) {
      return errorResponse(result.error.issues.map((e) => e.message).join(', '))
    }

    const { token, password } = result.data

    const payload = verifyToken(token)
    if (!payload) {
      return errorResponse('Invalid or expired token', 400)
    }

    const hashedPassword = await hashPassword(password)

    await prisma.user.update({
      where: { id: payload.userId },
      data: { password: hashedPassword },
    })

    return successResponse(null, 'Password reset successfully')
  } catch (error) {
    console.error('Reset password error:', error)
    return errorResponse('Failed to reset password', 500)
  }
}
