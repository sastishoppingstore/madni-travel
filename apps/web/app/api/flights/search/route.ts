import { NextRequest } from 'next/server'
import { successResponse, errorResponse } from '../../lib/auth'
import { FlightSearchSchema } from '../../lib/validators'

const AIRLINES = [
  { code: 'PK', name: 'Pakistan International Airlines', logo: '/airlines/pia.png' },
  { code: 'EK', name: 'Emirates', logo: '/airlines/emirates.png' },
  { code: 'QR', name: 'Qatar Airways', logo: '/airlines/qatar.png' },
  { code: 'EY', name: 'Etihad Airways', logo: '/airlines/etihad.png' },
  { code: 'SV', name: 'Saudia', logo: '/airlines/saudia.png' },
  { code: 'TK', name: 'Turkish Airlines', logo: '/airlines/turkish.png' },
  { code: 'GF', name: 'Gulf Air', logo: '/airlines/gulfair.png' },
  { code: 'WY', name: 'Oman Air', logo: '/airlines/oman.png' },
  { code: 'FZ', name: 'FlyDubai', logo: '/airlines/flydubai.png' },
  { code: 'G9', name: 'Air Arabia', logo: '/airlines/airarabia.png' },
]

function generateMockFlights(params: any) {
  const flights = []
  const airlines = AIRLINES.filter(() => Math.random() > 0.3)

  for (const airline of airlines) {
    const basePrice = Math.floor(Math.random() * 50000) + 25000
    const stops = Math.random() > 0.6 ? 0 : Math.random() > 0.5 ? 1 : 2

    const depHour = Math.floor(Math.random() * 24)
    const depMin = Math.floor(Math.random() * 60)
    const depTime = `${String(depHour).padStart(2, '0')}:${String(depMin).padStart(2, '0')}`

    const durationHours = Math.floor(Math.random() * 8) + 3
    const arrHour = (depHour + durationHours) % 24
    const arrMin = Math.floor(Math.random() * 60)
    const arrTime = `${String(arrHour).padStart(2, '0')}:${String(arrMin).padStart(2, '0')}`

    const tax = Math.floor(basePrice * 0.15)
    const fee = Math.floor(basePrice * 0.05)

    flights.push({
      id: `${airline.code}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      airline,
      flightNo: `${airline.code}${Math.floor(Math.random() * 900) + 100}`,
      from: params.from,
      to: params.to,
      departureDate: params.departureDate,
      departureTime: depTime,
      arrivalDate: params.returnDate || params.departureDate,
      arrivalTime: arrTime,
      duration: `${durationHours}h ${Math.floor(Math.random() * 60)}m`,
      stops,
      stopCities: stops > 0 ? ['DXB', 'DOH', 'AUH'].slice(0, stops) : [],
      class: params.class || 'ECONOMY',
      price: {
        baseFare: basePrice,
        taxes: tax,
        serviceFee: fee,
        total: basePrice + tax + fee,
        currency: 'PKR',
      },
      seatsAvailable: Math.floor(Math.random() * 20) + 1,
      aircraft: ['Boeing 777', 'Airbus A380', 'Boeing 787', 'Airbus A320'][Math.floor(Math.random() * 4)],
      refundable: Math.random() > 0.3,
    })
  }

  return flights.sort((a, b) => a.price.total - b.price.total)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = FlightSearchSchema.safeParse(body)

    if (!result.success) {
      return errorResponse(result.error.issues.map((e) => e.message).join(', '))
    }

    const flights = generateMockFlights(result.data)

    return successResponse({
      flights,
      searchParams: result.data,
      totalResults: flights.length,
    })
  } catch (error) {
    return errorResponse('Flight search failed', 500)
  }
}
