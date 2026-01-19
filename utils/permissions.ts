import { Audio } from "expo-av";
import { Camera } from "expo-camera";
import { Alert } from "react-native";

export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Camera Permission Required",
        "Please enable camera access to take photos of birds.",
        [{ text: "OK" }],
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error requesting camera permission:", error);
    return false;
  }
};

export const requestMicrophonePermission = async (): Promise<boolean> => {
  try {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Microphone Permission Required",
        "Please enable microphone access to record bird sounds.",
        [{ text: "OK" }],
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error requesting microphone permission:", error);
    return false;
  }
};
