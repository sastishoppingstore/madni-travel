import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '@/utils/helpers';

export interface Booking {
  id: string;
  type: 'flight' | 'package' | 'hotel' | 'bus' | 'visa' | 'umrah';
  title: string;
  subtitle: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  amount: number;
  image?: string;
  passengers?: Passenger[];
  createdAt: string;
}

export interface Passenger {
  id: string;
  title: 'Mr' | 'Mrs' | 'Ms' | 'Dr';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: string;
  tripType: 'one-way' | 'round-trip';
}

interface BookingState {
  bookings: Booking[];
  searchParams: FlightSearchParams | null;
  selectedFlight: any | null;
  selectedPackage: any | null;
  isLoading: boolean;
  error: string | null;

  setSearchParams: (params: FlightSearchParams) => void;
  setSelectedFlight: (flight: any) => void;
  setSelectedPackage: (pkg: any) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Promise<boolean>;
  cancelBooking: (id: string) => Promise<boolean>;
  loadBookings: () => Promise<void>;
  clearSearch: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  searchParams: null,
  selectedFlight: null,
  selectedPackage: null,
  isLoading: false,
  error: null,

  setSearchParams: params => set({ searchParams: params }),
  setSelectedFlight: flight => set({ selectedFlight: flight }),
  setSelectedPackage: pkg => set({ selectedPackage: pkg }),

  addBooking: async (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newBooking: Booking = {
        ...bookingData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      const bookings = [...get().bookings, newBooking];
      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
      set({ bookings, isLoading: false });
      return true;
    } catch (error: any) {
      set({ error: error.message || 'Failed to create booking', isLoading: false });
      return false;
    }
  },

  cancelBooking: async (id: string) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const bookings = get().bookings.map(b =>
        b.id === id ? { ...b, status: 'cancelled' as const } : b
      );
      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
      set({ bookings, isLoading: false });
      return true;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  loadBookings: async () => {
    try {
      const stored = await AsyncStorage.getItem('bookings');
      if (stored) {
        set({ bookings: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
    }
  },

  clearSearch: () =>
    set({ searchParams: null, selectedFlight: null, selectedPackage: null }),
}));
