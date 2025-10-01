import { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import parkingData from "../../assets/dummyData/mock_parking_spots.json";
import ParkingSpotType from "../types/parkingSpot";

interface ParkingListSheetProps {
  handleBackButtonPress: () => void;

  setParkingSpot: Dispatch<SetStateAction<ParkingSpotType | undefined>>;
}

const ParkingListSheet = ({
  handleBackButtonPress,
  setParkingSpot,
}: ParkingListSheetProps) => {
  const data = useMemo(() => parkingData as ParkingSpotType[], []);

  const handleParkingSpotPress = useCallback(
    (item: ParkingSpotType) => {
      setParkingSpot(item);
    },
    [setParkingSpot]
  );

  const getPriceColor = useCallback((availability: number) => {
    if (availability > 0) return "#16a34a"; // green-600
    if (availability === 0) return "#dc2626"; // red-600
    return "#4b5563"; // gray-600
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ParkingSpotType }) => (
      <TouchableOpacity
        onPress={() => handleParkingSpotPress(item)}
        className="bg-white rounded-lg p-4 mb-3 border border-gray-200 shadow-sm"
      >
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-lg font-bold text-gray-900 flex-1 mr-2">
            {item.name}
          </Text>
          <View className="flex-row items-center">
            <View
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: getPriceColor(item.availability) }}
            />
            <Text className="text-sm font-semibold text-gray-700">
              {item.availability} spots
            </Text>
          </View>
        </View>

        <Text className="text-sm text-gray-600 mb-2">{item.location}</Text>

        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-blue-600 font-medium">
            {item.driving_time}
          </Text>
          <View className="flex-row items-center">
            {item.price && (
              <Text className="text-lg font-bold mr-3">{item.price}</Text>
            )}
            {item.reservable && (
              <View className="bg-blue-100 px-2 py-1 rounded">
                <Text className="text-xs text-blue-700 font-medium">
                  Reservable
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    ),
    [handleParkingSpotPress, getPriceColor]
  );

  return (
    <BottomSheetView className="mx-8 pb-12">
      {/* Header with back button */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity
          onPress={handleBackButtonPress}
          className="p-2 rounded-full bg-primary border border-black"
        >
          <Text className="text-2xl text-center font-bold text-white">←</Text>
        </TouchableOpacity>
        <Text className="text-2xl text-center font-bold flex-1 mr-10">
          Parking Spots
        </Text>
      </View>

      {/* Filter Labels */}
      <View className="flex-row justify-center mb-4 gap-4">
        <TouchableOpacity className="bg-purple-200 px-4 py-2 rounded-full border border-purple-400">
          <Text className="text-purple-800 font-medium">Available</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-purple-200 px-4 py-2 rounded-full border border-purple-400">
          <Text className="text-purple-800 font-medium">Free</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-purple-200 px-4 py-2 rounded-full border border-purple-400">
          <Text className="text-purple-800 font-medium">Private</Text>
        </TouchableOpacity>
      </View>

      <BottomSheetFlatList
        data={data}
        keyExtractor={(item: ParkingSpotType) => item.name}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheetView>
  );
};

export default ParkingListSheet;
