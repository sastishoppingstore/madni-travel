import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { RootStackParamList } from './types';
import { Colors } from '@/theme/colors';
import { useAuth } from '@/hooks/useAuth';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

import FlightResultsScreen from '@/screens/FlightResultsScreen';
import FlightDetailScreen from '@/screens/FlightDetailScreen';
import PassengerDetailsScreen from '@/screens/PassengerDetailsScreen';
import CheckoutScreen from '@/screens/CheckoutScreen';
import PackageDetailScreen from '@/screens/PackageDetailScreen';
import UmrahPackagesScreen from '@/screens/UmrahPackagesScreen';
import UmrahDetailScreen from '@/screens/UmrahDetailScreen';
import VisaServicesScreen from '@/screens/VisaServicesScreen';
import HotelSearchScreen from '@/screens/HotelSearchScreen';
import BusSearchScreen from '@/screens/BusSearchScreen';
import BookingConfirmationScreen from '@/screens/BookingConfirmationScreen';
import ChatbotScreen from '@/screens/ChatbotScreen';
import SupportScreen from '@/screens/SupportScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isAuthenticated, isCheckingAuth, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen name="FlightResults" component={FlightResultsScreen} />
            <Stack.Screen name="FlightDetail" component={FlightDetailScreen} />
            <Stack.Screen name="PassengerDetails" component={PassengerDetailsScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="PackageDetail" component={PackageDetailScreen} />
            <Stack.Screen name="UmrahPackages" component={UmrahPackagesScreen} />
            <Stack.Screen name="UmrahDetail" component={UmrahDetailScreen} />
            <Stack.Screen name="VisaServices" component={VisaServicesScreen} />
            <Stack.Screen name="HotelSearch" component={HotelSearchScreen} />
            <Stack.Screen name="BusSearch" component={BusSearchScreen} />
            <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
            <Stack.Screen name="Chatbot" component={ChatbotScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});

export default AppNavigator;
