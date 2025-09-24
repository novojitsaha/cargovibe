import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import DestinationInput from './DestinationInput';
import RestTimeSelector from './RestTimeSelector';

interface DestinationScreenProps {
  onNavigateToParking: () => void;
}

export default function DestinationScreen({ onNavigateToParking }: DestinationScreenProps) {
  const handleSearchParkingSpots = () => {
    console.log('Searching for parking spots...');
    onNavigateToParking();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}
      >
        <Text className="text-2xl font-semibold text-gray-800 text-center mb-6">Set your destination</Text>
        <DestinationInput />
        <RestTimeSelector />
        <TouchableOpacity
          className="bg-primary rounded-2xl py-4 px-6 mt-2 mb-5 flex-row items-center justify-center"
          style={{
            shadowColor: '#8b5cf6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
          onPress={handleSearchParkingSpots}
        >
          <Ionicons name="car" size={20} color="white" className="mr-2.5" />
          <Text className="text-white text-base font-semibold" style={{ letterSpacing: 0.5 }}>
            Search Parking Spots
          </Text>
        </TouchableOpacity>
        <View className="items-center mt-4">
          <Text className="text-primary text-xl font-bold" style={{ letterSpacing: 0.5 }}>
            CargoVibe
          </Text>
          <Text className="text-gray-500 text-sm mt-1">Smart logistics for professionals</Text>
        </View>
      </BottomSheetScrollView>
    </View>
  );
}