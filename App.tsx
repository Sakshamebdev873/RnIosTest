import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

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
  const gurgaonRegion = {
    latitude: 28.4595,
    longitude: 77.0266,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const markers = [
    {
      title: 'DLF Cyber Hub',
      description: 'Popular dining and corporate destination',
      coordinate: { latitude: 28.4950, longitude: 77.0895 },
    },
    {
      title: 'Ambience Mall',
      description: 'Large shopping mall in Gurgaon',
      coordinate: { latitude: 28.5028, longitude: 77.0974 },
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={gurgaonRegion}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
