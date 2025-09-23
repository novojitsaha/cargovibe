import React from "react";
import { View } from "react-native";
import MapComponent from "../components/MapComponent";
import BottomPanel from "../components/BottomPanel";

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      {/* Map takes 40% of the screen */}
      <View style={{ flex: 0.4 }}>
        <MapComponent />
      </View>
      
      {/* Bottom panel takes 60% of the screen */}
      <View style={{ flex: 0.6 }}>
        <BottomPanel />
      </View>
    </View>
  );
}
