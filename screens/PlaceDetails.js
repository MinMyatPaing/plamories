import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceById } from "../utils/db";

function PlaceDetails({ route, navigation }) {
  const [gotPlace, setGotPlace] = useState();
  const selectedPlaceId = route.params?.placeId;

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: gotPlace.location.lat,
      initialLng: gotPlace.location.lng,
    });
  }

  useEffect(() => {
    async function getPlaceDetails() {
      const place = await fetchPlaceById(selectedPlaceId);
      setGotPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }

    getPlaceDetails();
  }, [selectedPlaceId]);

  if (!gotPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: gotPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{gotPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
