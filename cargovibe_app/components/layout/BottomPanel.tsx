import React, { useCallback, useMemo, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import DestinationScreen from '../../screens/DestinationScreen';
import ParkingScreen from '../../screens/ParkingScreen';
import { Location, ParkingSpot, mockParkingSpots } from '../../data/mockData';
import { RouteData, calculateRoute, filterParkingSpots } from '../../utils/routeUtils';
import { MapComponentRef } from './MapComponent';

export interface BottomPanelRef {
  snapToIndex: (index: number) => void;
}

interface BottomPanelProps {
  mapRef: React.RefObject<MapComponentRef | null>;
}

const BottomPanel = forwardRef<BottomPanelRef, BottomPanelProps>(({ mapRef }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '60%', '85%'], []);
  const snapValues = useMemo(() => [0.2, 0.6, 0.85], []);
  
  const [currentScreen, setCurrentScreen] = useState<'destination' | 'parking'>('destination');
  const [selectedDestination, setSelectedDestination] = useState<Location | null>(null);
  const [restTime, setRestTime] = useState<number>(2);
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [currentSnapIndex, setCurrentSnapIndex] = useState<number>(1);
  
  const baseParkingSpots = useMemo(() => {
    if (!selectedDestination || !routeData) return [];
    return filterParkingSpots(mockParkingSpots, selectedDestination, restTime * 60);
  }, [selectedDestination, routeData, restTime]);

  const selectedDestinationRef = useRef(selectedDestination);
  const routeDataRef = useRef(routeData);
  
  selectedDestinationRef.current = selectedDestination;
  routeDataRef.current = routeData;

  useImperativeHandle(ref, () => ({
    snapToIndex: (index: number) => {
      bottomSheetRef.current?.snapToIndex(index);
    }
  }));

  const handleSheetChanges = useCallback((index: number) => {
    setCurrentSnapIndex(index);
    mapRef.current?.updateMap({
      destination: selectedDestinationRef.current,
      route: routeDataRef.current?.route || null,
      parkingSpots: [],
      bottomPanelHeight: snapValues[index]
    });
  }, [mapRef, snapValues]);

  const handleFilteredSpotsChange = useCallback((filteredSpots: ParkingSpot[]) => {
    mapRef.current?.updateMap({
      destination: selectedDestinationRef.current,
      route: routeDataRef.current?.route || null,
      parkingSpots: filteredSpots,
      bottomPanelHeight: snapValues[currentSnapIndex]
    });
  }, [mapRef, snapValues, currentSnapIndex]);

  const handleDestinationSelect = useCallback((destination: Location | null) => {
    setSelectedDestination(destination);
    
    if (!destination) {
      setRouteData(null);
      mapRef.current?.updateMap({
        destination: null,
        route: null,
        parkingSpots: [],
        bottomPanelHeight: snapValues[currentSnapIndex]
      });
    } else {
      const route = calculateRoute(destination);
      setRouteData(route);
      
      mapRef.current?.updateMap({
        destination: destination,
        route: route.route,
        parkingSpots: [],
        bottomPanelHeight: snapValues[currentSnapIndex]
      });
    }
  }, [mapRef, snapValues, currentSnapIndex]);

  const handleRestTimeChange = useCallback((time: number) => {
    setRestTime(time);
  }, []);

  const handleSearchParkingSpots = useCallback(() => {
    if (!selectedDestination || !routeData) return;

    const maxTimeMinutes = restTime * 60;
    const spots = filterParkingSpots(mockParkingSpots, selectedDestination, maxTimeMinutes);

    mapRef.current?.updateMap({
      destination: selectedDestination,
      route: routeData.route,
      parkingSpots: spots,
      bottomPanelHeight: snapValues[1]
    });

    setCurrentScreen('parking');
    bottomSheetRef.current?.snapToIndex(1);
  }, [selectedDestination, routeData, restTime, mapRef, snapValues]);

  const navigateToDestination = useCallback(() => {
    setCurrentScreen('destination');
    
    mapRef.current?.updateMap({
      destination: selectedDestination,
      route: selectedDestination ? routeData?.route || null : null,
      parkingSpots: [],
      bottomPanelHeight: snapValues[1]
    });
    
    bottomSheetRef.current?.snapToIndex(1);
  }, [selectedDestination, routeData, mapRef, snapValues]);

  const handleReserveSpot = useCallback((spotId: string) => {
    alert(`Spot ${spotId} reserved successfully!`);
  }, []);

  return (
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
        <DestinationScreen 
          selectedDestination={selectedDestination}
          onDestinationSelect={handleDestinationSelect}
          restTime={restTime}
          onRestTimeChange={handleRestTimeChange}
          onSearchParkingSpots={handleSearchParkingSpots}
          routeData={routeData}
        />
      ) : (
        <ParkingScreen 
          parkingSpots={baseParkingSpots}
          onNavigateToDestination={navigateToDestination} 
          onReserveSpot={handleReserveSpot}
          onFilteredSpotsChange={handleFilteredSpotsChange}
          routeData={routeData}
        />
      )}
    </BottomSheet>
  );
});

BottomPanel.displayName = 'BottomPanel';

export default BottomPanel;