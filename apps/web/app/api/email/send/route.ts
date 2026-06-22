import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'
import { EmailSendSchema } from '../../lib/validators'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = EmailSendSchema.safeParse(body)
    if (!result.success) return errorResponse(result.error.issues.map((e) => e.message).join(', '))

    const { to, subject, body: emailBody, templateName, variables } = result.data

    const smtp = await prisma.sMTPSetting.findFirst()
    if (!smtp || !smtp.isActive) {
      return errorResponse('SMTP not configured', 400)
    }

    let finalBody = emailBody
    if (templateName) {
      const template = await prisma.emailTemplate.findUnique({ where: { name: templateName } })
      if (template) {
        finalBody = template.body
        if (variables) {
          Object.entries(variables).forEach(([key, value]) => {
            finalBody = finalBody.replace(new RegExp(`{{${key}}}`, 'g'), String(value))
          })
        }
      }
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.encryption === 'ssl',
      auth: { user: smtp.username, pass: smtp.password },
    })

    await transporter.sendMail({
      from: `"${smtp.fromName}" <${smtp.fromEmail}>`,
      to,
      subject,
      html: finalBody,
      replyTo: smtp.replyTo || smtp.fromEmail,
    })

    return successResponse({ sent: true }, 'Email sent successfully')
  } catch (error) {
    console.error('Email send error:', error)
    return errorResponse('Failed to send email', 500)
  }
}
