import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ParkingListSheetProps {
  handleBackButtonPress: () => void;
  handleParkingSpotPress: () => void;
}

// interface ParkingSpot {
//   name: string;
//   location: string;
//   driving_time: string;
//   availability: number;
//   price: string | null;
//   reservable: boolean;
// }
const ParkingListSheet = ({ handleBackButtonPress }: ParkingListSheetProps) => {
  // const renderItem = useCallback(
  //   ({ item:ParkingSpot }) => (
  //     <View >
  //       <Text>{item}</Text>
  //     </View>
  //   ),
  //   []
  // );

  return (
    <BottomSheetView className="mx-8 pb-12">
      {/* Header with back button */}
      <View className="flex-row items-center justify-between">
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

      {/* <BottomSheetFlatList
        data={parkingData}
        keyExtractor={(i) => i}
        renderItem={renderItem}
      /> */}
    </BottomSheetView>
  );
};

export default ParkingListSheet;
