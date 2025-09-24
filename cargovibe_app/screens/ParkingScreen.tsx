import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ParkingSpotCard, FilterButton } from '../components/screens/parking';

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  distance: string;
  status: 'available' | 'occupied';
  type: 'free' | 'paid';
  price?: string;
}

interface ParkingScreenProps {
  onNavigateToDestination: () => void;
}

type FilterType = 'available' | 'free' | 'private';

const mockParkingSpots: ParkingSpot[] = [
  {
    id: '1',
    name: 'Autohof Greding',
    address: 'Parkweg 105, Industrial Area',
    distance: '10 mins away',
    status: 'available',
    type: 'paid',
    price: '€8/hr',
  },
  {
    id: '2',
    name: 'Parking Spot 2',
    address: 'Emmastraat 5, City Center',
    distance: '16 mins away',
    status: 'available',
    type: 'free',
  },
  {
    id: '3',
    name: 'Parking Spot 3',
    address: 'Vanstraat 12, Business District',
    distance: '30 mins away',
    status: 'occupied',
    type: 'paid',
    price: '€15/hr',
  },
  {
    id: '4',
    name: 'Private Depot A',
    address: 'Industrial Zone West, Secure Area',
    distance: '12 mins away',
    status: 'available',
    type: 'paid',
    price: '€20/hr',
  },
  {
    id: '5',
    name: 'Highway Rest Stop',
    address: 'A1 Highway, Service Area',
    distance: '8 mins away',
    status: 'occupied',
    type: 'free',
  },
  {
    id: '6',
    name: 'Central Parking Hub',
    address: 'Downtown District, Main Street',
    distance: '5 mins away',
    status: 'available',
    type: 'free',
  },
  {
    id: '7',
    name: 'Port Authority Lot',
    address: 'Harbor Area, Dock 15',
    distance: '25 mins away',
    status: 'available',
    type: 'paid',
    price: '€12/hr',
  },
  {
    id: '8',
    name: 'Private Depot B',
    address: 'East Industrial Zone',
    distance: '18 mins away',
    status: 'occupied',
    type: 'paid',
    price: '€25/hr',
  },
  {
    id: '9',
    name: 'Truck Stop Alpha',
    address: 'Highway A2, Exit 12',
    distance: '14 mins away',
    status: 'available',
    type: 'paid',
    price: '€10/hr',
  },
  {
    id: '10',
    name: 'Free Municipal Lot',
    address: 'City Outskirts, North Side',
    distance: '22 mins away',
    status: 'available',
    type: 'free',
  },
  {
    id: '11',
    name: 'Secure Storage Facility',
    address: 'Business Park, Zone C',
    distance: '11 mins away',
    status: 'occupied',
    type: 'paid',
    price: '€18/hr',
  },
  {
    id: '12',
    name: 'Roadside Rest Area',
    address: 'National Highway, Mile 45',
    distance: '35 mins away',
    status: 'available',
    type: 'free',
  },
  {
    id: '13',
    name: 'Private Depot C',
    address: 'West Industrial Complex',
    distance: '16 mins away',
    status: 'available',
    type: 'paid',
    price: '€22/hr',
  },
  {
    id: '14',
    name: 'Express Parking Zone',
    address: 'Commercial District, Block 5',
    distance: '9 mins away',
    status: 'occupied',
    type: 'paid',
    price: '€14/hr',
  },
  {
    id: '15',
    name: 'Community Parking',
    address: 'Residential Area, South End',
    distance: '28 mins away',
    status: 'available',
    type: 'free',
  }
];

export default function ParkingScreen({ onNavigateToDestination }: ParkingScreenProps) {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const insets = useSafeAreaInsets();

  const filteredSpots = useMemo(() => {
    if (activeFilters.length === 0) {
      return mockParkingSpots;
    }
    
    return mockParkingSpots.filter(spot => {
      return activeFilters.every(filter => {
        switch (filter) {
          case 'available':
            return spot.status === 'available';
          case 'free':
            return spot.type === 'free';
          case 'private':
            return spot.name.toLowerCase().includes('private') || spot.name.toLowerCase().includes('depot');
          default:
            return false;
        }
      });
    });
  }, [activeFilters]);

  const toggleFilter = useCallback((filter: FilterType) => {
    setActiveFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  }, []);

  const handleReserve = useCallback((spotId: string) => {
    console.log('Reserving spot:', spotId);
    // Implement reservation logic here
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ParkingSpot }) => (
      <View style={{ marginBottom: 20 }}>
        <ParkingSpotCard spot={item} onReserve={handleReserve} />
      </View>
    ),
    [handleReserve]
  );

  const renderFooter = () => (
    <View className="items-center mt-4 mb-8">
      <Text 
        className="text-primary-500 text-xl font-bold"
        style={{ letterSpacing: 0.5 }}
      >
        CargoVibe
      </Text>
      <Text className="text-gray-500 text-sm mt-1">
        Smart logistics for professionals
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View className="items-center py-12">
      <Ionicons name="car-outline" size={48} color="#d1d5db" />
      <Text className="text-gray-500 text-lg font-medium mt-3">
        No spots found
      </Text>
      <Text className="text-gray-400 text-sm mt-1">
        Try adjusting your filters
      </Text>
    </View>
  );

  const HeaderCombined = (
    <View className="bg-white rounded-b-2xl overflow-hidden">
      <View className="px-6 py-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity
            className="flex-row items-center bg-gray-50 px-3 py-2 rounded-full"
            onPress={onNavigateToDestination}
          >
            <Ionicons name="arrow-back" size={18} color="#6b7280" />
            <Text className="text-gray-600 text-sm font-medium ml-2">Back</Text>
          </TouchableOpacity>
          <View className="flex-row items-center">
            <Ionicons name="car-outline" size={20} color="#8b5cf6" />
            <Text className="text-primary-500 text-sm font-semibold ml-2">
              {filteredSpots.length} spots
            </Text>
          </View>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-gray-900 mb-1">Parking Spots</Text>
          <Text className="text-gray-600 text-sm">Find the perfect spot for your truck</Text>
        </View>
      </View>
      <View className="border-b border-gray-100">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12, gap: 12 }}
        >
          <FilterButton
            title="Available"
            isActive={activeFilters.includes('available')}
            onPress={() => toggleFilter('available')}
          />
          <FilterButton
            title="Free"
            isActive={activeFilters.includes('free')}
            onPress={() => toggleFilter('free')}
          />
          <FilterButton
            title="Private"
            isActive={activeFilters.includes('private')}
            onPress={() => toggleFilter('private')}
          />
        </ScrollView>
      </View>
    </View>
  );

  const HeaderInfo = (
    <View>
      {activeFilters.length > 0 && (
        <View className="bg-white px-6 py-2 border-b border-gray-100">
          <Text className="text-gray-600 text-sm">
            Showing {filteredSpots.length} spots with filters: {activeFilters.join(', ')}
          </Text>
        </View>
      )}
      <View style={{ height: 12 }} />
    </View>
  );

  return (
    <BottomSheetFlatList<ParkingSpot>
      data={filteredSpots}
      keyExtractor={(item: ParkingSpot) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={() => (
        <View>
          {HeaderCombined}
          {HeaderInfo}
        </View>
      )}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmptyState}
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