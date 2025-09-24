import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { DestinationInput, RestTimeSelector } from '../components/screens/destination';
import { Location } from '../data/mockData';
import { RouteData } from '../utils/routeUtils';

interface DestinationScreenProps {
  selectedDestination: Location | null;
  onDestinationSelect: (destination: Location | null) => void;
  restTime: number;
  onRestTimeChange: (time: number) => void;
  onSearchParkingSpots: () => void;
  routeData?: RouteData | null; // Add route data to props
}

export default function DestinationScreen({ 
  selectedDestination,
  onDestinationSelect,
  restTime,
  onRestTimeChange,
  onSearchParkingSpots,
  routeData
}: DestinationScreenProps) {
  const handleSearchParkingSpots = () => {
    if (!selectedDestination || !routeData) {
      // Maybe show an alert to select destination first
      console.log('Please select a destination first and wait for route to load');
      return;
    }
    console.log('Searching for parking spots...');
    onSearchParkingSpots();
  };

  const isButtonEnabled = selectedDestination && routeData;

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
          className={`rounded-2xl py-4 px-6 mt-2 mb-5 flex-row items-center justify-center border ${
            isButtonEnabled ? 'bg-primary border-primary' : 'bg-gray-200 border-gray-300'
          }`}
          style={isButtonEnabled ? {
            shadowColor: '#8b5cf6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          } : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          }}
          onPress={handleSearchParkingSpots}
          disabled={!isButtonEnabled}
        >
          <Ionicons 
            name="car" 
            size={20} 
            color={isButtonEnabled ? "white" : "#9ca3af"} 
            className="mr-2.5" 
          />
          <Text 
            className={`text-base font-semibold ${
              isButtonEnabled ? 'text-white' : 'text-gray-400'
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