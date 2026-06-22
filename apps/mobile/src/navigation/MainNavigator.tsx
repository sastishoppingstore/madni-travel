import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { MainTabParamList } from './types';
import { Colors } from '@/theme/colors';
import HomeScreen from '@/screens/HomeScreen';
import FlightsScreen from '@/screens/FlightsScreen';
import PackagesScreen from '@/screens/PackagesScreen';
import BookingsScreen from '@/screens/BookingsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import {
  Home,
  Plane,
  Briefcase,
  Gift,
  User,
} from 'lucide-react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.travelGold,
        tabBarInactiveTintColor: Colors.travelTextLight,
        tabBarLabelStyle: styles.tabLabel,
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size - 2} color={color} />,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Flights"
        component={FlightsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Plane size={size - 2} color={color} />,
          tabBarLabel: 'Book',
        }}
      />
      <Tab.Screen
        name="Packages"
        component={PackagesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.middleTab, focused && styles.middleTabActive]}>
              <Briefcase size={24} color={focused ? Colors.travelNavy : Colors.white} />
            </View>
          ),
          tabBarLabel: 'Trips',
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Gift size={size - 2} color={color} />,
          tabBarLabel: 'Offers',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User size={size - 2} color={color} />,
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.travelNavy,
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopColor: 'rgba(255,255,255,0.08)',
    borderTopWidth: 1,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  middleTab: {
    backgroundColor: Colors.travelBlue,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: Colors.travelBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  middleTabActive: {
    backgroundColor: Colors.travelGold,
  },
});

export default MainNavigator;
