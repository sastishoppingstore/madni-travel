import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Bus,
  MapPin,
  CalendarDays,
  ChevronRight,
  Clock,
  Armchair,
  Search,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { formatPrice } from '@/utils/helpers';
import Header from '@/components/Header';

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Multan', 'Faisalabad', 'Rawalpindi', 'Sialkot'];

const MOCK_BUSES = [
  { id: '1', operator: 'Daewoo Express', from: 'Lahore', to: 'Islamabad', departure: '08:00', arrival: '12:30', price: 2200, seats: 27, type: 'Business Class' },
  { id: '2', operator: 'Faisal Movers', from: 'Lahore', to: 'Islamabad', departure: '10:00', arrival: '14:30', price: 1800, seats: 41, type: 'Standard' },
  { id: '3', operator: 'Road Master', from: 'Lahore', to: 'Islamabad', departure: '14:00', arrival: '18:30', price: 1500, seats: 45, type: 'Economy' },
  { id: '4', operator: 'Daewoo Express', from: 'Lahore', to: 'Karachi', departure: '21:00', arrival: '09:00', price: 5500, seats: 27, type: 'Sleeper' },
  { id: '5', operator: 'Skyways', from: 'Lahore', to: 'Multan', departure: '07:30', arrival: '11:00', price: 1200, seats: 41, type: 'Standard' },
];

const BusSearchScreen = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  const renderBusCard = ({ item }: { item: (typeof MOCK_BUSES)[0] }) => (
    <TouchableOpacity style={styles.busCard} activeOpacity={0.8}>
      <View style={styles.busHeader}>
        <View style={styles.operatorBadge}>
          <Bus size={18} color={Colors.white} />
        </View>
        <View style={styles.operatorInfo}>
          <Text style={styles.operatorName}>{item.operator}</Text>
          <Text style={styles.busType}>{item.type}</Text>
        </View>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>

      <View style={styles.routeRow}>
        <View style={styles.routePoint}>
          <Text style={styles.timeText}>{item.departure}</Text>
          <Text style={styles.cityText}>{item.from}</Text>
        </View>
        <View style={styles.routeMiddle}>
          <View style={styles.routeLine} />
          <Bus size={14} color={Colors.primary} />
          <View style={styles.routeLine} />
        </View>
        <View style={[styles.routePoint, styles.alignRight]}>
          <Text style={styles.timeText}>{item.arrival}</Text>
          <Text style={styles.cityText}>{item.to}</Text>
        </View>
      </View>

      <View style={styles.busFooter}>
        <View style={styles.seatInfo}>
          <Armchair size={14} color={Colors.textMuted} />
          <Text style={styles.seatText}>{item.seats} seats available</Text>
        </View>
        <View style={styles.bookBtn}>
          <Text style={styles.bookText}>Book</Text>
          <ChevronRight size={14} color={Colors.white} />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (showResults) {
    return (
      <View style={styles.container}>
        <Header title="Bus Results" />
        <View style={styles.summaryBar}>
          <Text style={styles.summaryText}>{fromCity} to {toCity}</Text>
          <Text style={styles.summaryDate}>{date}</Text>
        </View>
        <FlatList
          data={MOCK_BUSES}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={renderBusCard}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Bus Booking" />

      <View style={styles.formContainer}>
        {/* From */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>From</Text>
          <View style={styles.inputContainer}>
            <MapPin size={20} color={Colors.primary} />
            <TextInput
              style={styles.textInput}
              placeholder="Departure city"
              placeholderTextColor={Colors.textMuted}
              value={fromCity}
              onChangeText={setFromCity}
            />
          </View>
        </View>

        {/* To */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>To</Text>
          <View style={styles.inputContainer}>
            <MapPin size={20} color={Colors.accent} />
            <TextInput
              style={styles.textInput}
              placeholder="Destination city"
              placeholderTextColor={Colors.textMuted}
              value={toCity}
              onChangeText={setToCity}
            />
          </View>
        </View>

        {/* Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Travel Date</Text>
          <View style={styles.inputContainer}>
            <CalendarDays size={20} color={Colors.primary} />
            <TextInput
              style={styles.textInput}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={Colors.textMuted}
              value={date}
              onChangeText={setDate}
            />
          </View>
        </View>

        {/* Quick Cities */}
        <View style={styles.quickCities}>
          <Text style={styles.quickTitle}>Popular Routes</Text>
          <View style={styles.citiesGrid}>
            {CITIES.slice(0, 6).map(city => (
              <TouchableOpacity
                key={city}
                style={styles.cityChip}
                onPress={() => {
                  if (!fromCity) setFromCity(city);
                  else if (!toCity) setToCity(city);
                }}
              >
                <Text style={styles.cityChipText}>{city}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity
          style={[styles.searchButton, (!fromCity || !toCity) && styles.searchButtonDisabled]}
          onPress={handleSearch}
          disabled={!fromCity || !toCity}
          activeOpacity={0.8}
        >
          <Search size={20} color={Colors.white} />
          <Text style={styles.searchButtonText}>Search Buses</Text>
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
  formContainer: {
    padding: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.base,
    backgroundColor: Colors.white,
    gap: Spacing.sm,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    height: '100%',
  },
  quickCities: {
    marginBottom: Spacing.lg,
  },
  quickTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.base,
  },
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  cityChip: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cityChipText: {
    fontSize: 13,
    color: Colors.text,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    marginTop: Spacing.base,
  },
  searchButtonDisabled: {
    opacity: 0.6,
  },
  searchButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  summaryBar: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  summaryDate: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
  listContent: {
    padding: Spacing.lg,
  },
  busCard: {
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
  busHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  operatorBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  operatorInfo: {
    flex: 1,
    marginLeft: Spacing.base,
  },
  operatorName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  busType: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
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
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  cityText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  routeMiddle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  routeLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  busFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.base,
  },
  seatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seatText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  bookText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BusSearchScreen;
