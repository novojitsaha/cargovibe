import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const destinationsData = [
  { id: '1', name: 'Amsterdam Central Station', address: 'Stationsplein, 1012 AB Amsterdam', type: 'station' },
  { id: '2', name: 'Rotterdam Port', address: 'Wilhelminakade 909, 3072 AP Rotterdam', type: 'port' },
  { id: '3', name: 'Schiphol Airport', address: 'Evert van de Beekstraat 202, 1118 CP Schiphol', type: 'airport' },
  { id: '4', name: 'Utrecht Centraal', address: 'Stationshal 1, 3511 CE Utrecht', type: 'station' },
  { id: '5', name: 'The Hague City Center', address: 'Spui 70, 2511 BT Den Haag', type: 'city' },
  { id: '6', name: 'Eindhoven Technology Hub', address: 'De Lampendriessen 25, 5611 GE Eindhoven', type: 'business' },
];

export default function DestinationInput() {
  const [destination, setDestination] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredDestinations = destination.length > 0 
    ? destinationsData.filter(dest =>
        dest.name.toLowerCase().includes(destination.toLowerCase()) ||
        dest.address.toLowerCase().includes(destination.toLowerCase())
      )
    : destinationsData;

  const handleDestinationSelect = (dest: any) => {
    setSelectedDestination(dest);
    setDestination(dest.name);
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'airport': return 'airplane';
      case 'port': return 'boat';
      case 'station': return 'train';
      case 'city': return 'location';
      case 'business': return 'business';
      default: return 'location';
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity 
        onPress={openModal}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f9fafb',
          borderWidth: 2,
          borderColor: selectedDestination ? '#8b5cf6' : '#e5e7eb',
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Ionicons name="search" size={20} color="#6b7280" />
        <Text style={{
          flex: 1,
          fontSize: 16,
          color: selectedDestination ? '#1f2937' : '#9ca3af',
          marginLeft: 12,
          fontWeight: selectedDestination ? '500' : '400',
        }}>
          {selectedDestination ? selectedDestination.name : 'Where to?'}
        </Text>
        {selectedDestination && (
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              setSelectedDestination(null);
              setDestination('');
            }}
            style={{ marginLeft: 8 }}
          >
            <Ionicons name="close-circle" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
        <Ionicons name="chevron-down" size={20} color="#9ca3af" style={{ marginLeft: 8 }} />
      </TouchableOpacity>

      {/* Native-style Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#e5e7eb',
          }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1f2937' }}>
              Select Destination
            </Text>
            <TouchableOpacity 
              onPress={() => setShowModal(false)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#f3f4f6',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="close" size={18} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={{
            margin: 20,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f3f4f6',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}>
            <Ionicons name="search" size={18} color="#6b7280" />
            <TextInput
              placeholder="Search destinations..."
              placeholderTextColor="#9ca3af"
              value={destination}
              onChangeText={setDestination}
              style={{
                flex: 1,
                fontSize: 16,
                color: '#1f2937',
                marginLeft: 12,
              }}
              autoFocus={true}
            />
          </View>

          {/* Destinations list */}
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            {filteredDestinations.map((item, index) => (
              <TouchableOpacity 
                key={item.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 16,
                  borderBottomWidth: index < filteredDestinations.length - 1 ? 1 : 0,
                  borderBottomColor: '#f3f4f6',
                }}
                onPress={() => handleDestinationSelect(item)}
              >
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#8b5cf6',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}>
                  <Ionicons 
                    name={getIconForType(item.type)} 
                    size={20} 
                    color="white" 
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    color: '#1f2937', 
                    fontSize: 16,
                    fontWeight: '500',
                    marginBottom: 4,
                  }}>
                    {item.name}
                  </Text>
                  <Text style={{ 
                    color: '#6b7280', 
                    fontSize: 14,
                  }}>
                    {item.address}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}