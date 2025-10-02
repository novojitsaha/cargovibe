import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface SearchSheetProps {
  handleSearchButtonPress: () => void;
}

const SearchSheet = ({ handleSearchButtonPress }: SearchSheetProps) => {
  const [destination, setDestination] = useState<string>("");
  const [restlenkzeit, setRestlenkzeit] = useState<string>("0.5");
  const [pickerVisible, setPickerVisible] = useState(false);

  const timeOptions = [
    { label: "0.5 hours", value: "0.5" },
    { label: "1 hour", value: "1" },
    { label: "1.5 hours", value: "1.5" },
    { label: "2 hours", value: "2" },
    { label: "2.5 hours", value: "2.5" },
    { label: "3 hours", value: "3" },
    { label: "3.5 hours", value: "3.5" },
    { label: "4 hours", value: "4" },
    { label: "4.5 hours", value: "4.5" },
  ];

  const selectedLabel = timeOptions.find(
    (opt) => opt.value === restlenkzeit
  )?.label;

  return (
    <BottomSheetView className="mx-8 pb-12">
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
        {/* Restlenzkeit Picker */}
        <TouchableOpacity
          onPress={() => setPickerVisible(true)}
          className="flex-[2] border border-black rounded-lg h-12 justify-center px-3"
        >
          <Text>{selectedLabel}</Text>
        </TouchableOpacity>
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

      {/* Picker Modal */}
      <Modal
        visible={pickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setPickerVisible(false)}
          className="flex-1 justify-center items-center bg-black/50"
        >
          <View className="bg-white rounded-lg w-4/5 max-h-96">
            <FlatList
              data={timeOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setRestlenkzeit(item.value);
                    setPickerVisible(false);
                  }}
                  className="p-4 border-b border-gray-200"
                >
                  <Text
                    className={
                      restlenkzeit === item.value ? "font-bold" : ""
                    }
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </BottomSheetView>
  );
};

export default SearchSheet;
