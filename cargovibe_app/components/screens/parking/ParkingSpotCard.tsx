import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  distance: string;
  status: 'available' | 'occupied';
  type: 'free' | 'paid';
  price?: string;
}

interface ParkingSpotCardProps {
  spot: ParkingSpot;
  onReserve: (spotId: string) => void;
}

export default function ParkingSpotCard({ spot, onReserve }: ParkingSpotCardProps) {
  const getStatusColor = (status: string) => {
    return status === 'available' ? '#10b981' : '#ef4444';
  };

  const handleReserve = () => {
    if (spot.status === 'available') {
      onReserve(spot.id);
    }
  };

  return (
    <View
      className="bg-white rounded-2xl p-5 border border-gray-100"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      <View className="flex-row justify-between">
        <View className="flex-1 pr-3">
          <View className="flex-row items-center mb-3">
            <View
              className="w-4 h-4 rounded-full mr-3"
              style={{
                backgroundColor: getStatusColor(spot.status),
                shadowColor: getStatusColor(spot.status),
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 2,
              }}
            />
            <Text className="text-xl font-bold text-gray-900 flex-1">
              {spot.name}
            </Text>
          </View>

          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={18} color="#9ca3af" />
            <Text className="text-gray-700 text-sm ml-2 flex-1">
              {spot.address}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={18} color="#9ca3af" />
            <Text className="text-gray-600 text-sm ml-2">
              {spot.distance}
            </Text>
          </View>
        </View>

        <View className="min-w-[112px] items-end">
          {spot.type === 'free' ? (
            <View className="bg-success-50 px-3 py-1.5 rounded-full self-end mb-3">
              <Text className="text-success-700 text-xs font-bold">FREE</Text>
            </View>
          ) : spot.price ? (
            <View className="bg-warning-50 px-3 py-1.5 rounded-full self-end mb-3">
              <Text className="text-warning-700 text-xs font-bold">{spot.price}</Text>
            </View>
          ) : (
            <View className="mb-3" />
          )}

          <TouchableOpacity
            className={`w-full py-3.5 rounded-xl items-center ${
              spot.status === 'available' ? 'bg-primary-500' : 'bg-gray-200'
            }`}
            disabled={spot.status === 'occupied'}
            onPress={handleReserve}
            style={spot.status === 'available'
              ? {
                  shadowColor: '#8b5cf6',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.25,
                  shadowRadius: 6,
                  elevation: 4,
                }
              : undefined}
          >
            <Text
              className={`font-bold ${
                spot.status === 'available' ? 'text-white' : 'text-gray-500'
              }`}
            >
              {spot.status === 'available' ? 'Reserve' : 'Occupied'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}