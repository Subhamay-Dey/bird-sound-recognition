import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export function useImagePicker() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      return result.assets[0].uri;
    }
    return null;
  };

  const resetImage = () => {
    setSelectedImage(null);
  };

  return {
    selectedImage,
    pickImage,
    resetImage,
  };
}
