import { NextRequest } from 'next/server'
import { requireAdmin, successResponse } from '../../lib/auth'

const TEMPLATES = [
  { name: 'booking_confirmation', description: 'Booking confirmation message', variables: ['name', 'bookingNo', 'service'] },
  { name: 'ticket_issued', description: 'Ticket issued notification', variables: ['name', 'bookingNo', 'ticketNo'] },
  { name: 'payment_received', description: 'Payment confirmation', variables: ['name', 'amount', 'bookingNo'] },
  { name: 'reminder', description: 'Travel reminder', variables: ['name', 'date', 'service'] },
  { name: 'greeting', description: 'Welcome greeting', variables: ['name'] },
  { name: 'follow_up', description: 'Follow up message', variables: ['name', 'service'] },
]

export async function GET(request: NextRequest) {
  return successResponse(TEMPLATES)
}
