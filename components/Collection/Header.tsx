import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing } from "../../lib/theme";

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
      <Text style={styles.collectionText}>Collection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginTop: spacing.lg,
  },
  settingsButton: {
    padding: spacing.sm,
    position: "absolute",
    left: spacing.md,
  },
  collectionText: {
    fontSize: 20,
  },
});
