import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Filter, ArrowLeft } from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { MOCK_FLIGHTS } from '@/utils/constants';
import { useBookingStore } from '@/store/bookingStore';
import FlightCard from '@/components/FlightCard';
import Header from '@/components/Header';
import EmptyState from '@/components/EmptyState';

const FlightResultsScreen = () => {
  const navigation = useNavigation();
  const { searchParams, setSelectedFlight } = useBookingStore();

  const handleSelectFlight = (flight: (typeof MOCK_FLIGHTS)[0]) => {
    setSelectedFlight(flight);
    navigation.navigate('FlightDetail' as never, { flightId: flight.id } as never);
  };

  const fromCode = searchParams?.from?.match(/\(([A-Z]{3})\)/)?.[1] || 'LHE';
  const toCode = searchParams?.to?.match(/\(([A-Z]{3})\)/)?.[1] || 'JED';

  // Filter flights based on search params
  const results = MOCK_FLIGHTS.filter(f => {
    const matchesRoute = f.from.code === fromCode || !searchParams?.from;
    const matchesDest = f.to.code === toCode || !searchParams?.to;
    const matchesCabin = !searchParams?.cabinClass || f.cabin === searchParams.cabinClass;
    return matchesRoute || matchesDest;
  });

  return (
    <View style={styles.container}>
      <Header title="Flight Results" />

      {/* Route Summary */}
      <View style={styles.routeSummary}>
        <View style={styles.routeInfo}>
          <Text style={styles.routeCode}>{fromCode}</Text>
          <View style={styles.routeLine} />
          <View style={styles.planeDot} />
          <View style={styles.routeLine} />
          <Text style={styles.routeCode}>{toCode}</Text>
        </View>
        <Text style={styles.routeDate}>{searchParams?.departDate || '2024-12-20'}</Text>
        <View style={styles.filterButton}>
          <TouchableOpacity style={styles.filterBtn}>
            <Filter size={16} color={Colors.primary} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <FlightCard {...item} onPress={() => handleSelectFlight(item)} />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="flight"
            title="No flights found"
            subtitle="Try different search criteria"
            actionLabel="Modify Search"
            onAction={() => navigation.goBack()}
          />
        }
        ListHeaderComponent={
          <Text style={styles.resultCount}>{results.length} flights found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  routeSummary: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  routeCode: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    minWidth: 50,
    textAlign: 'center',
  },
  routeLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.sm,
  },
  planeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  routeDate: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.base,
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}10`,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  resultCount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.base,
  },
  listContent: {
    padding: Spacing.lg,
  },
});

export default FlightResultsScreen;
