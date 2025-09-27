import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

interface MapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
}

const Map: React.FC<MapProps> = ({
  latitude = 51.9624, // default to Munster city
  longitude = 7.6257,
  zoom = 13
}) => {
  // OpenStreetMap HTML content
  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple Map</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
            body { margin: 0; padding: 0; }
            #mapid { 
                height: 80vh; 
                width: 100vw; 
            }
        </style>
    </head>
    <body>
        <div id="mapid"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
            var mymap = L.map('mapid').setView([${latitude}, ${longitude}], ${zoom});
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mymap);
            
            // Add a marker at the center
            L.marker([${latitude}, ${longitude}]).addTo(mymap)

        </script>
    </body>
    </html>
  `;

  return (
    <View className="flex-1">
      <WebView
        source={{ html: mapHTML }}
        className="flex-1"
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        scrollEnabled={true}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onLoad={() => {
          console.log('Map loaded successfully');
        }}
      />
    </View>
  );
};

export default Map;
