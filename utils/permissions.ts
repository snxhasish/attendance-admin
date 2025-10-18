import { PermissionsAndroid, Platform } from "react-native";

const requestPermissions = async () => {
    if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location Permission",
                message: "Required for BLE scanning",
                buttonPositive: "OK",
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
};

export default requestPermissions;