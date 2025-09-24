import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ParkingHeaderProps {
  onNavigateToDestination: () => void;
  spotsCount: number;
}

export default function ParkingHeader({ onNavigateToDestination, spotsCount }: ParkingHeaderProps) {
  return (
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
              {spotsCount} spots
            </Text>
          </View>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-gray-900 mb-1">Parking Spots</Text>
          <Text className="text-gray-600 text-sm">Find the perfect spot for your truck</Text>
        </View>
      </View>
    </View>
  );
}