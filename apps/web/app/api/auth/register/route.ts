import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { hashPassword, signToken, successResponse, errorResponse } from '../../lib/auth'
import { RegisterSchema } from '../../lib/validators'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = RegisterSchema.safeParse(body)

    if (!result.success) {
      return errorResponse(result.error.issues.map((e) => e.message).join(', '))
    }

    const { name, email, password, phone } = result.data

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return errorResponse('Email already registered', 409)
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: 'CUSTOMER',
      },
      select: { id: true, email: true, name: true, role: true },
    })

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    })

    return successResponse({ user, token }, 'Registration successful')
  } catch (error) {
    console.error('Registration error:', error)
    return errorResponse('Registration failed', 500)
  }
}
