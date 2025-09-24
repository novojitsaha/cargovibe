import React from 'react';
import { View, ScrollView } from 'react-native';
import { FilterButton } from './';

export type FilterType = 'available' | 'free' | 'private';

interface ParkingFiltersProps {
  activeFilters: FilterType[];
  onToggleFilter: (filter: FilterType) => void;
}

export default function ParkingFilters({ activeFilters, onToggleFilter }: ParkingFiltersProps) {
  return (
    <View className="border-b border-gray-100">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12, gap: 12 }}
      >
        <FilterButton
          title="Available"
          isActive={activeFilters.includes('available')}
          onPress={() => onToggleFilter('available')}
        />
        <FilterButton
          title="Free"
          isActive={activeFilters.includes('free')}
          onPress={() => onToggleFilter('free')}
        />
        <FilterButton
          title="Private"
          isActive={activeFilters.includes('private')}
          onPress={() => onToggleFilter('private')}
        />
      </ScrollView>
    </View>
  );
}