import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radii, spacing } from "../lib/theme";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

interface Tab {
  id: string;
  label: string;
  icon: IconName;
}

interface BottomTabBarProps {
  activeTab: string;
  tabs: Tab[];
  onTabPress: (tabId: string) => void;
}

const DEFAULT_TABS: Tab[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "collections", label: "Collections", icon: "leaf" },
];

export default function BottomTabBar({
  activeTab,
  tabs = DEFAULT_TABS,
  onTabPress,
}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tabButton}
          onPress={() => onTabPress(tab.id)}
        >
          <View
            style={[
              styles.tabContent,
              activeTab === tab.id && styles.activeTabContent,
            ]}
          >
            {activeTab === tab.id ? (
              <>
                <View style={styles.activeBadge}>
                  <MaterialCommunityIcons
                    name={tab.icon}
                    size={20}
                    color={colors.textOnPrimary}
                  />
                </View>
                <Text style={styles.activeLabel}>{tab.label}</Text>
              </>
            ) : (
              <>
                <MaterialCommunityIcons
                  name={tab.icon}
                  size={24}
                  color={colors.textTertiary}
                />
                <Text style={styles.inactiveLabel}>{tab.label}</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.outlineLight,
    paddingBottom: spacing.md,
    paddingTop: spacing.lg,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
  tabContent: {
    alignItems: "center",
    gap: spacing.xs,
  },
  activeTabContent: {
    alignItems: "center",
  },
  activeBadge: {
    width: 40,
    height: 40,
    borderRadius: radii.round,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  activeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
    marginTop: spacing.xs,
  },
  inactiveLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
});
