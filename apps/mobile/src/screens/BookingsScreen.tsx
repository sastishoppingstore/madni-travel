import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { useBookings } from '@/hooks/useBookings';
import BookingCard from '@/components/BookingCard';
import Header from '@/components/Header';
import EmptyState from '@/components/EmptyState';
import LoadingSpinner from '@/components/LoadingSpinner';

const TABS = ['All', 'Confirmed', 'Pending', 'Cancelled'] as const;

const BookingsScreen = () => {
  const navigation = useNavigation();
  const { bookings, isLoading } = useBookings();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('All');

  const filteredBookings =
    activeTab === 'All'
      ? bookings
      : bookings.filter(
          b => b.status.toLowerCase() === activeTab.toLowerCase()
        );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="My Bookings" showBack={false} />
        <LoadingSpinner fullScreen message="Loading your bookings..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="My Bookings" showBack={false} transparent />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <EmptyState
          icon="booking"
          title={`No ${activeTab !== 'All' ? activeTab.toLowerCase() : ''} bookings`}
          subtitle={
            activeTab === 'All'
              ? 'Your booking history will appear here'
              : `You don't have any ${activeTab.toLowerCase()} bookings`
          }
          actionLabel="Book Now"
          onAction={() => navigation.navigate('Home' as never)}
        />
      ) : (
        <FlatList
          data={filteredBookings}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <BookingCard
              {...item}
              onPress={() => {
                /* navigate to booking detail */
              }}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.base,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    marginRight: Spacing.sm,
  },
  tabActive: {
    backgroundColor: Colors.white,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  tabTextActive: {
    color: Colors.primary,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.base,
  },
});

export default BookingsScreen;
