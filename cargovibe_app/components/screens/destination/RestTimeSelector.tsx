import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';

interface RestTimeSelectorProps {
  restTime: number;
  onRestTimeChange: (time: number) => void;
}

export default function RestTimeSelector({ restTime, onRestTimeChange }: RestTimeSelectorProps) {

  const formatTime = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`;
    } else if (hours === Math.floor(hours)) {
      return `${Math.floor(hours)}h`;
    } else {
      const hrs = Math.floor(hours);
      const mins = Math.round((hours - hrs) * 60);
      return `${hrs}h ${mins}m`;
    }
  };

  const getTimeColorHex = (hours: number) => {
    if (hours <= 1) return '#ef4444';
    if (hours <= 2.5) return '#f59e0b';
    return '#10b981';
  };

  const quickTimeOptions = [
    { label: '30m', value: 0.5 },
    { label: '1h', value: 1 },
    { label: '1.5h', value: 1.5 },
    { label: '2h', value: 2 },
    { label: '2.5h', value: 2.5 },
    { label: '3h', value: 3 },
    { label: '3.5h', value: 3.5 },
    { label: '4h', value: 4 },
    { label: '4.5h', value: 4.5 },
  ];

  return (
    <View className="mb-4">
      <View className="bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3.5 ">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Ionicons name="time" size={18} color="#8b5cf6" />
            <Text className="ml-2.5 text-gray-500 text-base">
              Rest Time
            </Text>
          </View>
          <View 
            className="px-3 py-1.5 rounded-2xl"
            style={{
              backgroundColor: getTimeColorHex(restTime) + '20'
            }}
          >
            <Text 
              className="font-semibold text-sm"
              style={{ 
                color: getTimeColorHex(restTime)
              }}
            >
              {formatTime(restTime)}
            </Text>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 4 }}
          className="-mx-1 py-1"
        >
          {quickTimeOptions.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => onRestTimeChange(option.value)}
              className={cn(
                "px-4 py-2 rounded-2xl items-center min-w-[60px]",
                restTime === option.value ? "bg-primary" : "bg-white"
              )}
              style={{
                marginRight: index < quickTimeOptions.length - 1 ? 10 : 0,
                borderWidth: restTime === option.value ? 0 : 1,
                borderColor: '#e5e7eb',
                shadowColor: restTime === option.value ? '#8b5cf6' : '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: restTime === option.value ? 0.3 : 0.05,
                shadowRadius: restTime === option.value ? 4 : 2,
              }}
            >
              <Text 
                className={cn(
                  "text-sm font-medium",
                  restTime === option.value ? "text-white" : "text-gray-700"
                )}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}