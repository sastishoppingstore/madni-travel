import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'
import { getAuthUser, requireAdmin, successResponse, errorResponse, unauthorizedResponse } from '../lib/auth'
import { BookingCreateSchema } from '../lib/validators'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    if (!user) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const search = searchParams.get('search')
    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (type) where.type = type
    if (search) {
      where.OR = [
        { customerName: { contains: search, mode: 'insensitive' } },
        { customerEmail: { contains: search, mode: 'insensitive' } },
        { customerPhone: { contains: search, mode: 'insensitive' } },
        { bookingNo: { contains: search, mode: 'insensitive' } },
        { pnr: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          flightDetails: true,
          hotelDetails: true,
          packageDetails: { include: { package: true } },
          visaDetails: true,
          payments: true,
          supplier: { select: { id: true, name: true } },
          notifications: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ])

    return successResponse({ bookings, total, page, pages: Math.ceil(total / limit) })
  } catch (error) {
    console.error('List bookings error:', error)
    return errorResponse('Failed to fetch bookings', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const result = BookingCreateSchema.safeParse(body)
    if (!result.success) {
      return errorResponse(result.error.issues.map((e) => e.message).join(', '))
    }

    const data = result.data
    const booking = await prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          userId: user.id,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          type: data.type,
          totalAmount: data.totalAmount,
          dueAmount: data.totalAmount,
          adultCount: data.adultCount,
          childCount: data.childCount,
          infantCount: data.infantCount,
          travelDate: data.travelDate ? new Date(data.travelDate) : undefined,
          returnDate: data.returnDate ? new Date(data.returnDate) : undefined,
          notes: data.notes,
          supplierId: data.supplierId,
        },
      })

      if (data.type === 'FLIGHT' && data.flightDetails) {
        await tx.flightBookingDetail.create({
          data: {
            bookingId: newBooking.id,
            airline: data.flightDetails.airline,
            flightNo: data.flightDetails.flightNo,
            fromAirport: data.flightDetails.fromAirport,
            toAirport: data.flightDetails.toAirport,
            fromCity: data.flightDetails.fromCity,
            toCity: data.flightDetails.toCity,
            departureDate: new Date(data.flightDetails.departureDate),
            arrivalDate: data.flightDetails.arrivalDate ? new Date(data.flightDetails.arrivalDate) : null,
            classType: data.flightDetails.classType,
            tripType: data.flightDetails.tripType,
            baseFare: data.flightDetails.baseFare,
            taxes: data.flightDetails.taxes,
            serviceFee: data.flightDetails.serviceFee,
            passengers: data.flightDetails.passengers,
          },
        })
      }

      if (data.type === 'HOTEL' && data.hotelDetails) {
        await tx.hotelBookingDetail.create({
          data: {
            bookingId: newBooking.id,
            hotelName: data.hotelDetails.hotelName,
            city: data.hotelDetails.city,
            checkIn: new Date(data.hotelDetails.checkIn),
            checkOut: new Date(data.hotelDetails.checkOut),
            roomType: data.hotelDetails.roomType,
            roomCount: data.hotelDetails.roomCount,
            nightCount: data.hotelDetails.nightCount,
          },
        })
      }

      if (data.type === 'PACKAGE' && data.packageDetails) {
        await tx.packageBookingDetail.create({
          data: {
            bookingId: newBooking.id,
            packageId: data.packageDetails.packageId,
            packageName: data.packageDetails.packageName,
            destination: data.packageDetails.destination,
            duration: data.packageDetails.duration,
          },
        })
      }

      if (data.type === 'VISA' && data.visaDetails) {
        await tx.visaBookingDetail.create({
          data: {
            bookingId: newBooking.id,
            visaTypeId: data.visaDetails.visaTypeId,
            country: data.visaDetails.country,
            visaTypeName: data.visaDetails.visaTypeName,
            processingTime: data.visaDetails.processingTime,
            passportNo: data.visaDetails.passportNo,
          },
        })
      }

      return newBooking
    })

    return successResponse(booking, 'Booking created successfully')
  } catch (error) {
    console.error('Create booking error:', error)
    return errorResponse('Failed to create booking', 500)
  }
}
