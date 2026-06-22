import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  Globe,
  Clock,
  Search,
  FileText,
  ChevronRight,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { VISA_SERVICES } from '@/utils/constants';
import { formatPrice } from '@/utils/helpers';
import Header from '@/components/Header';

const flagEmoji: Record<string, string> = {
  'Saudi Arabia': '🇸🇦',
  'UAE': '🇦🇪',
  'Turkey': '🇹🇷',
  'United Kingdom': '🇬🇧',
  'Azerbaijan': '🇦🇿',
  'Thailand': '🇹🇭',
  'Malaysia': '🇲🇾',
  'Singapore': '🇸🇬',
};

const VisaServicesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVisas = VISA_SERVICES.filter(
    v =>
      v.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderVisaCard = ({ item }: { item: (typeof VISA_SERVICES)[0] }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.cardLeft}>
        <View style={styles.flagContainer}>
          <Text style={styles.flagEmoji}>{flagEmoji[item.country] || '🌍'}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.countryName}>{item.country}</Text>
          <Text style={styles.visaType}>{item.type}</Text>
          <View style={styles.processingRow}>
            <Clock size={12} color={Colors.textMuted} />
            <Text style={styles.processingText}>{item.processingTime}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.applyBtn}>
          <Text style={styles.applyText}>Apply</Text>
          <ChevronRight size={14} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Visa Services" />

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by country or visa type..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <FileText size={20} color={Colors.primary} />
        <Text style={styles.infoText}>
          We handle all visa processing for you. Just submit your documents and we'll do the rest.
        </Text>
      </View>

      <FlatList
        data={filteredVisas}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderVisaCard}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Globe size={48} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No visa services found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.infoLight,
    marginHorizontal: Spacing.lg,
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    gap: Spacing.base,
    marginBottom: Spacing.base,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.info,
    lineHeight: 18,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.base,
  },
  flagEmoji: {
    fontSize: 24,
  },
  cardInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  visaType: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  processingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  processingText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  cardRight: {
    alignItems: 'flex-end',
    marginLeft: Spacing.base,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}10`,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  applyText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
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

export default VisaServicesScreen;
