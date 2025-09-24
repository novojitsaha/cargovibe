import React, { useCallback } from 'react';
import { View } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ParkingSpotCard from './ParkingSpotCard';
import ParkingHeader from './ParkingHeader';
import ParkingFilters, { FilterType } from './ParkingFilters';
import EmptyState from './EmptyState';
import ParkingFooter from './ParkingFooter';
import { RouteData } from '../../../utils/routeUtils';

export interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance: string;
  timeToReach: number;
  status: 'available' | 'occupied';
  type: 'free' | 'paid';
  price?: string;
  private: boolean;
  routeId?: string;
}

interface ParkingListProps {
  spots: ParkingSpot[];
  activeFilters: FilterType[];
  onNavigateToDestination: () => void;
  onToggleFilter: (filter: FilterType) => void;
  onReserveSpot: (spotId: string) => void;
  routeData?: RouteData | null;
}

export default function ParkingList({ 
  spots, 
  activeFilters, 
  onNavigateToDestination, 
  onToggleFilter, 
  onReserveSpot,
  routeData
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
        routeData={routeData}
      />
      <ParkingFilters 
        activeFilters={activeFilters}
        onToggleFilter={onToggleFilter}
      />
    </View>
  ), [spots.length, activeFilters, onNavigateToDestination, onToggleFilter, routeData]);

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
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: Math.max(insets.bottom + 300, 300),
      }}
    />
  );
}