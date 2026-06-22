import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Plane, Palmtree, Building2, Bus, FileText, Moon } from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing } from '@/theme/spacing';
import { BorderRadius } from '@/theme/spacing';
import { formatPrice, formatDate, getStatusColor } from '@/utils/helpers';

const typeConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  flight: { icon: Plane, label: 'Flight', color: Colors.primary },
  package: { icon: Palmtree, label: 'Package', color: Colors.accent },
  hotel: { icon: Building2, label: 'Hotel', color: '#8B5CF6' },
  bus: { icon: Bus, label: 'Bus', color: '#F59E0B' },
  visa: { icon: FileText, label: 'Visa', color: '#3B82F6' },
  umrah: { icon: Moon, label: 'Umrah', color: Colors.secondary },
};

interface BookingCardProps {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  date: string;
  status: string;
  amount: number;
  image?: string;
  onPress?: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  type,
  title,
  subtitle,
  date,
  status,
  amount,
  image,
  onPress,
}) => {
  const config = typeConfig[type] || typeConfig.flight;
  const IconComponent = config.icon;
  const statusColor = getStatusColor(status);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: `${config.color}15` }]}>
          <IconComponent size={22} color={config.color} />
        </View>
        <View style={styles.details}>
          <View style={styles.topRow}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.amount}>{formatPrice(amount)}</Text>
          </View>
          <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.date}>{formatDate(date)}</Text>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}15` }]}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </View>
          </View>
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.base,
  },
  details: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  date: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.base,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default BookingCard;
