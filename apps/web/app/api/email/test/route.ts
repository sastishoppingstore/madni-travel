import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const smtp = await prisma.sMTPSetting.findFirst()
    if (!smtp || !smtp.isActive) {
      return errorResponse('SMTP not configured', 400)
    }

    const body = await request.json()
    const testEmail = body.email || smtp.fromEmail

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.encryption === 'ssl',
      auth: { user: smtp.username, pass: smtp.password },
    })

    await transporter.sendMail({
      from: `"${smtp.fromName}" <${smtp.fromEmail}>`,
      to: testEmail,
      subject: 'Test Email - Madni Travel',
      html: '<h2>Test Email</h2><p>This is a test email from Madni Travel system.</p><p>If you received this, your SMTP settings are working correctly.</p>',
    })

    return successResponse({ sent: true }, 'Test email sent')
  } catch (error) {
    console.error('Test email error:', error)
    return errorResponse('Failed to send test email', 500)
  }
}
