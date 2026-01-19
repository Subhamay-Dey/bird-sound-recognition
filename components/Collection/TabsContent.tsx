import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { colors, radii, spacing, typography } from "../../lib/theme";

interface TabsCardProps {
  collectionContent: React.ReactNode;
  favoritesContent: React.ReactNode;
}

export default function TabsCard({
  collectionContent,
  favoritesContent,
}: TabsCardProps) {
  const [activeTab, setActiveTab] = useState<"collection" | "favorites">(
    "collection",
  );
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get("window");

  // Trigger animation when tab changes
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: activeTab === "collection" ? 0 : -width,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [activeTab, width]);

  const handleTabChange = (tab: "collection" | "favorites") => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container} className="h-full bg-white">
      {/* Header Section - Fixed */}
      <View style={styles.header}>
        <View style={styles.historySection}>
          <Text style={[typography.body, styles.historyLabel]}>History</Text>
          <Pressable>
            <Text style={[typography.bodySmall, styles.seeAllLink]}>
              See all
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabSelector}>
        <Pressable
          style={[styles.tab, activeTab === "collection" && styles.tabActive]}
          onPress={() => handleTabChange("collection")}
        >
          <Text
            style={[
              typography.body,
              styles.tabText,
              activeTab === "collection" && styles.tabTextActive,
            ]}
          >
            Collection
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === "favorites" && styles.tabActive]}
          onPress={() => handleTabChange("favorites")}
        >
          <Text
            style={[
              typography.body,
              styles.tabText,
              activeTab === "favorites" && styles.tabTextActive,
            ]}
          >
            Favorites
          </Text>
        </Pressable>
      </View>

      {/* Animated Content Area */}
      <View style={styles.contentWrapper}>
        <Animated.View
          style={[
            styles.contentContainer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {/* Collection Content */}
          <View style={[styles.content, { width }]}>{collectionContent}</View>

          {/* Favorites Content */}
          <View style={[styles.content, { width }]}>{favoritesContent}</View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header Styles
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  settingsButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    flex: 1,
    textAlign: "center",
    color: colors.text,
  },

  headerSpacer: {
    width: 44,
  },

  historySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  historyLabel: {
    color: colors.text,
    fontWeight: "600",
  },

  seeAllLink: {
    color: colors.primary,
    fontWeight: "600",
  },

  // Tab Selector Styles
  tabSelector: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
    backgroundColor: colors.surface,
  },

  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceVariant,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.outlineLight,
  },

  tabActive: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
  },

  tabText: {
    color: colors.textSecondary,
    fontWeight: "500",
  },

  tabTextActive: {
    color: colors.text,
    fontWeight: "600",
  },

  // Content Styles
  contentWrapper: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: colors.background,
  },

  contentContainer: {
    flexDirection: "row",
    flex: 1,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
});
