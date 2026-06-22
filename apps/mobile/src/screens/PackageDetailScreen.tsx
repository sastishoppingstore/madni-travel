import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Star,
  MapPin,
  Clock,
  Check,
  ChevronRight,
  Heart,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { MOCK_PACKAGES } from '@/utils/constants';
import { formatPrice } from '@/utils/helpers';
import Header from '@/components/Header';

const PackageDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { packageId } = route.params as { packageId: string };

  const packageData = MOCK_PACKAGES.find(p => p.id === packageId);

  if (!packageData) {
    return (
      <View style={styles.container}>
        <Header title="Package Details" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Package not found</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const discount = Math.round(
    ((packageData.originalPrice - packageData.price) / packageData.originalPrice) * 100
  );

  const handleBookPackage = async () => {
    navigation.navigate('Checkout' as never);
  };

  return (
    <View style={styles.container}>
      {/* Hero Image */}
      <ImageBackground
        source={{ uri: packageData.image }}
        style={styles.heroImage}
        imageStyle={{ borderBottomLeftRadius: BorderRadius.lg, borderBottomRightRadius: BorderRadius.lg }}
      >
        <View style={styles.heroOverlay}>
          <View style={styles.topActions}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            >
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favBtn}>
              <Heart size={22} color={Colors.white} />
            </TouchableOpacity>
          </View>
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discount}% OFF</Text>
            </View>
          )}
        </View>
      </ImageBackground>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{packageData.title}</Text>
          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Star size={14} color={Colors.accent} fill={Colors.accent} />
              <Text style={styles.ratingText}>{packageData.rating}</Text>
            </View>
            <Text style={styles.reviewsText}>({packageData.reviews} reviews)</Text>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.infoCards}>
          <View style={styles.infoCard}>
            <MapPin size={20} color={Colors.primary} />
            <Text style={styles.infoLabel}>Destination</Text>
            <Text style={styles.infoValue} numberOfLines={1}>{packageData.destination}</Text>
          </View>
          <View style={styles.infoCard}>
            <Clock size={20} color={Colors.primary} />
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{packageData.duration}</Text>
          </View>
        </View>

        {/* Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Package Highlights</Text>
          {packageData.highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightRow}>
              <View style={styles.checkCircle}>
                <Check size={14} color={Colors.white} />
              </View>
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Package</Text>
          <Text style={styles.description}>
            Experience an unforgettable journey with our {packageData.title.toLowerCase()}. 
            This carefully curated package includes premium accommodations, guided tours, 
            and all the essentials for a memorable trip. Book now and save{' '}
            {formatPrice(packageData.originalPrice - packageData.price)}!
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Package Price</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceValue}>{formatPrice(packageData.price)}</Text>
            <Text style={styles.originalPrice}>{formatPrice(packageData.originalPrice)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookPackage} activeOpacity={0.8}>
          <Text style={styles.bookButtonText}>Book Package</Text>
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
  heroImage: {
    width: '100%',
    height: 280,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  backBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  favBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  discountText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  titleSection: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.base,
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  reviewsText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  infoCards: {
    flexDirection: 'row',
    gap: Spacing.base,
    marginBottom: Spacing.lg,
  },
  infoCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 2,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.base,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.base,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightText: {
    fontSize: 15,
    color: Colors.text,
    flex: 1,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
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
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
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
    fontSize: 15,
    fontWeight: '700',
  },
});

export default PackageDetailScreen;
