export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Flights: undefined;
  Packages: undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  FlightResults: undefined;
  FlightDetail: { flightId: string };
  PassengerDetails: undefined;
  Checkout: undefined;
  PackageDetail: { packageId: string };
  UmrahPackages: undefined;
  UmrahDetail: { umrahId: string };
  VisaServices: undefined;
  HotelSearch: undefined;
  BusSearch: undefined;
  BookingConfirmation: { bookingId: string };
  Chatbot: undefined;
  Support: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
