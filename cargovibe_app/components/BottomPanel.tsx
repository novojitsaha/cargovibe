import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DestinationInput from './DestinationInput';
import RestTimeSelector from './RestTimeSelector';

export default function BottomPanel() {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: 'white',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 24,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
    }}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <View style={{ 
          width: 48, 
          height: 4, 
          backgroundColor: '#d1d5db', 
          borderRadius: 2 
        }} />
      </View>
      
      <Text style={{
        fontSize: 24,
        fontWeight: '600',
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: 24,
      }}>
        Set your destination
      </Text>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <DestinationInput />
        <RestTimeSelector />
        
        <TouchableOpacity 
          style={{
            backgroundColor: '#8b5cf6',
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 24,
            marginTop: 8,
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
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
          <Ionicons name="car" size={20} color="white" style={{ marginRight: 10 }} />
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 0.5,
          }}>
            Search Parking Spots
          </Text>
        </TouchableOpacity>
        
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Text style={{
            color: '#8b5cf6',
            fontSize: 20,
            fontWeight: 'bold',
            letterSpacing: 0.5,
          }}>
            CargoVibe
          </Text>
          <Text style={{
            color: '#6b7280',
            fontSize: 14,
            marginTop: 4,
          }}>
            Smart logistics for professionals
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}