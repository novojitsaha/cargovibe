import React, { useState, useMemo, useCallback } from 'react';
import { ParkingList, FilterType } from '../components/screens/parking';
import { mockParkingSpots } from '../data/mockData';

interface ParkingScreenProps {
  onNavigateToDestination: () => void;
}

export default function ParkingScreen({ onNavigateToDestination }: ParkingScreenProps) {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  const filteredSpots = useMemo(() => {
    if (activeFilters.length === 0) {
      return mockParkingSpots;
    }
    
    return mockParkingSpots.filter(spot => {
      return activeFilters.every(filter => {
        switch (filter) {
          case 'available':
            return spot.status === 'available';
          case 'free':
            return spot.type === 'free';
          case 'private':
            return spot.name.toLowerCase().includes('private') || spot.name.toLowerCase().includes('depot');
          default:
            return false;
        }
      });
    });
  }, [activeFilters]);

  const toggleFilter = useCallback((filter: FilterType) => {
    setActiveFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  }, []);

  const handleReserve = useCallback((spotId: string) => {
    console.log('Reserving spot:', spotId);
    // Implement reservation logic here
  }, []);

  return (
    <ParkingList
      spots={filteredSpots}
      activeFilters={activeFilters}
      onNavigateToDestination={onNavigateToDestination}
      onToggleFilter={toggleFilter}
      onReserveSpot={handleReserve}
    />
  );
}