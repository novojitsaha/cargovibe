import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../utils/cn';

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
    <View className="mb-5">
      <TouchableOpacity 
        onPress={openModal}
        className={cn(
          "flex-row items-center bg-gray-50 border-2 rounded-2xl px-4 py-4",
          selectedDestination ? "border-primary" : "border-gray-200"
        )}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Ionicons name="search" size={20} color="#6b7280" />
        <Text className={cn(
          "flex-1 text-base ml-3",
          selectedDestination ? "text-gray-800 font-medium" : "text-gray-400"
        )}>
          {selectedDestination ? selectedDestination.name : 'Where to?'}
        </Text>
        {selectedDestination && (
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              setSelectedDestination(null);
              setDestination('');
            }}
            className="ml-2"
          >
            <Ionicons name="close-circle" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
        <Ionicons name="chevron-down" size={20} color="#9ca3af" className="ml-2" />
      </TouchableOpacity>

      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 bg-white">
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200">
            <Text className="text-lg font-semibold text-gray-800">
              Select Destination
            </Text>
            <TouchableOpacity 
              onPress={() => setShowModal(false)}
              className="w-8 h-8 rounded-2xl bg-gray-100 items-center justify-center"
            >
              <Ionicons name="close" size={18} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View className="m-5 flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
            <Ionicons name="search" size={18} color="#6b7280" />
            <TextInput
              placeholder="Search destinations..."
              placeholderTextColor="#9ca3af"
              value={destination}
              onChangeText={setDestination}
              className="flex-1 text-base text-gray-800 ml-3"
              autoFocus={true}
            />
          </View>

          <View className="flex-1 px-5">
            {filteredDestinations.map((item, index) => (
              <TouchableOpacity 
                key={item.id}
                className={cn(
                  "flex-row items-center py-4",
                  index < filteredDestinations.length - 1 && "border-b border-gray-100"
                )}
                onPress={() => handleDestinationSelect(item)}
              >
                <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mr-4">
                  <Ionicons 
                    name={getIconForType(item.type)} 
                    size={20} 
                    color="white" 
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 text-base font-medium mb-1">
                    {item.name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
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