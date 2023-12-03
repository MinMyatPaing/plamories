import { GOOGLE_API_KEY } from "@env";
import axios from "axios";

export default async function getAddress(lat, lng) {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

  const response = await axios.get(geocodeUrl);

  if (response.status !== 200) {
    throw new Error("Failed to get address");
  }

  const { data } = response;
  const address = data.results[0].formatted_address;
  return address;
}
