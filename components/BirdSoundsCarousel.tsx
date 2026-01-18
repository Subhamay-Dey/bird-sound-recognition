import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { colors, spacing } from "../lib/theme";
import BirdSoundCard from "./BirdSoundCard";

export interface BirdSound {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  duration: string;
}

interface BirdSoundsCarouselProps {
  birds?: BirdSound[];
  onBirdPress?: (bird: BirdSound) => void;
  onPlay?: (bird: BirdSound) => void;
}

// Sample bird data - replace with your actual data
const SAMPLE_BIRDS: BirdSound[] = [
  {
    id: "1",
    name: "Common Chiffchaff",
    description:
      "The common chiffchaff (Phylloscopus collybita), or simply the chiffchaff, is a common and widespread leaf-warbler",
    duration: "00:00",
  },
  {
    id: "2",
    name: "Broad-billed Hummingbird",
    description:
      "The broad-billed hummingbird is a small hummingbird native to Mexico and the southwestern United States.",
    duration: "00:00",
  },
  {
    id: "3",
    name: "European Robin",
    description:
      "The European robin is a small insectivorous passerine bird, brown above and red and white below.",
    duration: "00:00",
  },
  {
    id: "4",
    name: "Great Tit",
    description:
      "The great tit is one of the largest and most common members of the tit family native to the Palearctic.",
    duration: "00:00",
  },
  {
    id: "5",
    name: "Blue Tit",
    description:
      "The blue tit is a small passerine bird in the family Paridae found throughout the temperate world.",
    duration: "00:00",
  },
];

export default function BirdSoundsCarousel({
  birds = SAMPLE_BIRDS,
  onBirdPress,
  onPlay,
}: BirdSoundsCarouselProps) {
  const renderBirdCard: ListRenderItem<BirdSound> = ({ item }) => (
    <BirdSoundCard
      id={item.id}
      name={item.name}
      description={item.description}
      imageUrl={item.imageUrl}
      duration={item.duration}
      onPlay={() => onPlay?.(item)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={birds}
        renderItem={renderBirdCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  listContent: {
    paddingHorizontal: spacing.md,
  },
});
