import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radii, spacing } from "../lib/theme";

interface HeroBannerProps {
  onLearnMore?: () => void;
}

export default function HeroBanner({ onLearnMore }: HeroBannerProps) {
  return (
    <View style={styles.container}>
      {/* Left content */}
      <View style={styles.leftContent}>
        <Text style={styles.title}>
          Useful knowledge and how to identify birds for birders
        </Text>
        <TouchableOpacity style={styles.learnMoreButton} onPress={onLearnMore}>
          <Text style={styles.learnMoreText}>Learn more</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Bird image placeholder - you can replace with actual image */}
      <View style={styles.birdImageContainer}>
        <MaterialCommunityIcons
          name="bird"
          size={80}
          color={colors.textOnPrimary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
    alignItems: "center",
    overflow: "hidden",
  },
  leftContent: {
    flex: 1,
    marginRight: spacing.lg,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textOnPrimary,
    marginBottom: spacing.lg,
    lineHeight: 18,
  },
  learnMoreButton: {
    backgroundColor: colors.textOnPrimary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: radii.md,
    flexDirection: "row",
    alignItems: "center",
    width: 120,
    justifyContent: "center",
    gap: spacing.xs,
  },
  learnMoreText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 10,
  },
  birdImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: radii.xl,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
});
