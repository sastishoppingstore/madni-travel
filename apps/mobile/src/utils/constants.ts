import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const API_BASE_URL = 'https://madnitravel.com/api';
// export const API_BASE_URL = 'http://192.168.1.100:3000/api';

export const WHATSAPP_NUMBER = '+923216001973';
export const SUPPORT_EMAIL = 'support@madnitravel.com';
export const COMPANY_NAME = 'Madni Travel & Tours';

export const SERVICES = [
  { id: 'flights', name: 'Flights', icon: 'Plane', color: '#059669', screen: 'Flights' },
  { id: 'holidays', name: 'Holidays', icon: 'Palmtree', color: '#D4AF37', screen: 'Packages' },
  { id: 'umrah', name: 'Umrah', icon: 'Moon', color: '#0F172A', screen: 'UmrahPackages' },
  { id: 'visa', name: 'Visa', icon: 'FileText', color: '#3B82F6', screen: 'VisaServices' },
  { id: 'hotels', name: 'Hotels', icon: 'Building2', color: '#8B5CF6', screen: 'HotelSearch' },
  { id: 'buses', name: 'Buses', icon: 'Bus', color: '#F59E0B', screen: 'BusSearch' },
] as const;

export const DESTINATIONS = [
  { id: '1', name: 'Makkah', country: 'Saudi Arabia', image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400' },
  { id: '2', name: 'Madina', country: 'Saudi Arabia', image: 'https://images.unsplash.com/photo-1542319465-7a87c5f95757?w=400' },
  { id: '3', name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' },
  { id: '4', name: 'Istanbul', country: 'Turkey', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400' },
  { id: '5', name: 'London', country: 'UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400' },
  { id: '6', name: 'Baku', country: 'Azerbaijan', image: 'https://images.unsplash.com/photo-1601124973747-86e0d0f232d8?w=400' },
] as const;

export const CABIN_CLASSES = ['Economy', 'Premium Economy', 'Business', 'First Class'] as const;

export const AIRPORTS = [
  { code: 'LHE', name: 'Lahore', city: 'Lahore' },
  { code: 'KHI', name: 'Karachi', city: 'Karachi' },
  { code: 'ISB', name: 'Islamabad', city: 'Islamabad' },
  { code: 'PEW', name: 'Peshawar', city: 'Peshawar' },
  { code: 'SKT', name: 'Sialkot', city: 'Sialkot' },
  { code: 'MUX', name: 'Multan', city: 'Multan' },
  { code: 'JED', name: 'Jeddah', city: 'Jeddah' },
  { code: 'MED', name: 'Madina', city: 'Madina' },
  { code: 'DXB', name: 'Dubai', city: 'Dubai' },
  { code: 'IST', name: 'Istanbul', city: 'Istanbul' },
  { code: 'LHR', name: 'London Heathrow', city: 'London' },
  { code: 'BAK', name: 'Baku', city: 'Baku' },
] as const;

export type MockFlight = {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  from: { code: string; name: string; time: string };
  to: { code: string; name: string; time: string };
  duration: string;
  price: number;
  cabin: string;
  stops: number;
  date: string;
};

export const MOCK_FLIGHTS: MockFlight[] = [
  {
    id: '1',
    airline: 'Pakistan International Airlines',
    airlineCode: 'PK',
    flightNumber: 'PK731',
    from: { code: 'LHE', name: 'Lahore', time: '04:00' },
    to: { code: 'JED', name: 'Jeddah', time: '07:30' },
    duration: '5h 30m',
    price: 78500,
    cabin: 'Economy',
    stops: 0,
    date: '2024-12-20',
  },
  {
    id: '2',
    airline: 'Saudi Arabian Airlines',
    airlineCode: 'SV',
    flightNumber: 'SV735',
    from: { code: 'LHE', name: 'Lahore', time: '12:30' },
    to: { code: 'JED', name: 'Jeddah', time: '16:00' },
    duration: '5h 30m',
    price: 82000,
    cabin: 'Economy',
    stops: 0,
    date: '2024-12-20',
  },
  {
    id: '3',
    airline: 'Emirates',
    airlineCode: 'EK',
    flightNumber: 'EK623',
    from: { code: 'LHE', name: 'Lahore', time: '15:45' },
    to: { code: 'JED', name: 'Jeddah', time: '21:30' },
    duration: '8h 45m',
    price: 125000,
    cabin: 'Business',
    stops: 1,
    date: '2024-12-20',
  },
  {
    id: '4',
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    flightNumber: 'QR621',
    from: { code: 'LHE', name: 'Lahore', time: '03:15' },
    to: { code: 'JED', name: 'Jeddah', time: '09:45' },
    duration: '9h 30m',
    price: 135000,
    cabin: 'Business',
    stops: 1,
    date: '2024-12-20',
  },
  {
    id: '5',
    airline: 'Airblue',
    airlineCode: 'PA',
    flightNumber: 'PA401',
    from: { code: 'LHE', name: 'Lahore', time: '08:00' },
    to: { code: 'DXB', name: 'Dubai', time: '10:30' },
    duration: '3h 30m',
    price: 45000,
    cabin: 'Economy',
    stops: 0,
    date: '2024-12-20',
  },
];

export type MockPackage = {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  highlights: string[];
  featured: boolean;
};

export const MOCK_PACKAGES: MockPackage[] = [
  {
    id: '1',
    title: '7 Days Umrah Package',
    destination: 'Makkah & Madina',
    duration: '7 Days',
    price: 145000,
    originalPrice: 165000,
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400',
    rating: 4.8,
    reviews: 234,
    highlights: ['5 Star Hotel', 'Direct Flights', 'Guided Tours', 'Visa Included'],
    featured: true,
  },
  {
    id: '2',
    title: 'Dubai Shopping Festival',
    destination: 'Dubai, UAE',
    duration: '5 Days',
    price: 85000,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
    rating: 4.6,
    reviews: 156,
    highlights: ['4 Star Hotel', 'City Tour', 'Desert Safari', 'Breakfast'],
    featured: true,
  },
  {
    id: '3',
    title: 'Turkey Cultural Tour',
    destination: 'Istanbul & Cappadocia',
    duration: '8 Days',
    price: 175000,
    originalPrice: 195000,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400',
    rating: 4.9,
    reviews: 312,
    highlights: ['Bosphorus Cruise', 'Hot Air Balloon', 'Guided Tours', 'All Meals'],
    featured: true,
  },
  {
    id: '4',
    title: 'UK Explorer',
    destination: 'London & Manchester',
    duration: '10 Days',
    price: 285000,
    originalPrice: 320000,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400',
    rating: 4.7,
    reviews: 189,
    highlights: ['4 Star Hotel', 'City Pass', 'Train Tickets', 'Breakfast'],
    featured: false,
  },
  {
    id: '5',
    title: 'Baku City Break',
    destination: 'Baku, Azerbaijan',
    duration: '4 Days',
    price: 65000,
    originalPrice: 75000,
    image: 'https://images.unsplash.com/photo-1601124973747-86e0d0f232d8?w=400',
    rating: 4.5,
    reviews: 98,
    highlights: ['Old City Tour', 'Flame Towers', 'Airport Transfer', 'Breakfast'],
    featured: false,
  },
  {
    id: '6',
    title: '15 Days Premium Umrah',
    destination: 'Makkah & Madina',
    duration: '15 Days',
    price: 285000,
    originalPrice: 320000,
    image: 'https://images.unsplash.com/photo-1542319465-7a87c5f95757?w=400',
    rating: 4.9,
    reviews: 445,
    highlights: ['5 Star Hotel', 'Private Transport', 'All Meals', 'VIP Visa'],
    featured: true,
  },
];

export type MockBooking = {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  date: string;
  status: string;
  amount: number;
  image: string;
};

export const MOCK_BOOKINGS: MockBooking[] = [
  {
    id: '1',
    type: 'flight',
    title: 'Lahore to Jeddah',
    subtitle: 'PIA PK731 - Economy',
    date: '2024-12-20',
    status: 'confirmed',
    amount: 78500,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=200',
  },
  {
    id: '2',
    type: 'package',
    title: '7 Days Umrah Package',
    subtitle: 'Makkah & Madina',
    date: '2025-01-15',
    status: 'pending',
    amount: 145000,
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=200',
  },
  {
    id: '3',
    type: 'flight',
    title: 'Lahore to Dubai',
    subtitle: 'Airblue PA401 - Economy',
    date: '2025-02-10',
    status: 'cancelled',
    amount: 45000,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=200',
  },
  {
    id: '4',
    type: 'package',
    title: 'Turkey Cultural Tour',
    subtitle: 'Istanbul & Cappadocia',
    date: '2025-03-01',
    status: 'confirmed',
    amount: 175000,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=200',
  },
];

export type VisaServiceItem = {
  id: string;
  country: string;
  type: string;
  price: number;
  processingTime: string;
  image: string;
};

export const VISA_SERVICES: VisaServiceItem[] = [
  { id: '1', country: 'Saudi Arabia', type: 'Umrah Visa', price: 15000, processingTime: '3-5 days', image: 'https://flagcdn.com/w160/sa.png' },
  { id: '2', country: 'UAE', type: 'Tourist Visa', price: 12000, processingTime: '3-5 days', image: 'https://flagcdn.com/w160/ae.png' },
  { id: '3', country: 'Turkey', type: 'Tourist Visa', price: 25000, processingTime: '7-10 days', image: 'https://flagcdn.com/w160/tr.png' },
  { id: '4', country: 'United Kingdom', type: 'Visitor Visa', price: 45000, processingTime: '15-30 days', image: 'https://flagcdn.com/w160/gb.png' },
  { id: '5', country: 'Azerbaijan', type: 'E-Visa', price: 8000, processingTime: '3 days', image: 'https://flagcdn.com/w160/az.png' },
  { id: '6', country: 'Thailand', type: 'Tourist Visa', price: 10000, processingTime: '5-7 days', image: 'https://flagcdn.com/w160/th.png' },
  { id: '7', country: 'Malaysia', type: 'Tourist Visa', price: 9000, processingTime: '5-7 days', image: 'https://flagcdn.com/w160/my.png' },
  { id: '8', country: 'Singapore', type: 'Tourist Visa', price: 18000, processingTime: '7-10 days', image: 'https://flagcdn.com/w160/sg.png' },
];

export type UmrahPackageItem = {
  id: string;
  title: string;
  duration: string;
  price: number;
  hotel: string;
  distance: string;
  includes: string[];
  image: string;
};

export const UMRUH_PACKAGES: UmrahPackageItem[] = [
  {
    id: 'u1',
    title: 'Economy Umrah Package',
    duration: '7 Days',
    price: 145000,
    hotel: '3 Star Hotel',
    distance: '800m from Haram',
    includes: ['Return Flights', 'Visa', 'Hotel', 'Breakfast', 'Airport Transfer'],
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400',
  },
  {
    id: 'u2',
    title: 'Standard Umrah Package',
    duration: '10 Days',
    price: 195000,
    hotel: '4 Star Hotel',
    distance: '500m from Haram',
    includes: ['Return Flights', 'Visa', 'Hotel', 'All Meals', 'Transport', 'Guided Tours'],
    image: 'https://images.unsplash.com/photo-1542319465-7a87c5f95757?w=400',
  },
  {
    id: 'u3',
    title: 'Premium Umrah Package',
    duration: '15 Days',
    price: 285000,
    hotel: '5 Star Hotel',
    distance: '200m from Haram',
    includes: ['Return Flights', 'VIP Visa', '5 Star Hotel', 'All Meals', 'Private Transport', 'Guided Tours', 'Ziyarat'],
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400',
  },
  {
    id: 'u4',
    title: 'Ramadan Special Umrah',
    duration: '21 Days',
    price: 385000,
    hotel: '5 Star Hotel',
    distance: '100m from Haram',
    includes: ['Return Flights', 'VIP Visa', '5 Star Hotel', 'Iftar & Suhoor', 'Private Transport', 'Full Board', '24/7 Support'],
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400',
  },
];
