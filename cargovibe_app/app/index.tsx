import { View, Alert } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import Map from "../components/Map";

export default function Index() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Location Permission Required",
          "Please enable location permissions in your device settings to use this feature.",
          [{ text: "OK" }]
        );
        return;
      }

      // Get current location
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert(
        "Location Error",
        "Unable to retrieve your current location. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  useEffect(() => {

    requestLocationPermission();
  }, []);

  return (
    <View className="flex-1">
      <Map latitude={location?.latitude} longitude={location?.longitude} />
    </View>
  );
}
