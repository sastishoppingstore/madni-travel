import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Plane,
  Clock,
  Briefcase,
  Utensils,
  Monitor,
  Wifi,
  Luggage,
  ChevronRight,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { formatPrice } from '@/utils/helpers';
import { useBookingStore } from '@/store/bookingStore';
import Header from '@/components/Header';

const AMENITIES = [
  { icon: Briefcase, label: 'Cabin Baggage', value: '7 KG' },
  { icon: Luggage, label: 'Check-in Baggage', value: '20 KG' },
  { icon: Utensils, label: 'Meals', value: 'Included' },
  { icon: Monitor, label: 'Entertainment', value: 'In-flight' },
  { icon: Wifi, label: 'Wi-Fi', value: 'Available' },
];

const FlightDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedFlight } = useBookingStore();
  const flight = selectedFlight;

  if (!flight) {
    return (
      <View style={styles.container}>
        <Header title="Flight Details" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Flight not found</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleBookNow = () => {
    navigation.navigate('PassengerDetails' as never);
  };

  return (
    <View style={styles.container}>
      <Header title="Flight Details" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Airline Info */}
        <View style={styles.airlineCard}>
          <View style={styles.airlineBadge}>
            <Text style={styles.airlineCode}>{flight.airlineCode}</Text>
          </View>
          <View style={styles.airlineInfo}>
            <Text style={styles.airlineName}>{flight.airline}</Text>
            <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
          </View>
          <View style={styles.cabinBadge}>
            <Text style={styles.cabinText}>{flight.cabin}</Text>
          </View>
        </View>

        {/* Route Card */}
        <View style={styles.routeCard}>
          <View style={styles.routeRow}>
            <View style={styles.routePoint}>
              <Text style={styles.timeText}>{flight.from.time}</Text>
              <Text style={styles.codeText}>{flight.from.code}</Text>
              <Text style={styles.nameText}>{flight.from.name}</Text>
            </View>

            <View style={styles.routeMiddle}>
              <Text style={styles.durationText}>{flight.duration}</Text>
              <View style={styles.lineContainer}>
                <View style={styles.dot} />
                <View style={styles.line} />
                <Plane size={20} color={Colors.primary} />
                <View style={styles.line} />
                <View style={styles.dot} />
              </View>
              <Text style={styles.stopsText}>
                {flight.stops === 0 ? 'Direct Flight' : `${flight.stops} stop(s)`}
              </Text>
            </View>

            <View style={[styles.routePoint, styles.alignRight]}>
              <Text style={styles.timeText}>{flight.to.time}</Text>
              <Text style={styles.codeText}>{flight.to.code}</Text>
              <Text style={styles.nameText}>{flight.to.name}</Text>
            </View>
          </View>

          <View style={styles.dateRow}>
            <Clock size={14} color={Colors.textMuted} />
            <Text style={styles.dateText}>Date: {flight.date}</Text>
          </View>
        </View>

        {/* Amenities */}
        <View style={styles.amenitiesCard}>
          <Text style={styles.sectionTitle}>Flight Amenities</Text>
          {AMENITIES.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <View key={index} style={styles.amenityRow}>
                <View style={styles.amenityIcon}>
                  <IconComponent size={18} color={Colors.primary} />
                </View>
                <Text style={styles.amenityLabel}>{amenity.label}</Text>
                <Text style={styles.amenityValue}>{amenity.value}</Text>
              </View>
            );
          })}
        </View>

        {/* Fare Breakdown */}
        <View style={styles.fareCard}>
          <Text style={styles.sectionTitle}>Fare Breakdown</Text>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Base Fare</Text>
            <Text style={styles.fareValue}>{formatPrice(Math.round(flight.price * 0.75))}</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Taxes & Fees</Text>
            <Text style={styles.fareValue}>{formatPrice(Math.round(flight.price * 0.15))}</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Service Charges</Text>
            <Text style={styles.fareValue}>{formatPrice(Math.round(flight.price * 0.1))}</Text>
          </View>
          <View style={[styles.fareRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total per person</Text>
            <Text style={styles.totalValue}>{formatPrice(flight.price)}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.priceValue}>{formatPrice(flight.price)}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow} activeOpacity={0.8}>
          <Text style={styles.bookButtonText}>Book Now</Text>
          <ChevronRight size={18} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  goBackText: {
    marginTop: Spacing.base,
    color: Colors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  airlineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.base,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  airlineBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  airlineCode: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  airlineInfo: {
    flex: 1,
    marginLeft: Spacing.base,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  flightNumber: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  cabinBadge: {
    backgroundColor: Colors.infoLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.base,
  },
  cabinText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.info,
  },
  routeCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.base,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  routePoint: {
    flex: 1,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  codeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 2,
  },
  nameText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  routeMiddle: {
    flex: 1.5,
    alignItems: 'center',
  },
  durationText: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  stopsText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.base,
    marginTop: Spacing.sm,
  },
  dateText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  amenitiesCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.base,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  amenityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  amenityIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.base,
  },
  amenityLabel: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  amenityValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  fareCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  fareLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  fareValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: Spacing.sm,
    paddingTop: Spacing.base,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Spacing.lg + 10,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  bookButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FlightDetailScreen;
