import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { Alert, Platform, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import ParkingSpotType from "../types/parkingSpot";
interface ConfirmParkingSheetProps {
  parkingSpot: ParkingSpotType | undefined;
  // handleReserveButtotPress: () => void;
  // handleDirectionButtonPress: () => void;
  handleBackButtonPress: () => void;
}

const ConfirmParkingSheet = ({
  parkingSpot,
  handleBackButtonPress,
}: ConfirmParkingSheetProps) => {

  const handleReserveButtonPress = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Parking spot reserved!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Success", "Parking spot reserved!");
    }
  }

  
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
          Confirm Parking Spot
        </Text>
      </View>

      {/* Parking Spot Details */}
      {parkingSpot ? (
        <View className="bg-gray-50 rounded-lg p-4 ">
          <Text className="text-xl font-bold text-center">Details</Text>

          {/* Display all properties dynamically */}
          {Object.entries(parkingSpot).map(([key, value]) => (
            <View
              key={key}
              className="py-3 border-b border-gray-200"
            >
              <Text className="text font-semibold text-gray-600 capitalize">
                {key}:
              </Text>
              <Text className="text-xl text-gray-800 mt-1">
                {typeof value === "object" && value !== null
                  ? JSON.stringify(value, null, 2)
                  : String(value || "N/A")}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View className="bg-red-50 rounded-lg p-4">
          <Text className="text-red-600 text-center">
            No parking spot selected
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      {parkingSpot && (
        <View className="mt-6 gap-4">
          {/* Direction Button */}
          <TouchableOpacity className="bg-primary rounded-lg py-4 px-6">
            <Text className="text-white text-center text-lg font-semibold">
              Direction
            </Text>
          </TouchableOpacity>

          {/* Reserve Button */}
          <TouchableOpacity 
            className={`rounded-lg py-4 px-6 ${
              parkingSpot.reservable === false 
                ? 'bg-gray-400' 
                : 'bg-primary'
            }`}
            disabled={parkingSpot.reservable === false}
            onPress={handleReserveButtonPress}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Reserve
            </Text>
          </TouchableOpacity>
        </View>
      )}

      
    </BottomSheetView>
  );
};

export default ConfirmParkingSheet;
