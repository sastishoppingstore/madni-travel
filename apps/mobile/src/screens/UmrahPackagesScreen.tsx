import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapPin, Clock, Star, Check, ChevronRight } from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { UMRUH_PACKAGES } from '@/utils/constants';
import { formatPrice } from '@/utils/helpers';
import Header from '@/components/Header';

const UmrahPackagesScreen = () => {
  const navigation = useNavigation<any>();

  const handleSelectPackage = (umrahId: string) => {
    navigation.navigate('UmrahDetail' as never, { umrahId } as never);
  };

  const renderUmrahCard = ({ item }: { item: (typeof UMRUH_PACKAGES)[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSelectPackage(item.id)}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.cardImage}
        imageStyle={{ borderRadius: BorderRadius.lg }}
      >
        <View style={styles.cardOverlay}>
          <View style={styles.badgeRow}>
            <View style={styles.hotelBadge}>
              <Star size={12} color={Colors.accent} fill={Colors.accent} />
              <Text style={styles.hotelText}>{item.hotel}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.infoRow}>
          <Clock size={14} color={Colors.textMuted} />
          <Text style={styles.infoText}>{item.duration}</Text>
          <View style={styles.dot} />
          <MapPin size={14} color={Colors.textMuted} />
          <Text style={styles.infoText} numberOfLines={1}>{item.distance}</Text>
        </View>

        <View style={styles.includesRow}>
          {item.includes.slice(0, 3).map((inc, i) => (
            <View key={i} style={styles.includeTag}>
              <Check size={10} color={Colors.success} />
              <Text style={styles.includeText}>{inc}</Text>
            </View>
          ))}
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <View style={styles.bookBtn}>
            <Text style={styles.bookBtnText}>Book Now</Text>
            <ChevronRight size={14} color={Colors.white} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Umrah Packages" />

      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <Text style={styles.heroTitle}>Sacred Journey Awaits</Text>
        <Text style={styles.heroSubtitle}>
          Choose from our carefully curated Umrah packages
        </Text>
      </View>

      <FlatList
        data={UMRUH_PACKAGES}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderUmrahCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroBanner: {
    backgroundColor: Colors.secondary,
    margin: Spacing.lg,
    marginTop: 0,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  card: {
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
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    justifyContent: 'flex-end',
  },
  badgeRow: {
    flexDirection: 'row',
  },
  hotelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.base,
    gap: 4,
  },
  hotelText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: Spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  includesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  includeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.base,
    gap: 4,
  },
  includeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.success,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.base,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  bookBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default UmrahPackagesScreen;
