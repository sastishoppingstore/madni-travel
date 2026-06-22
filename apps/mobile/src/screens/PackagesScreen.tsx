import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { MOCK_PACKAGES } from '@/utils/constants';
import PackageCard from '@/components/PackageCard';
import Header from '@/components/Header';
import EmptyState from '@/components/EmptyState';

const FILTERS = ['All', 'Umrah', 'Holidays', 'Asia', 'Europe', 'Middle East'];

const PackagesScreen = () => {
  const navigation = useNavigation<any>();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPackages =
    activeFilter === 'All'
      ? MOCK_PACKAGES
      : activeFilter === 'Umrah'
        ? MOCK_PACKAGES.filter(p => p.title.toLowerCase().includes('umrah'))
        : activeFilter === 'Holidays'
          ? MOCK_PACKAGES.filter(p => !p.title.toLowerCase().includes('umrah'))
          : activeFilter === 'Asia'
            ? MOCK_PACKAGES.filter(p =>
                ['dubai', 'baku', 'thailand', 'malaysia', 'singapore'].some(c =>
                  p.destination.toLowerCase().includes(c)
                )
              )
            : activeFilter === 'Europe'
              ? MOCK_PACKAGES.filter(p =>
                  ['london', 'uk', 'turkey', 'istanbul'].some(c =>
                    p.destination.toLowerCase().includes(c)
                  )
                )
              : MOCK_PACKAGES.filter(p =>
                  ['saudi', 'makkah', 'madina', 'jeddah', 'uae', 'dubai'].some(c =>
                    p.destination.toLowerCase().includes(c)
                  )
                );

  const navigateToDetail = (packageId: string) => {
    navigation.navigate('PackageDetail' as never, { packageId } as never);
  };

  return (
    <View style={styles.container}>
      <Header title="Holiday Packages" showBack={false} transparent />

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {FILTERS.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterTab, activeFilter === filter && styles.filterTabActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Packages List */}
      <FlatList
        data={filteredPackages}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <PackageCard {...item} onPress={() => navigateToDetail(item.id)} />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="search"
            title="No packages found"
            subtitle="Try a different filter to explore packages"
            actionLabel="View All"
            onAction={() => setActiveFilter('All')}
          />
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
  filterContainer: {
    backgroundColor: Colors.primary,
    paddingBottom: Spacing.base,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  },
  filterScroll: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  filterTab: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginRight: Spacing.sm,
  },
  filterTabActive: {
    backgroundColor: Colors.white,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  filterTextActive: {
    color: Colors.primary,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.base,
  },
});

export default PackagesScreen;
