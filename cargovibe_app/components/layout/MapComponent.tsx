import React, { useRef, useImperativeHandle, forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { currentLocation } from '../../data/mockData';

export interface MapComponentRef {
  updateMap: (data: {
    destination?: any;
    parkingSpots?: any[];
    route?: [number, number][] | null;
  }) => void;
}

const MapComponent = forwardRef<MapComponentRef>((_, ref) => {
  const webViewRef = useRef<WebView>(null);

  useImperativeHandle(ref, () => ({
    updateMap: (data) => {
      const message = JSON.stringify({
        type: 'updateMap',
        ...data
      });
      webViewRef.current?.postMessage(message);
    }
  }));

  // Memoize the HTML content so it never changes and doesn't cause WebView reloads
  const mapHtml = useMemo(() => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
            body, html { margin: 0; padding: 0; height: 100%; }
            #map { height: 100%; }
            
            .leaflet-control-zoom {
                margin-top: 40px !important;
                margin-left: 16px !important;
                border: none !important;
                box-shadow: none !important;
            }
            
            .leaflet-control-zoom a {
                width: 36px !important;
                height: 36px !important;
                line-height: 34px !important;
                font-size: 20px !important;
                border-radius: 8px !important;
                border: none !important;
                margin-bottom: 8px !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
            }
            
            .leaflet-control-zoom a:last-child {
                margin-bottom: 0 !important;
            }

            .custom-marker {
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            }
            
            .current-marker {
                background: #3B82F6;
                width: 20px;
                height: 20px;
            }
            
            .destination-marker {
                background: #EF4444;
                width: 20px;
                height: 20px;
            }
            
            .parking-available {
                background: #10B981;
                width: 16px;
                height: 16px;
            }
            
            .parking-occupied {
                background: #6B7280;
                width: 16px;
                height: 16px;
            }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            var map = L.map('map').setView([${currentLocation.lat}, ${currentLocation.lng}], 10);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            // Current location marker
            var currentLocationMarker = L.circleMarker([${currentLocation.lat}, ${currentLocation.lng}], {
                color: '#3B82F6',
                fillColor: '#3B82F6',
                fillOpacity: 1,
                radius: 10,
                weight: 3
            }).addTo(map);
            currentLocationMarker.bindPopup('<b>Current Location</b><br>${currentLocation.name}');
            
            // Store references for dynamic updates
            var destinationMarker = null;
            var routeLine = null;
            var parkingMarkers = new Map(); // Use Map for efficient lookups by spot ID
            
            // Function to clear existing markers and routes
            function clearMapData() {
                if (destinationMarker) {
                    map.removeLayer(destinationMarker);
                    destinationMarker = null;
                }
                if (routeLine) {
                    map.removeLayer(routeLine);
                    routeLine = null;
                }
                parkingMarkers.forEach(marker => map.removeLayer(marker));
                parkingMarkers.clear();
            }
            
            // Function to update parking markers efficiently
            function updateParkingMarkers(parkingSpots) {
                var spotsToShow = parkingSpots || [];
                var spotIds = new Set(spotsToShow.map(spot => spot.id));
                
                // Remove markers for spots that are no longer in the list
                parkingMarkers.forEach((marker, spotId) => {
                    if (!spotIds.has(spotId)) {
                        map.removeLayer(marker);
                        parkingMarkers.delete(spotId);
                    }
                });
                
                // Add or update markers for current spots
                spotsToShow.forEach(spot => {
                    var existingMarker = parkingMarkers.get(spot.id);
                    var color = spot.status === 'available' ? '#10B981' : '#6B7280';
                    
                    if (existingMarker) {
                        // Update existing marker color if status changed
                        existingMarker.setStyle({
                            color: color,
                            fillColor: color
                        });
                        
                        // Update popup content
                        var popupContent = '<b>' + spot.name + '</b><br>' + 
                                          spot.address + '<br>' + 
                                          '<span style="color: ' + color + ';">● ' + spot.status.toUpperCase() + '</span>' +
                                          (spot.price ? '<br><b>' + spot.price + '</b>' : '<br><b>FREE</b>');
                        existingMarker.bindPopup(popupContent);
                    } else {
                        // Create new marker
                        var marker = L.circleMarker([spot.lat, spot.lng], {
                            color: color,
                            fillColor: color,
                            fillOpacity: 1,
                            radius: 8,
                            weight: 2
                        }).addTo(map);
                        
                        var popupContent = '<b>' + spot.name + '</b><br>' + 
                                          spot.address + '<br>' + 
                                          '<span style="color: ' + color + ';">● ' + spot.status.toUpperCase() + '</span>' +
                                          (spot.price ? '<br><b>' + spot.price + '</b>' : '<br><b>FREE</b>');
                        marker.bindPopup(popupContent);
                        parkingMarkers.set(spot.id, marker);
                    }
                });
            }
            
            // Function to update map with new data
            function updateMapData(data) {
                var shouldFitBounds = false;
                
                // Handle destination marker
                if (data.destination && !destinationMarker) {
                    // Add new destination marker
                    destinationMarker = L.circleMarker([data.destination.lat, data.destination.lng], {
                        color: '#EF4444',
                        fillColor: '#EF4444',
                        fillOpacity: 1,
                        radius: 10,
                        weight: 3
                    }).addTo(map);
                    destinationMarker.bindPopup('<b>Destination</b><br>' + data.destination.name);
                    shouldFitBounds = true;
                } else if (!data.destination && destinationMarker) {
                    // Remove destination marker
                    map.removeLayer(destinationMarker);
                    destinationMarker = null;
                    shouldFitBounds = true;
                }
                
                // Handle route line
                if (data.route && data.route.length > 0 && !routeLine) {
                    // Add new route line
                    routeLine = L.polyline(data.route, {
                        color: '#8B5CF6',
                        weight: 4,
                        opacity: 0.8
                    }).addTo(map);
                    shouldFitBounds = true;
                } else if ((!data.route || data.route.length === 0) && routeLine) {
                    // Remove route line
                    map.removeLayer(routeLine);
                    routeLine = null;
                    shouldFitBounds = true;
                }
                
                // Update parking markers (this doesn't require bounds adjustment)
                updateParkingMarkers(data.parkingSpots);
                
                // Only adjust map bounds when route/destination changes, not for parking spot updates
                if (shouldFitBounds) {
                    if (data.route && data.route.length > 0) {
                        // If there's a route, fit to the route
                        map.fitBounds(data.route, { padding: [20, 20] });
                    } else if (data.destination) {
                        // If there's a destination but no route, fit to both current location and destination
                        map.fitBounds([
                            [${currentLocation.lat}, ${currentLocation.lng}],
                            [data.destination.lat, data.destination.lng]
                        ], { padding: [20, 20] });
                    } else {
                        // If no destination, center on current location
                        map.setView([${currentLocation.lat}, ${currentLocation.lng}], 10);
                    }
                }
            }
            
            // Listen for messages from React Native
            window.addEventListener('message', function(event) {
                try {
                    var data = JSON.parse(event.data);
                    if (data.type === 'updateMap') {
                        updateMapData(data);
                    }
                } catch (e) {
                    console.error('Error parsing message:', e);
                }
            });
        </script>
    </body>
    </html>
  `, []); // Empty dependency array ensures HTML never changes

  return (
    <View className="flex-1">
      <WebView
        ref={webViewRef}
        source={{ html: mapHtml }}
        className="flex-1"
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onMessage={(event) => {
          // Handle messages from WebView if needed
          console.log('Message from WebView:', event.nativeEvent.data);
        }}
      />
    </View>
  );
});

MapComponent.displayName = 'MapComponent';

// Wrap with memo to prevent re-renders when parent state changes
export default React.memo(MapComponent);