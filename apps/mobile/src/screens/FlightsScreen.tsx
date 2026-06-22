import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Plane,
  CalendarDays,
  Users,
  Armchair,
  ArrowRightLeft,
  ChevronDown,
  Search,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { AIRPORTS, CABIN_CLASSES } from '@/utils/constants';
import { useBookingStore } from '@/store/bookingStore';
import Header from '@/components/Header';

const FlightsScreen = () => {
  const navigation = useNavigation<any>();
  const { setSearchParams } = useBookingStore();
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showCabinDropdown, setShowCabinDropdown] = useState(false);

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    if (!from || !to || !departDate) return;
    setSearchParams({
      from,
      to,
      departDate,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      passengers,
      cabinClass,
      tripType,
    });
    navigation.navigate('FlightResults' as never);
  };

  const filterAirports = (query: string) => {
    if (!query) return AIRPORTS.slice(0, 5);
    return AIRPORTS.filter(
      a =>
        a.city.toLowerCase().includes(query.toLowerCase()) ||
        a.code.toLowerCase().includes(query.toLowerCase()) ||
        a.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  };

  return (
    <View style={styles.container}>
      <Header title="Search Flights" showBack={false} transparent />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Trip Type Toggle */}
        <View style={styles.tripTypeContainer}>
          <TouchableOpacity
            style={[styles.tripTypeButton, tripType === 'one-way' && styles.tripTypeActive]}
            onPress={() => setTripType('one-way')}
          >
            <Text style={[styles.tripTypeText, tripType === 'one-way' && styles.tripTypeTextActive]}>
              One Way
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tripTypeButton, tripType === 'round-trip' && styles.tripTypeActive]}
            onPress={() => setTripType('round-trip')}
          >
            <Text
              style={[styles.tripTypeText, tripType === 'round-trip' && styles.tripTypeTextActive]}
            >
              Round Trip
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Card */}
        <View style={styles.searchCard}>
          {/* From */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>From</Text>
            <TouchableOpacity
              style={styles.locationInput}
              onPress={() => setShowFromDropdown(!showFromDropdown)}
            >
              <Plane size={20} color={Colors.primary} />
              <Text style={from ? styles.inputValue : styles.inputPlaceholder}>
                {from || 'Select departure city'}
              </Text>
              <ChevronDown size={16} color={Colors.textMuted} />
            </TouchableOpacity>
            {showFromDropdown && (
              <View style={styles.dropdown}>
                <TextInput
                  style={styles.dropdownSearch}
                  placeholder="Search city..."
                  value={from}
                  onChangeText={setFrom}
                  autoFocus
                />
                {filterAirports(from).map(airport => (
                  <TouchableOpacity
                    key={airport.code}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setFrom(`${airport.city} (${airport.code})`);
                      setShowFromDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemCode}>{airport.code}</Text>
                    <Text style={styles.dropdownItemName}>{airport.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Swap Button */}
          <View style={styles.swapContainer}>
            <TouchableOpacity onPress={swapLocations} style={styles.swapButton}>
              <ArrowRightLeft size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* To */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>To</Text>
            <TouchableOpacity
              style={styles.locationInput}
              onPress={() => setShowToDropdown(!showToDropdown)}
            >
              <View style={styles.toPlaneIconWrap}>
                <Plane size={20} color={Colors.accent} />
              </View>
              <Text style={to ? styles.inputValue : styles.inputPlaceholder}>
                {to || 'Select destination city'}
              </Text>
              <ChevronDown size={16} color={Colors.textMuted} />
            </TouchableOpacity>
            {showToDropdown && (
              <View style={styles.dropdown}>
                <TextInput
                  style={styles.dropdownSearch}
                  placeholder="Search city..."
                  value={to}
                  onChangeText={setTo}
                  autoFocus
                />
                {filterAirports(to).map(airport => (
                  <TouchableOpacity
                    key={airport.code}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setTo(`${airport.city} (${airport.code})`);
                      setShowToDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemCode}>{airport.code}</Text>
                    <Text style={styles.dropdownItemName}>{airport.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Dates */}
          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Departure</Text>
              <TouchableOpacity style={styles.dateInput}>
                <CalendarDays size={18} color={Colors.primary} />
                <TextInput
                  style={styles.dateTextInput}
                  placeholder="YYYY-MM-DD"
                  value={departDate}
                  onChangeText={setDepartDate}
                />
              </TouchableOpacity>
            </View>

            {tripType === 'round-trip' && (
              <View style={[styles.inputGroup, { flex: 1, marginLeft: Spacing.base }]}>
                <Text style={styles.inputLabel}>Return</Text>
                <TouchableOpacity style={styles.dateInput}>
                  <CalendarDays size={18} color={Colors.primary} />
                  <TextInput
                    style={styles.dateTextInput}
                    placeholder="YYYY-MM-DD"
                    value={returnDate}
                    onChangeText={setReturnDate}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Passengers & Cabin */}
          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Passengers</Text>
              <View style={styles.counterInput}>
                <Users size={18} color={Colors.primary} />
                <TouchableOpacity
                  onPress={() => setPassengers(Math.max(1, passengers - 1))}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{passengers}</Text>
                <TouchableOpacity
                  onPress={() => setPassengers(Math.min(9, passengers + 1))}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1.5, marginLeft: Spacing.base }]}>
              <Text style={styles.inputLabel}>Cabin Class</Text>
              <TouchableOpacity
                style={styles.cabinInput}
                onPress={() => setShowCabinDropdown(!showCabinDropdown)}
              >
                <Armchair size={18} color={Colors.primary} />
                <Text style={styles.inputValue}>{cabinClass}</Text>
                <ChevronDown size={16} color={Colors.textMuted} />
              </TouchableOpacity>
              {showCabinDropdown && (
                <View style={styles.dropdown}>
                  {CABIN_CLASSES.map(c => (
                    <TouchableOpacity
                      key={c}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setCabinClass(c);
                        setShowCabinDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemName}>{c}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity
          style={[
            styles.searchButton,
            (!from || !to || !departDate) && styles.searchButtonDisabled,
          ]}
          onPress={handleSearch}
          disabled={!from || !to || !departDate}
          activeOpacity={0.8}
        >
          <Search size={20} color={Colors.white} />
          <Text style={styles.searchButtonText}>Search Flights</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.lg,
    padding: 4,
    marginBottom: Spacing.lg,
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  tripTypeActive: {
    backgroundColor: Colors.primary,
  },
  tripTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tripTypeTextActive: {
    color: Colors.white,
  },
  searchCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: Spacing.base,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
  },
  inputValue: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  inputPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: Colors.textMuted,
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    marginTop: 4,
    maxHeight: 200,
    zIndex: 100,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownSearch: {
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    fontSize: 14,
    color: Colors.text,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    gap: Spacing.sm,
  },
  dropdownItemCode: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    minWidth: 40,
  },
  dropdownItemName: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  swapContainer: {
    alignItems: 'center',
    marginVertical: -Spacing.sm,
    zIndex: 10,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  toPlaneIconWrap: {
    transform: [{ rotate: '90deg' }],
  },
  rowInputs: {
    flexDirection: 'row',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
  },
  dateTextInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  counterInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    minWidth: 24,
    textAlign: 'center',
  },
  cabinInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.xl,
    gap: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  searchButtonDisabled: {
    opacity: 0.6,
  },
  searchButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FlightsScreen;
