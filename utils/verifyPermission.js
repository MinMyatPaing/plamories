import { Alert } from "react-native";

export default async function verifyPermissions(
  permissionInfo,
  requestPermission,
  PermissionStatus,
  type
) {
  if (permissionInfo.status === PermissionStatus.UNDETERMINED) {
    const permissionRes = await requestPermission();

    return permissionRes.granted;
  }

  if (permissionInfo.status === PermissionStatus.DENIED) {
    Alert.alert(
      "Cannot proceed",
      `The app cannot be function as intended without ${type} permission.`
    );

    return false;
  }

  return true;
}
