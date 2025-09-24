import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface FilterButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

export default function FilterButton({ title, isActive, onPress }: FilterButtonProps) {
  return (
    <TouchableOpacity
      className={`px-6 py-3 rounded-full border-2 items-center ${
        isActive 
          ? 'bg-primary-500 border-primary-500' 
          : 'bg-white border-gray-200'
      }`}
      onPress={onPress}
      style={isActive ? {
        shadowColor: '#8b5cf6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
      } : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <Text className={`font-semibold text-sm whitespace-nowrap ${
        isActive ? 'text-white' : 'text-gray-700'
      }`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}