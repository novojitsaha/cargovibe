import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapComponent() {
  const mapHtml = `
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
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            var map = L.map('map').setView([52.3676, 4.9041], 13);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            var marker = L.circleMarker([52.3676, 4.9041], {
                color: '#3B82F6',
                fillColor: '#3B82F6',
                fillOpacity: 1,
                radius: 8
            }).addTo(map);
        </script>
    </body>
    </html>
  `;

  return (
    <View className="flex-1">
      <WebView
        source={{ html: mapHtml }}
        className="flex-1"
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
}