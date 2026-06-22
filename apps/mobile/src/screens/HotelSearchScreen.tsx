import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {
  Search,
  MapPin,
  Star,
  CalendarDays,
  Users,
  Building2,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { formatPrice } from '@/utils/helpers';
import Header from '@/components/Header';

const MOCK_HOTELS = [
  {
    id: '1',
    name: 'Pearl Continental Hotel',
    location: 'Lahore, Pakistan',
    rating: 4.8,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    amenities: ['WiFi', 'Pool', 'Spa'],
  },
  {
    id: '2',
    name: 'Marriott Hotel',
    location: 'Islamabad, Pakistan',
    rating: 4.7,
    price: 22000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
    amenities: ['WiFi', 'Gym', 'Restaurant'],
  },
  {
    id: '3',
    name: 'Serena Hotel',
    location: 'Karachi, Pakistan',
    rating: 4.9,
    price: 25000,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
    amenities: ['WiFi', 'Pool', 'Business Center'],
  },
  {
    id: '4',
    name: 'Movenpick Hotel',
    location: 'Karachi, Pakistan',
    rating: 4.6,
    price: 19500,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
    amenities: ['WiFi', 'Pool', 'Gym'],
  },
  {
    id: '5',
    name: 'Avari Hotel',
    location: 'Lahore, Pakistan',
    rating: 4.5,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400',
    amenities: ['WiFi', 'Restaurant'],
  },
];

const HotelSearchScreen = () => {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHotels = MOCK_HOTELS.filter(
    h =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    setShowResults(true);
  };

  const renderHotelCard = ({ item }: { item: (typeof MOCK_HOTELS)[0] }) => (
    <TouchableOpacity style={styles.hotelCard} activeOpacity={0.8}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.hotelImage}
        imageStyle={{ borderRadius: BorderRadius.lg }}
      >
        <View style={styles.hotelOverlay}>
          <View style={styles.ratingBadge}>
            <Star size={12} color={Colors.accent} fill={Colors.accent} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.locationRow}>
          <MapPin size={14} color={Colors.textMuted} />
          <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
        </View>
        <View style={styles.amenitiesRow}>
          {item.amenities.map((a, i) => (
            <View key={i} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{a}</Text>
            </View>
          ))}
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <Text style={styles.perNight}>/ night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (showResults) {
    return (
      <View style={styles.container}>
        <Header title="Hotel Results" />
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color={Colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Filter hotels..."
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
        <FlatList
          data={filteredHotels}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={renderHotelCard}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Building2 size={48} color={Colors.textMuted} />
              <Text style={styles.emptyText}>No hotels found</Text>
            </View>
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Search Hotels" />

      <View style={styles.formContainer}>
        {/* City */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>City or Hotel Name</Text>
          <View style={styles.inputContainer}>
            <MapPin size={20} color={Colors.primary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter destination"
              placeholderTextColor={Colors.textMuted}
              value={city}
              onChangeText={setCity}
            />
          </View>
        </View>

        {/* Dates */}
        <View style={styles.rowInputs}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Check-in</Text>
            <View style={styles.inputContainer}>
              <CalendarDays size={18} color={Colors.primary} />
              <TextInput
                style={styles.textInput}
                placeholder="YYYY-MM-DD"
                value={checkIn}
                onChangeText={setCheckIn}
              />
            </View>
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: Spacing.base }]}>
            <Text style={styles.inputLabel}>Check-out</Text>
            <View style={styles.inputContainer}>
              <CalendarDays size={18} color={Colors.primary} />
              <TextInput
                style={styles.textInput}
                placeholder="YYYY-MM-DD"
                value={checkOut}
                onChangeText={setCheckOut}
              />
            </View>
          </View>
        </View>

        {/* Guests */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Guests</Text>
          <View style={styles.counterInput}>
            <Users size={20} color={Colors.primary} />
            <TouchableOpacity
              onPress={() => setGuests(Math.max(1, guests - 1))}
              style={styles.counterButton}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{guests}</Text>
            <TouchableOpacity
              onPress={() => setGuests(Math.min(10, guests + 1))}
              style={styles.counterButton}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity
          style={[styles.searchButton, !city && styles.searchButtonDisabled]}
          onPress={handleSearch}
          disabled={!city}
          activeOpacity={0.8}
        >
          <Search size={20} color={Colors.white} />
          <Text style={styles.searchButtonText}>Search Hotels</Text>
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
  rowInputs: {
    flexDirection: 'row',
  },
  counterInput: {
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
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    minWidth: 30,
    textAlign: 'center',
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
  searchContainer: {
    padding: Spacing.lg,
    paddingTop: Spacing.base,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.base,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  hotelCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  hotelImage: {
    width: '100%',
    height: 160,
  },
  hotelOverlay: {
    flex: 1,
    alignItems: 'flex-end',
    padding: Spacing.base,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.base,
    gap: 4,
  },
  ratingText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  hotelInfo: {
    padding: Spacing.lg,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.sm,
  },
  locationText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  amenityTag: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.base,
  },
  amenityText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  perNight: {
    fontSize: 13,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emptyText: {
    marginTop: Spacing.base,
    fontSize: 16,
    color: Colors.textMuted,
  },
});

export default HotelSearchScreen;
