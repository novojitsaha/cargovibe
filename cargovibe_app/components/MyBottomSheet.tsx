import { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MyBottomSheet() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [destination, setDestination] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<string>("");

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={["30%", "80%"]} index={1}>
      <BottomSheetScrollView style={{ flex: 1, padding: 20 }}>
        {/* Headline */}
        <Text className="text-2xl text-center font-bold mb-4">
          Set your destination
        </Text>

        <View className="flex-row items-center gap-4 mb-4">
          {/* Destination Input Field */}
          <TextInput
            value={destination}
            onChangeText={setDestination}
            placeholder="Where to?"
            className="flex-[2] border border-black rounded-lg placeholder:text-black px-3 h-12"
          />
          {/* Mic button */}
          <TouchableOpacity
            onPress={() => {}}
            className="flex-[1] border border-black bg-primary rounded-lg items-center justify-center h-12"
          >
            <Ionicons name="mic" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-4">
          {/* Destination Input Field */}
          <TextInput
            value={remainingTime}
            onChangeText={setRemainingTime}
            placeholder="Restlenkzeit?"
            className="flex-[2] border border-black rounded-lg placeholder:text-black px-3 h-12"
          />
          {/* Mic button */}
          <TouchableOpacity
            onPress={() => {}}
            className="flex-[1] border border-black bg-primary rounded-lg items-center justify-center h-12"
          >
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
