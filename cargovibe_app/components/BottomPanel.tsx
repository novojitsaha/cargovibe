import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DestinationInput from './DestinationInput';
import RestTimeSelector from './RestTimeSelector';

export default function BottomPanel() {
  return (
    <View 
      className="flex-1 bg-white rounded-t-3xl px-6 pt-4 pb-6"
      style={{
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      }}
    >
      <View className="items-center mb-5">
        <View className="w-12 h-1 bg-gray-300 rounded-sm" />
      </View>
      
      <Text className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Set your destination
      </Text>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <DestinationInput />
        <RestTimeSelector />
        
        <TouchableOpacity 
          className="bg-primary rounded-2xl py-4 px-6 mt-2 mb-5 flex-row items-center justify-center"
          style={{
            shadowColor: '#8b5cf6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
          onPress={() => {
            console.log('Searching for parking spots...');
          }}
        >
          <Ionicons name="car" size={20} color="white" className="mr-2.5" />
          <Text className="text-white text-base font-semibold" style={{ letterSpacing: 0.5 }}>
            Search Parking Spots
          </Text>
        </TouchableOpacity>
        
        <View className="items-center mt-4">
          <Text 
            className="text-primary text-xl font-bold"
            style={{ letterSpacing: 0.5 }}
          >
            CargoVibe
          </Text>
          <Text className="text-gray-500 text-sm mt-1">
            Smart logistics for professionals
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}