export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type?: 'city' | 'airport' | 'port' | 'station' | 'business';
}

export interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance: string;
  timeToReach: number;
  status: 'available' | 'occupied';
  type: 'free' | 'paid';
  price?: string;
  private: boolean;
  routeId?: string;
}

export const currentLocation: Location = {
  id: 'current',
  name: 'Current Location',
  address: 'Bamberg, Germany',
  lat: 49.8988,
  lng: 10.9027,
  type: 'city'
};

export const mockDestinations: Location[] = [
  {
    id: 'munich',
    name: 'Munich',
    address: 'Munich, Bavaria, Germany',
    lat: 48.1351,
    lng: 11.5820,
    type: 'city'
  },
  {
    id: 'nuremberg',
    name: 'Nuremberg',
    address: 'Nuremberg, Bavaria, Germany',
    lat: 49.4521,
    lng: 11.0767,
    type: 'city'
  },
  {
    id: 'frankfurt',
    name: 'Frankfurt am Main',
    address: 'Frankfurt am Main, Hesse, Germany',
    lat: 50.1109,
    lng: 8.6821,
    type: 'city'
  },
  {
    id: 'stuttgart',
    name: 'Stuttgart',
    address: 'Stuttgart, Baden-Württemberg, Germany',
    lat: 48.7758,
    lng: 9.1829,
    type: 'city'
  },
  {
    id: 'cologne',
    name: 'Cologne',
    address: 'Cologne, North Rhine-Westphalia, Germany',
    lat: 50.9375,
    lng: 6.9603,
    type: 'city'
  }
];

export const mockParkingSpots: ParkingSpot[] = [
  {
    id: '1',
    name: 'Autohof Nürnberg-Feucht',
    address: 'A9 Autohof, 90537 Feucht',
    lat: 49.3847,
    lng: 11.2264,
    distance: '45 mins away',
    timeToReach: 45,
    status: 'available',
    type: 'paid',
    price: '€8/hr',
    private: false,
    routeId: 'munich'
  },
  {
    id: '2',
    name: 'Truck Stop Ingolstadt',
    address: 'A9 Service Area, 85055 Ingolstadt',
    lat: 48.7665,
    lng: 11.4250,
    distance: '1h 20mins away',
    timeToReach: 80,
    status: 'available',
    type: 'free',
    private: false,
    routeId: 'munich'
  },
  {
    id: '3',
    name: 'Pfaffenhofen Rest Area',
    address: 'A9 Rest Stop, 85276 Pfaffenhofen',
    lat: 48.5300,
    lng: 11.5000,
    distance: '1h 45mins away',
    timeToReach: 105,
    status: 'occupied',
    type: 'paid',
    price: '€12/hr',
    private: false,
    routeId: 'munich'
  },
  {
    id: '4',
    name: 'Forchheim Truck Depot',
    address: 'Industrial Area, 91301 Forchheim',
    lat: 49.7195,
    lng: 11.0581,
    distance: '25 mins away',
    timeToReach: 25,
    status: 'available',
    type: 'paid',
    price: '€15/hr',
    private: false,
    routeId: 'nuremberg'
  },
  {
    id: '5',
    name: 'Erlangen Service Center',
    address: 'A73 Exit, 91054 Erlangen',
    lat: 49.5897,
    lng: 11.0040,
    distance: '35 mins away',
    timeToReach: 35,
    status: 'available',
    type: 'free',
    private: false,
    routeId: 'nuremberg'
  },
  {
    id: '6',
    name: 'Schweinfurt Truck Plaza',
    address: 'A70 Service Area, 97421 Schweinfurt',
    lat: 50.0412,
    lng: 10.2115,
    distance: '55 mins away',
    timeToReach: 55,
    status: 'available',
    type: 'paid',
    price: '€10/hr',
    private: false,
    routeId: 'frankfurt'
  },
  {
    id: '7',
    name: 'Würzburg Highway Stop',
    address: 'A3 Rest Area, 97080 Würzburg',
    lat: 49.7913,
    lng: 9.9534,
    distance: '1h 15mins away',
    timeToReach: 75,
    status: 'occupied',
    type: 'free',
    private: false,
    routeId: 'frankfurt'
  },
  {
    id: '8',
    name: 'Aschaffenburg Depot',
    address: 'A3 Commercial Zone, 63739 Aschaffenburg',
    lat: 49.9777,
    lng: 9.1506,
    distance: '1h 50mins away',
    timeToReach: 110,
    status: 'available',
    type: 'paid',
    price: '€18/hr',
    private: false,
    routeId: 'frankfurt'
  },
  {
    id: '9',
    name: 'Ansbach Logistics Hub',
    address: 'A6 Service Center, 91522 Ansbach',
    lat: 49.2988,
    lng: 10.5710,
    distance: '1h 5mins away',
    timeToReach: 65,
    status: 'available',
    type: 'paid',
    price: '€14/hr',
    private: false,
    routeId: 'stuttgart'
  },
  {
    id: '10',
    name: 'Heilbronn Truck Stop',
    address: 'A6 Highway Exit, 74072 Heilbronn',
    lat: 49.1427,
    lng: 9.2109,
    distance: '1h 45mins away',
    timeToReach: 105,
    status: 'available',
    type: 'free',
    private: false,
    routeId: 'stuttgart'
  },
  {
    id: '11',
    name: 'Fulda Transport Center',
    address: 'A7 Service Area, 36037 Fulda',
    lat: 50.5558,
    lng: 9.6808,
    distance: '1h 30mins away',
    timeToReach: 90,
    status: 'occupied',
    type: 'paid',
    price: '€16/hr',
    private: false,
    routeId: 'cologne'
  },
  {
    id: '12',
    name: 'Kassel Truck Plaza',
    address: 'A7 Commercial Area, 34117 Kassel',
    lat: 51.3127,
    lng: 9.4797,
    distance: '2h 15mins away',
    timeToReach: 135,
    status: 'available',
    type: 'paid',
    price: '€12/hr',
    private: false,
    routeId: 'cologne'
  },
  {
    id: '13',
    name: 'Bamberg Private Depot',
    address: 'Local Industrial Zone, 96047 Bamberg',
    lat: 49.8800,
    lng: 10.9200,
    distance: '12 mins away',
    timeToReach: 12,
    status: 'available',
    type: 'free',
    private: true,
    routeId: 'local'
  },
  {
    id: '14',
    name: 'Coburg Highway Rest',
    address: 'A73 Service Area, 96450 Coburg',
    lat: 50.2596,
    lng: 10.9644,
    distance: '30 mins away',
    timeToReach: 30,
    status: 'available',
    type: 'free',
    private: false
  },
  {
    id: '15',
    name: 'Bayreuth Private Logistics Depot',
    address: 'A9 Commercial Zone, 95448 Bayreuth',
    lat: 49.9419,
    lng: 11.5753,
    distance: '40 mins away',
    timeToReach: 40,
    status: 'available',
    type: 'free',
    private: true,
    routeId: 'local'
  }
];