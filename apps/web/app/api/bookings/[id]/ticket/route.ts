import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../../lib/auth'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const { pnr, eTicketNo, ticketUrl } = body

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        pnr: pnr || undefined,
        eTicketNo: eTicketNo || undefined,
        ticketUrl: ticketUrl || undefined,
        status: 'TICKET_ISSUED',
      },
    })

    await prisma.notification.create({
      data: {
        bookingId: params.id,
        type: 'TICKET_UPLOADED',
        title: 'Ticket Issued',
        message: `Your ticket for booking #${booking.bookingNo} has been issued.`,
      },
    })

    return successResponse(booking, 'Ticket info updated')
  } catch (error) {
    return errorResponse('Failed to update ticket', 500)
  }
}
