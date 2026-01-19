import { useState, useEffect, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { requestCameraPermission } from "../utils/permissions";

export function useCamera() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const granted = await requestCameraPermission();
      setHasPermission(granted);
    })();
  }, []);

  const capturePhoto = async (zoom: number = 1) => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false,
        });
        setCapturedImage(photo.uri);
        return photo.uri;
      } catch (error) {
        console.error("Error capturing photo:", error);
        return null;
      }
    }
    return null;
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
        return result.assets[0].uri;
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
    return null;
  };

  const toggleCameraType = () => {
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return {
    hasPermission,
    capturedImage,
    cameraType,
    cameraRef,
    capturePhoto,
    pickImage,
    toggleCameraType,
  };
}

