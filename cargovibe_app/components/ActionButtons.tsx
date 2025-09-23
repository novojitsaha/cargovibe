import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ActionButtons() {
  return (
    <View style={{ flexDirection: 'row', gap: 16, marginBottom: 24 }}>
      {/* Analytics/Chart Button */}
      <TouchableOpacity style={{
        backgroundColor: '#8b5cf6',
        borderRadius: 16,
        padding: 16,
        flex: 1,
        shadowColor: '#8b5cf6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="analytics" size={28} color="white" />
          <Text style={{
            color: 'white',
            fontWeight: '600',
            marginTop: 8,
            fontSize: 14,
          }}>
            Analytics
          </Text>
        </View>
      </TouchableOpacity>
      
      {/* Settings/Key Button */}
      <TouchableOpacity style={{
        backgroundColor: '#6366f1',
        borderRadius: 16,
        padding: 16,
        flex: 1,
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="settings" size={28} color="white" />
          <Text style={{
            color: 'white',
            fontWeight: '600',
            marginTop: 8,
            fontSize: 14,
          }}>
            Settings
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}