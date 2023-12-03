import { View, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../constants/colors";
import OutlinedButton from "./UI/OutlinedButton";

import verifyPermissions from "../utils/verifyPermission";

function ImagePicker({ onImageTaken }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissonInfo, requestPermission] = useCameraPermissions();

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions(
      cameraPermissonInfo,
      requestPermission,
      PermissionStatus,
      "camera"
    );

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
    onImageTaken(image.assets[0].uri);
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image source={{ uri: pickedImage }} style={styles.image} />
        ) : (
          <Text>No image taken yet</Text>
        )}
      </View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
