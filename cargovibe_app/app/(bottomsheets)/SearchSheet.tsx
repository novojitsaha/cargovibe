import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface SearchSheetProps {
  handleSearchButtonPress: () => void;
}

const SearchSheet = ({ handleSearchButtonPress }: SearchSheetProps) => {
  const [destination, setDestination] = useState<string>("");

  const [restlenkzeit, setRestlenkzeit] = useState<string>("");

  return (
    <BottomSheetView className="mx-8 pb-12" >
      <View>
        {/* Headline */}
        <Text className="text-2xl text-center font-bold mb-4">
          Set your destination
        </Text>
      </View>

      <View className="flex-row mb-2 gap-4">
        {/* Destination Input Field */}
        <BottomSheetTextInput
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

      <View className="flex-row mb-2 gap-4">
        {/* Restlenzkeit Input Field */}
        <BottomSheetTextInput
          value={restlenkzeit}
          onChangeText={setRestlenkzeit}
          placeholder="Restlenkzeit?"
          className="flex-[2] border border-black rounded-lg placeholder:text-black px-3 h-12"
        />
        {/* SearchSheet button */}
        <TouchableOpacity
          onPress={() => {
            handleSearchButtonPress();
          }}
          className="flex-[1] border border-black bg-primary rounded-lg items-center justify-center h-12"
        >
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  );
};

export default SearchSheet;
