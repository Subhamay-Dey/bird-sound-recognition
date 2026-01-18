import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radii, spacing } from "../lib/theme";

interface HeaderProps {
  onSettingsPress?: () => void;
  onPremiumPress?: () => void;
}

export default function Header({
  onSettingsPress,
  onPremiumPress,
}: HeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onSettingsPress} style={styles.settingsButton}>
        <MaterialCommunityIcons name="cog" size={24} color={colors.text} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPremiumPress} style={styles.premiumButton}>
        <MaterialCommunityIcons
          name="crown"
          size={20}
          color={colors.textOnPrimary}
        />
        <Text style={styles.premiumText}>Premium</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginTop: spacing.lg,
  },
  settingsButton: {
    padding: spacing.sm,
  },
  premiumButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#91ae51",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.xl,
    gap: spacing.sm,
  },
  premiumText: {
    color: colors.textOnPrimary,
    fontWeight: "600",
    fontSize: 14,
  },
});
