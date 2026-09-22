import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

// Leaflet + OpenStreetMap tiles: no API key, same map on iOS and Android.
const GURGAON = { latitude: 28.4595, longitude: 77.0266, zoom: 12 };

const markers = [
  {
    title: 'Gurgaon',
    description: 'Gurgaon City',
    coordinate: { latitude: GURGAON.latitude, longitude: GURGAON.longitude },
  },
];

function buildMapHtml() {
  const markerJs = markers
    .map(
      m =>
        `L.marker([${m.coordinate.latitude}, ${m.coordinate.longitude}]).addTo(map)` +
        `.bindPopup(${JSON.stringify(`<b>${m.title}</b><br/>${m.description}`)}).openPopup();`,
    )
    .join('\n');

  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>html, body, #map { height: 100%; margin: 0; }</style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map').setView([${GURGAON.latitude}, ${GURGAON.longitude}], ${GURGAON.zoom});
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    ${markerJs}
  </script>
</body>
</html>`;
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.map}
        originWhitelist={['*']}
        source={{ html: buildMapHtml(), baseUrl: 'https://localhost' }}
        onMessage={() => {}}
        onError={e => console.warn('Map failed to load', e.nativeEvent)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default App;
