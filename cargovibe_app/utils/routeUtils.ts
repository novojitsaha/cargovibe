import { Location, ParkingSpot, currentLocation } from '../data/mockData';

export interface RouteData {
  origin: Location;
  destination: Location;
  route: [number, number][];
  distance: number;
  duration: number;
}

export function calculateRoute(destination: Location): RouteData {
  const latDiff = destination.lat - currentLocation.lat;
  const lngDiff = destination.lng - currentLocation.lng;
  
  const waypoints: [number, number][] = [];
  const numWaypoints = 8;
  
  for (let i = 0; i <= numWaypoints; i++) {
    const progress = i / numWaypoints;
    const curvature = Math.sin(progress * Math.PI) * 0.02;
    
    const lat = currentLocation.lat + (latDiff * progress) + curvature;
    const lng = currentLocation.lng + (lngDiff * progress) + (curvature * 0.5);
    
    waypoints.push([lat, lng]);
  }
  
  const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111;
  const duration = Math.round(distance * 1.2);
  
  return {
    origin: currentLocation,
    destination,
    route: waypoints,
    distance: Math.round(distance),
    duration
  };
}

export function filterParkingSpots(
  allSpots: ParkingSpot[], 
  destination: Location | null,
  maxTimeToReach: number = 180
): ParkingSpot[] {
  if (!destination) {
    return [];
  }

  return allSpots.filter(spot => {
    const isOnRoute = spot.routeId === destination.id;
    const isReachable = spot.timeToReach <= maxTimeToReach;
    const isNearCurrent = spot.timeToReach <= 60;
    
    return (isOnRoute || isNearCurrent) && isReachable;
  });
}

export function filterByAvailability(
  spots: ParkingSpot[], 
  showOnlyAvailable: boolean = false
): ParkingSpot[] {
  if (!showOnlyAvailable) {
    return spots;
  }
  return spots.filter(spot => spot.status === 'available');
}

export function filterByType(
  spots: ParkingSpot[], 
  type?: 'free' | 'paid'
): ParkingSpot[] {
  if (!type) {
    return spots;
  }
  return spots.filter(spot => spot.type === type);
}

export function sortSpotsByTime(spots: ParkingSpot[]): ParkingSpot[] {
  return [...spots].sort((a, b) => a.timeToReach - b.timeToReach);
}

export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

export function getRouteSummary(routeData: RouteData): {
  destination: string;
  distance: string;
  duration: string;
} {
  return {
    destination: routeData.destination.name,
    distance: `${routeData.distance}km`,
    duration: formatTime(routeData.duration)
  };
}