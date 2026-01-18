import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, radii, spacing } from "../lib/theme";

interface HeroBannerProps {
  onLearnMore?: () => void;
}

const bgImage = require("../assets/project/birdbackground.jpg");

export default function HeroBanner({ onLearnMore }: HeroBannerProps) {
  return (
    <ImageBackground
      source={bgImage}
      style={styles.container}
      imageStyle={styles.image}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Left content */}
        <View style={styles.leftContent}>
          <Text style={styles.title}>
            Useful knowledge and how to identify birds for birders
          </Text>
          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={onLearnMore}
          >
            <Text style={styles.learnMoreText}>Learn more</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Bird image placeholder - you can replace with actual image */}
        <View style={styles.birdImageContainer} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: radii.xl,
    padding: spacing.xs,
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    borderRadius: radii.xl,
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
