import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { DestinationInput, RestTimeSelector } from '../components/screens/destination';
import { Location } from '../data/mockData';

interface DestinationScreenProps {
  selectedDestination: Location | null;
  onDestinationSelect: (destination: Location | null) => void;
  restTime: number;
  onRestTimeChange: (time: number) => void;
  onSearchParkingSpots: () => void;
}

export default function DestinationScreen({ 
  selectedDestination,
  onDestinationSelect,
  restTime,
  onRestTimeChange,
  onSearchParkingSpots
}: DestinationScreenProps) {
  const handleSearchParkingSpots = () => {
    if (!selectedDestination) {
      // Maybe show an alert to select destination first
      console.log('Please select a destination first');
      return;
    }
    console.log('Searching for parking spots...');
    onSearchParkingSpots();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}
      >
        <Text className="text-2xl font-semibold text-gray-800 text-center mb-6">Set your destination</Text>
        <DestinationInput 
          selectedDestination={selectedDestination}
          onDestinationSelect={onDestinationSelect}
        />
        <RestTimeSelector 
          restTime={restTime}
          onRestTimeChange={onRestTimeChange}
        />
        <TouchableOpacity
          className={`rounded-2xl py-4 px-6 mt-2 mb-5 flex-row items-center justify-center ${
            selectedDestination ? 'bg-primary' : 'bg-gray-300'
          }`}
          style={selectedDestination ? {
            shadowColor: '#8b5cf6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          } : undefined}
          onPress={handleSearchParkingSpots}
          disabled={!selectedDestination}
        >
          <Ionicons 
            name="car" 
            size={20} 
            color={selectedDestination ? "white" : "#9ca3af"} 
            className="mr-2.5" 
          />
          <Text 
            className={`text-base font-semibold ${
              selectedDestination ? 'text-white' : 'text-gray-500'
            }`}
            style={{ letterSpacing: 0.5 }}
          >
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