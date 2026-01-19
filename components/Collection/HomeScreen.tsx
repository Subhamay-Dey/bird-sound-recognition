import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, typography } from "../../lib/theme";
import TabsCard from "./TabsContent";

// Sample Collection Content Component
function CollectionContent() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.emptyState}>
        <Text style={[typography.h3, styles.emptyTitle]}>
          You Have No Birds
        </Text>
        <Text style={[typography.bodySmall, styles.emptySubtitle]}>
          Search your bird
        </Text>
      </View>
    </ScrollView>
  );
}

// Sample Favorites Content Component
function FavoritesContent() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.emptyState}>
        <Text style={[typography.h3, styles.emptyTitle]}>No Favorites Yet</Text>
        <Text style={[typography.bodySmall, styles.emptySubtitle]}>
          Add birds to your favorites to see them here
        </Text>
      </View>
    </ScrollView>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.container} className="h-full bg-white">
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <TabsCard
          collectionContent={<CollectionContent />}
          favoritesContent={<FavoritesContent />}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  safeArea: {
    flex: 1,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xxxl,
    minHeight: 300,
  },

  emptyTitle: {
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: "center",
  },

  emptySubtitle: {
    color: colors.textTertiary,
    textAlign: "center",
    maxWidth: 200,
  },
});
