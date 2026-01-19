import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radii, spacing } from "../../lib/theme";

interface TabSwitchProps {
  activeTab: "camera" | "sound";
  onTabChange: (tab: "camera" | "sound") => void;
}

export default function TabSwitch({ activeTab, onTabChange }: TabSwitchProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "sound" && styles.activeTab]}
        onPress={() => onTabChange("sound")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "sound" && styles.activeTabText,
          ]}
        >
          By Sound
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "camera" && styles.activeTab]}
        onPress={() => onTabChange("camera")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "camera" && styles.activeTabText,
          ]}
        >
          By Camera
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    justifyContent: "center",
  },
  tab: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceVariant,
  },
  activeTab: {
    backgroundColor: colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.text,
  },
});
