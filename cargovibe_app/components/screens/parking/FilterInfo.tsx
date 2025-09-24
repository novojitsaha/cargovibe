import React from 'react';
import { View, Text } from 'react-native';
import { FilterType } from './ParkingFilters';

interface FilterInfoProps {
  activeFilters: FilterType[];
  spotsCount: number;
}

export default function FilterInfo({ activeFilters, spotsCount }: FilterInfoProps) {
  if (activeFilters.length === 0) {
    return <View style={{ height: 12 }} />;
  }

  return (
    <View>
      <View className="bg-white px-6 py-2 border-b border-gray-100">
        <Text className="text-gray-600 text-sm">
          Showing {spotsCount} spots with filters: {activeFilters.join(', ')}
        </Text>
      </View>
      <View style={{ height: 12 }} />
    </View>
  );
}