import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmptyState() {
  return (
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
}