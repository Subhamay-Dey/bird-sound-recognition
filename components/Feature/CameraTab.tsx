import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useCamera } from "../../hooks/useCamera";
import { colors, spacing, radii } from "../../lib/theme";
import { ZOOM_LEVELS } from "../../lib/constants";

interface CameraTabProps {
  onShowSnapTips: () => void;
}

export default function CameraTab({ onShowSnapTips }: CameraTabProps) {
  const [zoom, setZoom] = useState(1);
  const { hasPermission, cameraRef, capturePhoto, pickImage, cameraType } =
    useCamera();

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Camera permission is required to use this feature
        </Text>
      </View>
    );
  }

  const handleCapture = async () => {
    const uri = await capturePhoto(zoom);
    if (uri) {
      console.log("Photo captured:", uri);
      // Handle the captured photo (e.g., send to recognition API)
    }
  };

  const handleGalleryPress = async () => {
    const uri = await pickImage();
    if (uri) {
      console.log("Image selected:", uri);
      // Handle the selected image
    }
  };

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={cameraType}
          zoom={zoom / 10}
        />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {/* Zoom Controls */}
        <View style={styles.zoomContainer}>
          {ZOOM_LEVELS.map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.zoomButton,
                zoom === level && styles.zoomButtonActive,
              ]}
              onPress={() => setZoom(level)}
            >
              <Text
                style={[
                  styles.zoomText,
                  zoom === level && styles.zoomTextActive,
                ]}
              >
                {level}x
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          {/* Gallery */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleGalleryPress}
          >
            <View style={styles.iconBox}>
              <Ionicons name="images-outline" size={24} color={colors.text} />
            </View>
            <Text style={styles.actionLabel}>Gallery</Text>
          </TouchableOpacity>

          {/* Capture Button */}
          <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>

          {/* Snap Tips */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onShowSnapTips}
          >
            <View style={styles.iconBox}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={colors.text}
              />
            </View>
            <Text style={styles.actionLabel}>Snap Tips</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  permissionText: {
    textAlign: "center",
    padding: spacing.xl,
    fontSize: 16,
    color: colors.textSecondary,
  },
  controls: {
    backgroundColor: colors.background,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  zoomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  zoomButton: {
    width: 50,
    height: 50,
    borderRadius: radii.round,
    backgroundColor: colors.surfaceVariant,
    justifyContent: "center",
    alignItems: "center",
  },
  zoomButtonActive: {
    backgroundColor: colors.primary,
  },
  zoomText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  zoomTextActive: {
    color: colors.textOnPrimary,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  actionButton: {
    alignItems: "center",
    gap: spacing.sm,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: colors.outline,
    borderRadius: radii.md,
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    fontSize: 14,
    color: colors.text,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: radii.round,
    backgroundColor: colors.primary,
    borderWidth: 4,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: "100%",
    height: "100%",
    borderRadius: radii.round,
    borderWidth: 3,
    borderColor: colors.textOnPrimary,
  },
});