import React, { useRef, useImperativeHandle, forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { currentLocation } from '../../data/mockData';

export interface MapComponentRef {
  updateMap: (data: {
    destination?: any;
    parkingSpots?: any[];
    route?: [number, number][] | null;
    bottomPanelHeight?: number;
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

  const mapHtml = useMemo(() => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
            * { box-sizing: border-box; }
            body, html { 
                margin: 0; 
                padding: 0; 
                height: 100%; 
                width: 100%;
                overflow: hidden;
            }
            #map { 
                height: 100vh; 
                width: 100vw;
                position: absolute;
                top: 0;
                left: 0;
            }
            
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
            
            var currentLocationIcon = L.divIcon({
                html: '<div style="background:#3B82F6;width:20px;height:20px;border-radius:50%;border:4px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"><div style="width:8px;height:8px;background:white;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"></div></div>',
                className: 'current-location-marker',
                iconSize: [28, 28],
                iconAnchor: [14, 14]
            });
            
            var currentLocationMarker = L.marker([${currentLocation.lat}, ${currentLocation.lng}], {
                icon: currentLocationIcon
            }).addTo(map);
            currentLocationMarker.bindPopup('<b>Current Location</b><br>${currentLocation.name}');
            
            var destinationMarker = null;
            var routeLine = null;
            var parkingMarkers = new Map();
            
            
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
            
            
            function updateParkingMarkers(parkingSpots) {
                var spotsToShow = parkingSpots || [];
                var spotIds = new Set(spotsToShow.map(spot => spot.id));
                
                
                parkingMarkers.forEach((marker, spotId) => {
                    if (!spotIds.has(spotId)) {
                        map.removeLayer(marker);
                        parkingMarkers.delete(spotId);
                    }
                });
                
                
                spotsToShow.forEach(spot => {
                    var existingMarker = parkingMarkers.get(spot.id);
                    var color = spot.status === 'available' ? '#10B981' : '#6B7280';
                    
                    if (existingMarker) {
                        
                        existingMarker.setStyle({
                            color: color,
                            fillColor: color
                        });
                        
                        
                        var popupContent = '<b>' + spot.name + '</b><br>' + 
                                          spot.address + '<br>' + 
                                          '<span style="color: ' + color + ';">● ' + spot.status.toUpperCase() + '</span>' +
                                          (spot.price ? '<br><b>' + spot.price + '</b>' : '<br><b>FREE</b>');
                        existingMarker.bindPopup(popupContent);
                    } else {
                        var parkingIcon = L.divIcon({
                            html: '<div style="background:' + color + ';width:14px;height:14px;border-radius:3px;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>',
                            className: 'parking-marker',
                            iconSize: [18, 18],
                            iconAnchor: [9, 9]
                        });
                        
                        var marker = L.marker([spot.lat, spot.lng], {
                            icon: parkingIcon
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
            
            
            function updateMapData(data) {
                var shouldFitBounds = false;
                
                if (data.destination && !destinationMarker) {
                    var destinationIcon = L.divIcon({
                        html: '<div style="background:#EF4444;width:16px;height:16px;border-radius:2px;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);position:relative;"><div style="width:6px;height:6px;background:white;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"></div></div>',
                        className: 'destination-marker',
                        iconSize: [22, 22],
                        iconAnchor: [11, 11]
                    });
                    destinationMarker = L.marker([data.destination.lat, data.destination.lng], {
                        icon: destinationIcon
                    }).addTo(map);
                    destinationMarker.bindPopup('<b>Destination</b><br>' + data.destination.name);
                    shouldFitBounds = true;
                } else if (!data.destination && destinationMarker) {
                    map.removeLayer(destinationMarker);
                    destinationMarker = null;
                    shouldFitBounds = true;
                }
                
                if (data.route && data.route.length > 0 && !routeLine) {
                    routeLine = L.polyline(data.route, {
                        color: '#8B5CF6',
                        weight: 4,
                        opacity: 0.8
                    }).addTo(map);
                    shouldFitBounds = true;
                } else if ((!data.route || data.route.length === 0) && routeLine) {
                    map.removeLayer(routeLine);
                    routeLine = null;
                    shouldFitBounds = true;
                }
                
                updateParkingMarkers(data.parkingSpots);
                
                if (shouldFitBounds) {
                    var bottomPanelRatio = data.bottomPanelHeight || 0.6;
                    var bottomPadding = window.innerHeight * bottomPanelRatio + 60;
                    var topPadding = Math.max(40, window.innerHeight * 0.05);
                    
                    var paddingOptions = { 
                        paddingTopLeft: [20, topPadding],
                        paddingBottomRight: [20, bottomPadding]
                    };
                    
                    if (data.route && data.route.length > 0) {
                        map.fitBounds(data.route, paddingOptions);
                    } else if (data.destination) {
                        map.fitBounds([
                            [${currentLocation.lat}, ${currentLocation.lng}],
                            [data.destination.lat, data.destination.lng]
                        ], paddingOptions);
                    } else {
                        map.setView([${currentLocation.lat}, ${currentLocation.lng}], 10);
                    }
                }
            }
            
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
  `, []);

  return (
    <View style={{ height: '80%', flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ html: mapHtml }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        originWhitelist={['*']}
        mixedContentMode="compatibility"
        onMessage={(event) => {
          console.log('Message from WebView:', event.nativeEvent.data);
        }}
      />
    </View>
  );
});

MapComponent.displayName = 'MapComponent';

export default React.memo(MapComponent);