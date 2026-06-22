import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../../lib/auth'
import { BookingStatusUpdateSchema } from '../../../lib/validators'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = BookingStatusUpdateSchema.safeParse(body)
    if (!result.success) {
      return errorResponse(result.error.issues.map((e) => e.message).join(', '))
    }

    const { status, pnr, eTicketNo, ticketUrl, internalNotes } = result.data

    const updateData: any = { status }
    if (pnr !== undefined) updateData.pnr = pnr
    if (eTicketNo !== undefined) updateData.eTicketNo = eTicketNo
    if (ticketUrl !== undefined) updateData.ticketUrl = ticketUrl
    if (internalNotes !== undefined) updateData.internalNotes = internalNotes

    if (status === 'CONFIRMED') updateData.paymentStatus = 'PAID'
    if (status === 'PAID_PENDING_CONFIRMATION') updateData.paymentStatus = 'PAID'

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: updateData,
    })

    await prisma.notification.create({
      data: {
        bookingId: params.id,
        type: status === 'TICKET_ISSUED' ? 'TICKET_UPLOADED' : 'TICKET_CONFIRMED',
        title: `Booking ${status}`,
        message: `Your booking #${booking.bookingNo} status has been updated to ${status}.`,
      },
    })

    return successResponse(booking, 'Status updated successfully')
  } catch (error) {
    return errorResponse('Failed to update status', 500)
  }
}
