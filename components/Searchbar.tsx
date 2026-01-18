import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, radii, spacing } from "../lib/theme";

import { useState } from "react";
interface SearchBarProps {
  onSearch?: (text: string) => void;
  onFinderPress?: () => void;
}

export default function SearchBar({ onSearch, onFinderPress }: SearchBarProps) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch?.(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchInput}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color={colors.textTertiary}
        />
        <TextInput
          style={styles.input}
          placeholder="Search your bird"
          placeholderTextColor={colors.textTertiary}
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.finderButton} onPress={onFinderPress}>
          <MaterialCommunityIcons
            name="magnify-scan"
            size={20}
            color={colors.text}
          />
          <Text style={styles.finderText}>Finder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: radii.xl,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
  },
  finderButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.xl,
    gap: spacing.sm,
    borderWidth: 2,
    borderColor: colors.outlineLight,
  },
  finderText: {
    color: colors.text,
    fontWeight: "500",
    fontSize: 14,
  },
});
