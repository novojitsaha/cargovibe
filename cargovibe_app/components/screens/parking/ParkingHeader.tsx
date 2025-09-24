import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteData, getRouteSummary } from '../../../utils/routeUtils';

interface ParkingHeaderProps {
  onNavigateToDestination: () => void;
  spotsCount: number;
  routeData?: RouteData | null;
}

export default function ParkingHeader({ 
  onNavigateToDestination, 
  spotsCount, 
  routeData 
}: ParkingHeaderProps) {
  const routeSummary = routeData ? getRouteSummary(routeData) : null;

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
        
        {routeSummary && (
          <View className="bg-gray-50 rounded-xl px-4 py-3 mb-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold text-base">
                  To {routeSummary.destination}
                </Text>
                <Text className="text-gray-600 text-sm mt-1">
                  {routeSummary.distance} • {routeSummary.duration}
                </Text>
              </View>
              <View className="bg-primary-100 px-3 py-1.5 rounded-full">
                <Text className="text-primary-700 text-xs font-bold">
                  ACTIVE ROUTE
                </Text>
              </View>
            </View>
          </View>
        )}
        
        <View className="items-center">
          <Text className="text-2xl font-bold text-gray-900 mb-1">Parking Spots</Text>
          <Text className="text-gray-600 text-sm">
            {routeSummary 
              ? `Find parking along your route to ${routeSummary.destination}`
              : 'Find the perfect spot for your truck'
            }
          </Text>
        </View>
      </View>
    </View>
  );
}