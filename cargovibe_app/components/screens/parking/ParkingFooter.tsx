import React from 'react';
import { View, Text } from 'react-native';

export default function ParkingFooter() {
  return (
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
}