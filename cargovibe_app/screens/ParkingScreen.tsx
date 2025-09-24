import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ParkingList, FilterType, ParkingSpot } from '../components/screens/parking';
import { RouteData } from '../utils/routeUtils';

interface ParkingScreenProps {
  parkingSpots: ParkingSpot[];
  onNavigateToDestination: () => void;
  onReserveSpot: (spotId: string) => void;
  onFilteredSpotsChange: (filteredSpots: ParkingSpot[]) => void;
  routeData: RouteData | null;
}

export default function ParkingScreen({ 
  parkingSpots, 
  onNavigateToDestination, 
  onReserveSpot,
  onFilteredSpotsChange,
  routeData 
}: ParkingScreenProps) {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  useEffect(() => {
    if (parkingSpots.length === 0) {
      setActiveFilters([]);
    }
  }, [parkingSpots.length]);

  const filteredSpots = useMemo(() => {
    if (activeFilters.length === 0) {
      return parkingSpots;
    }
    
    return parkingSpots.filter(spot => {
      return activeFilters.every(filter => {
        switch (filter) {
          case 'available':
            return spot.status === 'available';
          case 'free':
            return spot.type === 'free';
          case 'private':
            return spot.private;
          default:
            return false;
        }
      });
    });
  }, [parkingSpots, activeFilters]);

  useEffect(() => {
    onFilteredSpotsChange(filteredSpots);
  }, [filteredSpots, onFilteredSpotsChange]);

  const toggleFilter = useCallback((filter: FilterType) => {
    setActiveFilters(prev => {
      return prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter];
    });
  }, []);

  const handleReserve = useCallback((spotId: string) => {
    onReserveSpot(spotId);
  }, [onReserveSpot]);

  return (
    <ParkingList
      spots={filteredSpots}
      activeFilters={activeFilters}
      onNavigateToDestination={onNavigateToDestination}
      onToggleFilter={toggleFilter}
      onReserveSpot={handleReserve}
      routeData={routeData}
    />
  );
}