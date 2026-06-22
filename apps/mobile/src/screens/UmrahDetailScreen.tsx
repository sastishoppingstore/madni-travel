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
  Clock,
  MapPin,
  Hotel,
  Star,
  Check,
  ChevronRight,
  Calendar,
  Phone,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { UMRUH_PACKAGES } from '@/utils/constants';
import { formatPrice } from '@/utils/helpers';

const UmrahDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { umrahId } = route.params as { umrahId: string };

  const umrah = UMRUH_PACKAGES.find(u => u.id === umrahId);

  if (!umrah) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Package not found</Text>
      </View>
    );
  }

  const handleBookNow = () => {
    navigation.navigate('Checkout' as never);
  };

  return (
    <View style={styles.container}>
      {/* Hero */}
      <ImageBackground
        source={{ uri: umrah.image }}
        style={styles.hero}
        imageStyle={{ borderBottomLeftRadius: BorderRadius.lg, borderBottomRightRadius: BorderRadius.lg }}
      >
        <View style={styles.heroOverlay}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.heroBadge}>
            <Hotel size={14} color={Colors.white} />
            <Text style={styles.heroBadgeText}>{umrah.hotel}</Text>
          </View>
        </View>
      </ImageBackground>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{umrah.title}</Text>

        {/* Quick Info */}
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Clock size={20} color={Colors.primary} />
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{umrah.duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <MapPin size={20} color={Colors.primary} />
            <Text style={styles.infoLabel}>Distance</Text>
            <Text style={styles.infoValue}>{umrah.distance}</Text>
          </View>
          <View style={styles.infoItem}>
            <Star size={20} color={Colors.primary} />
            <Text style={styles.infoLabel}>Hotel</Text>
            <Text style={styles.infoValue}>{umrah.hotel}</Text>
          </View>
        </View>

        {/* Includes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          {umrah.includes.map((item, index) => (
            <View key={index} style={styles.includeRow}>
              <View style={styles.checkCircle}>
                <Check size={14} color={Colors.white} />
              </View>
              <Text style={styles.includeText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Info Cards */}
        <View style={styles.noticeCard}>
          <Calendar size={20} color={Colors.primary} />
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>Flexible Booking</Text>
            <Text style={styles.noticeText}>
              Free cancellation up to 7 days before departure
            </Text>
          </View>
        </View>

        <View style={styles.noticeCard}>
          <Phone size={20} color={Colors.primary} />
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>24/7 Support</Text>
            <Text style={styles.noticeText}>
              Our team is available round the clock during your journey
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Package Price</Text>
          <Text style={styles.priceValue}>{formatPrice(umrah.price)}</Text>
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
  hero: {
    width: '100%',
    height: 250,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  backBtn: {
    alignSelf: 'flex-start',
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
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  heroBadgeText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: Spacing.base,
    marginBottom: Spacing.lg,
  },
  infoItem: {
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
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  infoValue: {
    fontSize: 13,
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
  includeRow: {
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
  includeText: {
    fontSize: 15,
    color: Colors.text,
    flex: 1,
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.infoLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.base,
    gap: Spacing.base,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  noticeText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
    color: Colors.textSecondary,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Spacing.lg + 10,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  priceValue: {
    fontSize: 24,
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

export default UmrahDetailScreen;
