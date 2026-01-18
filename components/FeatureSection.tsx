import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radii, spacing } from "../lib/theme";

interface FeatureSectionProps {
  onPhotoPress?: () => void;
  onSoundPress?: () => void;
}

export default function FeatureSection({
  onPhotoPress,
  onSoundPress,
}: FeatureSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Identify more than 10,000 bird species easily by sound or image
      </Text>

      <View style={styles.featuresRow}>
        {/* Photo identification */}
        <TouchableOpacity style={styles.featureCard} onPress={onPhotoPress}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../assets/project/camera.png")}
              style={{ width: 32, height: 32 }}
            />
          </View>
          <Text style={styles.featureLabel}>Photo identification</Text>
        </TouchableOpacity>

        {/* Divider line */}
        <View style={styles.divider} />

        {/* Sound identification */}
        <TouchableOpacity style={styles.featureCard} onPress={onSoundPress}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../assets/project/microphone.png")}
              style={{ width: 32, height: 32 }}
            />
          </View>
          <Text style={styles.featureLabel}>Sound identification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8fb048",
    borderRadius: radii.xl,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    padding: spacing.xs,
    paddingHorizontal: spacing.md,
    color: colors.textOnPrimary,
    textAlign: "center",
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  featuresRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  featureCard: {
    flex: 1,
    alignItems: "center",
    gap: spacing.lg,
  },
  iconContainer: {
    width: 75,
    height: 75,
    borderRadius: radii.round,
    backgroundColor: colors.textOnPrimary,
    justifyContent: "center",
    alignItems: "center",
  },
  featureLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textOnPrimary,
    textAlign: "center",
  },
  divider: {
    width: 2,
    height: 110,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: spacing.lg,
  },
});
