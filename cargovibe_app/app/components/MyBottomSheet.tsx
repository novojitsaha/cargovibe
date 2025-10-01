import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard } from "react-native";
import ConfirmParkingSheet from "../(bottomsheets)/ConfirmParkingSheet";
import ParkingListSheet from "../(bottomsheets)/ParkingListSheet";
import SearchSheet from "../(bottomsheets)/SearchSheet";
import ParkingSpotType from "../types/parkingSpot";
export default function MyBottomSheet() {
  const searchSheetRef = useRef<BottomSheetModal>(null);
  const parkingListSheetRef = useRef<BottomSheetModal>(null);
  const ConfirmParkingSheetRef = useRef<BottomSheetModal>(null);
  const [parkingSpot, setParkingSpot] = useState<ParkingSpotType | undefined>(
    undefined
  );

  useEffect(() => {
    searchSheetRef.current?.present();
  }, []);

  // Add this useEffect to open ConfirmParkingSheet when parkingSpot is set
  useEffect(() => {
    if (parkingSpot) {
      openConfirmParkingSheet();
    }
  }, [parkingSpot]);

  const openParkingListSheet = useCallback(() => {
    Keyboard.dismiss(); // Dismiss the keyboard first
    parkingListSheetRef.current?.present();
  }, []);

  const closeParkingListSheet = useCallback(() => {
    parkingListSheetRef.current?.dismiss();
  }, []);

  const openConfirmParkingSheet = useCallback(() => {
    ConfirmParkingSheetRef.current?.present();
  }, []);

  const closeConfirmParkingSheet = useCallback(() => {
    ConfirmParkingSheetRef.current?.dismiss();
    setParkingSpot(undefined); // Reset parking spot when closing
  }, []);

  return (
    <>
      {/* Search Sheet Modal */}
      <BottomSheetModal
        ref={searchSheetRef}
        snapPoints={["25%", "60%"]}
        index={1}
        keyboardBehavior="extend"
        enablePanDownToClose={false}
      >
        <SearchSheet handleSearchButtonPress={openParkingListSheet} />
      </BottomSheetModal>
      {/* Parking List Sheet Modal */}
      <BottomSheetModal
        ref={parkingListSheetRef}
        snapPoints={["85%"]}
        index={1}
        stackBehavior="switch"
        keyboardBehavior="extend"
        enablePanDownToClose={true}
      >
        <ParkingListSheet
          handleBackButtonPress={closeParkingListSheet}
          setParkingSpot={setParkingSpot}
        />
      </BottomSheetModal>
      {/* Confirm Parking Sheet Modal */}
      <BottomSheetModal
        ref={ConfirmParkingSheetRef}
        snapPoints={["85%"]}
        index={1}
        stackBehavior="switch"
        keyboardBehavior="extend"
        enablePanDownToClose={true}
      >
        <ConfirmParkingSheet parkingSpot={parkingSpot}
        handleBackButtonPress={closeConfirmParkingSheet} />
      </BottomSheetModal>
    </>
  );
}
