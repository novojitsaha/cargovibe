import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RestTimeSelector() {
  const [restTime, setRestTime] = useState(2);

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

  const getTimeColor = (hours: number) => {
    if (hours <= 1) return '#ef4444'; // red for short time
    if (hours <= 2.5) return '#f59e0b'; // orange for medium time
    return '#10b981'; // green for long time
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
    <View style={{ marginBottom: 16 }}>
      <View style={{
        backgroundColor: '#f9fafb',
        borderWidth: 2,
        borderColor: '#e5e7eb',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="time" size={18} color="#8b5cf6" />
            <Text style={{ marginLeft: 10, color: '#6b7280', fontSize: 15 }}>
              Rest Time
            </Text>
          </View>
          <View 
            style={{ 
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              backgroundColor: getTimeColor(restTime) + '20'
            }}
          >
            <Text 
              style={{ 
                fontWeight: '600',
                fontSize: 14,
                color: getTimeColor(restTime)
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
          style={{ marginHorizontal: -4 }}
        >
          {quickTimeOptions.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => setRestTime(option.value)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 20,
                backgroundColor: restTime === option.value ? '#8b5cf6' : 'white',
                marginRight: index < quickTimeOptions.length - 1 ? 10 : 0,
                minWidth: 60,
                alignItems: 'center',
                borderWidth: restTime === option.value ? 0 : 1,
                borderColor: '#e5e7eb',
                shadowColor: restTime === option.value ? '#8b5cf6' : '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: restTime === option.value ? 0.3 : 0.05,
                shadowRadius: restTime === option.value ? 4 : 2,
                elevation: restTime === option.value ? 4 : 1,
              }}
            >
              <Text 
                style={{
                  fontSize: 13,
                  fontWeight: restTime === option.value ? '600' : '500',
                  color: restTime === option.value ? 'white' : '#374151'
                }}
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