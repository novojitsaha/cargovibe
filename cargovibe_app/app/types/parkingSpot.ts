export default interface ParkingSpotType {
  name: string;
  location: string;
  driving_time: string;
  availability: number;
  price: string | null;
  reservable: boolean;
}