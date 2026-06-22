import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        flightDetails: true,
        hotelDetails: true,
        packageDetails: { include: { package: true } },
        visaDetails: true,
        busDetails: true,
        umrahDetails: { include: { package: true } },
        payments: true,
        supplier: true,
        notifications: true,
      },
    })

    if (!booking) return errorResponse('Booking not found', 404)
    return successResponse(booking)
  } catch (error) {
    return errorResponse('Failed to fetch booking', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        totalAmount: body.totalAmount,
        adultCount: body.adultCount,
        childCount: body.childCount,
        infantCount: body.infantCount,
        travelDate: body.travelDate ? new Date(body.travelDate) : undefined,
        returnDate: body.returnDate ? new Date(body.returnDate) : undefined,
        notes: body.notes,
        internalNotes: body.internalNotes,
        supplierId: body.supplierId,
      },
      include: {
        flightDetails: true,
        hotelDetails: true,
        payments: true,
      },
    })

    return successResponse(booking, 'Booking updated successfully')
  } catch (error) {
    return errorResponse('Failed to update booking', 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    await prisma.booking.delete({ where: { id: params.id } })
    return successResponse(null, 'Booking deleted successfully')
  } catch (error) {
    return errorResponse('Failed to delete booking', 500)
  }
}
