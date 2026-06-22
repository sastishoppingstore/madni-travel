import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { comparePassword, signToken, successResponse, errorResponse } from '../../lib/auth'
import { LoginSchema } from '../../lib/validators'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = LoginSchema.safeParse(body)

    if (!result.success) {
      return errorResponse(result.error.issues.map((e) => e.message).join(', '))
    }

    const { email, password } = result.data

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !user.password) {
      return errorResponse('Invalid email or password', 401)
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return errorResponse('Invalid email or password', 401)
    }

    if (user.status === 'INACTIVE' || user.status === 'SUSPENDED') {
      return errorResponse('Account is inactive or suspended', 403)
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    })

    return successResponse({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
      },
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    return errorResponse('Login failed', 500)
  }
}
