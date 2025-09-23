import React from "react";
import { View } from "react-native";
import MapComponent from "../components/MapComponent";
import BottomPanel from "../components/BottomPanel";

export default function Index() {
  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-[0.4]">
        <MapComponent />
      </View>
      
      <View className="flex-[0.6]">
        <BottomPanel />
      </View>
    </View>
  );
}
