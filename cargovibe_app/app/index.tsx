import React, { useCallback, useMemo, useRef } from "react";
import { View } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapComponent from "../components/MapComponent";
import BottomPanel from "../components/BottomPanel";

export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '60%', '85%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    // Handle bottom sheet position changes if needed
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-gray-100">
        <MapComponent />
        
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={false}
          handleIndicatorStyle={{
            backgroundColor: '#d1d5db',
            width: 48,
            height: 4,
          }}
        >
          <BottomSheetView className="flex-1">
            <BottomPanel />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
