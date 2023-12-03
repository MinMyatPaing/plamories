import { useEffect, useState } from "react";
import PlacesList from "../components/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../utils/db";

function AllPlaces() {
  const [placeList, setPlaceList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getPlaces() {
      const places = await fetchPlaces();
      setPlaceList(places);
    }
    if (isFocused) {
      getPlaces();
      //setPlaceList((currentPlaces) => [...currentPlaces, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={placeList} />;
}

export default AllPlaces;
