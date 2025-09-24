import React, { useCallback } from 'react';
import { View } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ParkingSpotCard } from './';
import ParkingHeader from './ParkingHeader';
import ParkingFilters, { FilterType } from './ParkingFilters';
import FilterInfo from './FilterInfo';
import EmptyState from './EmptyState';
import ParkingFooter from './ParkingFooter';

export interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  distance: string;
  status: 'available' | 'occupied';
  type: 'free' | 'paid';
  price?: string;
}

interface ParkingListProps {
  spots: ParkingSpot[];
  activeFilters: FilterType[];
  onNavigateToDestination: () => void;
  onToggleFilter: (filter: FilterType) => void;
  onReserveSpot: (spotId: string) => void;
}

export default function ParkingList({ 
  spots, 
  activeFilters, 
  onNavigateToDestination, 
  onToggleFilter, 
  onReserveSpot 
}: ParkingListProps) {
  const insets = useSafeAreaInsets();

  const renderItem = useCallback(
    ({ item }: { item: ParkingSpot }) => (
      <View style={{ marginBottom: 20 }}>
        <ParkingSpotCard spot={item} onReserve={onReserveSpot} />
      </View>
    ),
    [onReserveSpot]
  );

  const renderHeader = useCallback(() => (
    <View>
      <ParkingHeader 
        onNavigateToDestination={onNavigateToDestination}
        spotsCount={spots.length}
      />
      <ParkingFilters 
        activeFilters={activeFilters}
        onToggleFilter={onToggleFilter}
      />
      <FilterInfo 
        activeFilters={activeFilters}
        spotsCount={spots.length}
      />
    </View>
  ), [spots.length, activeFilters, onNavigateToDestination, onToggleFilter]);

  return (
    <BottomSheetFlatList<ParkingSpot>
      data={spots}
      keyExtractor={(item: ParkingSpot) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={ParkingFooter}
      ListEmptyComponent={EmptyState}
      showsVerticalScrollIndicator
      scrollEnabled
      nestedScrollEnabled
      style={{ flex: 1 }}
      contentContainerStyle={{
        backgroundColor: '#f9fafb',
        paddingHorizontal: 20,
        paddingBottom: Math.max(insets.bottom + 300, 300),
      }}
    />
  );
}