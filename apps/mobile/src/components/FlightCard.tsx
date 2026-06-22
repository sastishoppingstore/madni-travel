import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Plane, Clock, ArrowRight } from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing } from '@/theme/spacing';
import { BorderRadius } from '@/theme/spacing';
import { formatPrice } from '@/utils/helpers';

interface FlightCardProps {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  from: { code: string; name: string; time: string };
  to: { code: string; name: string; time: string };
  duration: string;
  price: number;
  cabin: string;
  stops: number;
  onPress: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({
  airline,
  airlineCode,
  flightNumber,
  from,
  to,
  duration,
  price,
  cabin,
  stops,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.airlineRow}>
          <View style={styles.airlineBadge}>
            <Text style={styles.airlineCode}>{airlineCode}</Text>
          </View>
          <View>
            <Text style={styles.airlineName} numberOfLines={1}>{airline}</Text>
            <Text style={styles.flightNumber}>{flightNumber}</Text>
          </View>
        </View>
        <View style={styles.cabinBadge}>
          <Text style={styles.cabinText}>{cabin}</Text>
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routePoint}>
          <Text style={styles.timeText}>{from.time}</Text>
          <Text style={styles.codeText}>{from.code}</Text>
          <Text style={styles.nameText} numberOfLines={1}>{from.name}</Text>
        </View>

        <View style={styles.routeMiddle}>
          <Text style={styles.durationText}>{duration}</Text>
          <View style={styles.lineContainer}>
            <View style={styles.dot} />
            <View style={styles.line} />
            <View style={styles.planeIconWrap}>
              <Plane size={16} color={Colors.primary} />
            </View>
            <View style={styles.line} />
            <View style={styles.dot} />
          </View>
          <Text style={styles.stopsText}>
            {stops === 0 ? 'Direct' : `${stops} stop${stops > 1 ? 's' : ''}`}
          </Text>
        </View>

        <View style={[styles.routePoint, styles.alignRight]}>
          <Text style={styles.timeText}>{to.time}</Text>
          <Text style={styles.codeText}>{to.code}</Text>
          <Text style={styles.nameText} numberOfLines={1}>{to.name}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price per person</Text>
          <Text style={styles.price}>{formatPrice(price)}</Text>
        </View>
        <View style={styles.selectButton}>
          <Text style={styles.selectText}>Select</Text>
          <ArrowRight size={16} color={Colors.white} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.base,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  airlineBadge: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  airlineCode: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  airlineName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    maxWidth: 180,
  },
  flightNumber: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  cabinBadge: {
    backgroundColor: Colors.infoLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.base,
  },
  cabinText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.info,
  },
  routeContainer: {
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
  codeText: {
    fontSize: 13,
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
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  planeIconWrap: {
    marginHorizontal: 4,
  },
  stopsText: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.base,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  selectText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FlightCard;
