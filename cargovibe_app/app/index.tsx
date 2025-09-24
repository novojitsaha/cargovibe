import React, { useCallback, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MapComponent } from "../components/layout";
import DestinationScreen from "../screens/DestinationScreen";
import ParkingScreen from "../screens/ParkingScreen";

export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '60%', '85%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    // Handle bottom sheet position changes if needed
  }, []);

  const [currentScreen, setCurrentScreen] = useState<'destination' | 'parking'>('destination');
  const navigateToParking = () => {
    setCurrentScreen('parking');
  };

  const navigateToDestination = () => {
    setCurrentScreen('destination');
  };

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
          enableContentPanningGesture={false}
          handleIndicatorStyle={{
            backgroundColor: '#d1d5db',
            width: 48,
            height: 4,
          }}
        >
          {currentScreen === 'destination' ? (
            <DestinationScreen onNavigateToParking={navigateToParking} />
          ) : (
            <ParkingScreen onNavigateToDestination={navigateToDestination} />
          )}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
