import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import ParkingListSheet from "../(bottomsheets)/ParkingListSheet";
import SearchSheet from "../(bottomsheets)/SearchSheet";
export default function MyBottomSheet() {
  const searchSheetRef = useRef<BottomSheetModal>(null);
  const parkingListSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = ["60%"];
  useEffect(() => {
    searchSheetRef.current?.present();
  }, []);

  const openParkingListSheet = () => {
    parkingListSheetRef.current?.present();
  };

  return (
    <>
      <BottomSheetModal
        ref={searchSheetRef}
        snapPoints={snapPoints}
        index={0}
        stackBehavior="push"
        keyboardBehavior="extend"
      >
        <SearchSheet handleSearchButtonPress={openParkingListSheet} />
      </BottomSheetModal>

      <BottomSheetModal
        ref={parkingListSheetRef}
        snapPoints={snapPoints}
        index={1}
        stackBehavior="push"
        keyboardBehavior="extend"
      >
        <ParkingListSheet />
      </BottomSheetModal>
    </>
  );
}
