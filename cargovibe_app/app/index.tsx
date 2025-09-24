import React, { useRef } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MapComponent, MapComponentRef, BottomPanel } from "../components/layout";

export default function Index() {
  const mapRef = useRef<MapComponentRef>(null);

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-gray-100">
        <MapComponent ref={mapRef} />
        <BottomPanel mapRef={mapRef} />
      </View>
    </GestureHandlerRootView>
  );
}
