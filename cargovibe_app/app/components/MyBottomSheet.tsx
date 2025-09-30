import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { Keyboard } from "react-native";
import ParkingListSheet from "../(bottomsheets)/ParkingListSheet";
import SearchSheet from "../(bottomsheets)/SearchSheet";
export default function MyBottomSheet() {
  const searchSheetRef = useRef<BottomSheetModal>(null);
  const parkingListSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    searchSheetRef.current?.present();
  }, []);

  const openParkingListSheet = useCallback(() => {
    Keyboard.dismiss(); // Dismiss the keyboard first
    parkingListSheetRef.current?.present();
  }, []);

  const closeParkingListSheet = useCallback(() => {
    parkingListSheetRef.current?.dismiss();
  }, []);

  const handleParkingSpotPress = useCallback(() => {

    console.log("Parking spot pressed");
  }, []);

  return (
    <>
      <BottomSheetModal
        ref={searchSheetRef}
        snapPoints={["25%", "60%"]}
        index={1}

        keyboardBehavior="extend"
        enablePanDownToClose={false}
      >
        <SearchSheet handleSearchButtonPress={openParkingListSheet} />
      </BottomSheetModal>

      <BottomSheetModal
        ref={parkingListSheetRef}
        snapPoints={["80%"]}
        index={1}
        stackBehavior="switch"
        keyboardBehavior="extend"
        enablePanDownToClose={true}
      >
        <ParkingListSheet 
          handleBackButtonPress={closeParkingListSheet}
          handleParkingSpotPress={handleParkingSpotPress}
        />
      </BottomSheetModal>
    </>
  );
}
