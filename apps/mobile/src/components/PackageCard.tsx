import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Star, Clock, MapPin } from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing } from '@/theme/spacing';
import { BorderRadius } from '@/theme/spacing';
import { formatPrice } from '@/utils/helpers';

interface PackageCardProps {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  highlights?: string[];
  featured?: boolean;
  onPress: () => void;
  horizontal?: boolean;
}

const { width } = Dimensions.get('window');

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  destination,
  duration,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  featured,
  onPress,
  horizontal = false,
}) => {
  if (horizontal) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.horizontalCard}>
        <ImageBackground
          source={{ uri: image }}
          style={styles.horizontalImage}
          imageStyle={{ borderRadius: BorderRadius.lg }}
        >
          <View style={styles.horizontalOverlay}>
            {featured && (
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredText}>Featured</Text>
              </View>
            )}
            <View style={styles.horizontalContent}>
              <Text style={styles.horizontalTitle} numberOfLines={1}>{title}</Text>
              <View style={styles.horizontalRow}>
                <MapPin size={12} color={Colors.white} />
                <Text style={styles.horizontalSubtitle} numberOfLines={1}>{destination}</Text>
              </View>
              <View style={styles.horizontalRow}>
                <Clock size={12} color={Colors.white} />
                <Text style={styles.horizontalSubtitle}>{duration}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.horizontalPrice}>{formatPrice(price)}</Text>
                {originalPrice && (
                  <Text style={styles.originalPrice}>{formatPrice(originalPrice)}</Text>
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.image}
        imageStyle={{ borderTopLeftRadius: BorderRadius.lg, borderTopRightRadius: BorderRadius.lg }}
      >
        <View style={styles.imageOverlay}>
          {featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
          {rating && (
            <View style={styles.ratingBadge}>
              <Star size={12} color={Colors.accent} fill={Colors.accent} />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          )}
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.row}>
          <MapPin size={14} color={Colors.textMuted} />
          <Text style={styles.subtitle} numberOfLines={1}>{destination}</Text>
        </View>
        <View style={styles.row}>
          <Clock size={14} color={Colors.textMuted} />
          <Text style={styles.subtitle}>{duration}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          {originalPrice && (
            <Text style={styles.originalPriceSmall}>{formatPrice(originalPrice)}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.base,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  horizontalCard: {
    width: 260,
    height: 200,
    marginRight: Spacing.base,
    borderRadius: BorderRadius.lg,
  },
  horizontalImage: {
    width: '100%',
    height: '100%',
  },
  horizontalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: BorderRadius.lg,
    justifyContent: 'space-between',
    padding: Spacing.base,
  },
  imageOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: Spacing.base,
  },
  featuredBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.base,
  },
  featuredText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
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
  content: {
    padding: Spacing.base,
  },
  horizontalContent: {
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  horizontalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 4,
  },
  horizontalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 4,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  horizontalSubtitle: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.9,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  horizontalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.7,
    textDecorationLine: 'line-through',
  },
  originalPriceSmall: {
    fontSize: 14,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
});

export default PackageCard;
