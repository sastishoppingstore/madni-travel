import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { getAuthUser, successResponse, errorResponse, unauthorizedResponse } from '../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const { flight, passengers, contactInfo } = body

    const totalAmount = flight.price.total * (passengers?.length || 1)

    const booking = await prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          userId: user.id,
          customerName: contactInfo?.name || user.name || 'Guest',
          customerEmail: contactInfo?.email || user.email,
          customerPhone: contactInfo?.phone || '',
          type: 'FLIGHT',
          status: 'PENDING_PAYMENT',
          totalAmount,
          dueAmount: totalAmount,
          adultCount: passengers?.filter((p: any) => p.type === 'ADULT')?.length || 1,
          childCount: passengers?.filter((p: any) => p.type === 'CHILD')?.length || 0,
          infantCount: passengers?.filter((p: any) => p.type === 'INFANT')?.length || 0,
          travelDate: new Date(flight.departureDate),
          returnDate: flight.arrivalDate ? new Date(flight.arrivalDate) : null,
        },
      })

      await tx.flightBookingDetail.create({
        data: {
          bookingId: newBooking.id,
          airline: flight.airline?.name,
          flightNo: flight.flightNo,
          fromAirport: flight.from,
          toAirport: flight.to,
          fromCity: flight.from,
          toCity: flight.to,
          departureDate: new Date(flight.departureDate),
          arrivalDate: flight.arrivalDate ? new Date(flight.arrivalDate) : null,
          classType: flight.class || 'ECONOMY',
          tripType: flight.returnDate ? 'ROUND_TRIP' : 'ONE_WAY',
          baseFare: flight.price?.baseFare || 0,
          taxes: flight.price?.taxes || 0,
          serviceFee: flight.price?.serviceFee || 0,
          passengers: passengers ? JSON.stringify(passengers) : null,
        },
      })

      return newBooking
    })

    return successResponse({ booking, redirectUrl: `/payment/${booking.id}` }, 'Flight booked successfully')
  } catch (error) {
    console.error('Flight book error:', error)
    return errorResponse('Failed to book flight', 500)
  }
}
