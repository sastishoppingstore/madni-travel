import { useEffect } from 'react';
import { useBookingStore } from '@/store/bookingStore';

export const useBookings = () => {
  const { bookings, isLoading, loadBookings, addBooking, cancelBooking } = useBookingStore();

  useEffect(() => {
    loadBookings();
  }, []);

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');
  const pastBookings = bookings.filter(b => b.status === 'completed');

  return {
    bookings,
    confirmedBookings,
    pendingBookings,
    cancelledBookings,
    pastBookings,
    isLoading,
    loadBookings,
    addBooking,
    cancelBooking,
  };
};
