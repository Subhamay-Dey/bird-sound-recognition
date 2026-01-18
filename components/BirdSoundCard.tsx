import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radii, spacing } from "../lib/theme";

interface BirdSoundCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  duration: string;
  onPlay?: () => void;
}

export default function BirdSoundCard({
  id,
  name,
  description,
  imageUrl,
  duration,
  onPlay,
}: BirdSoundCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPress = () => {
    setIsPlaying(!isPlaying);
    onPlay?.();
  };

  return (
    <View style={styles.container}>
      {/* Left content */}
      <View style={styles.leftContent}>
        <Text style={styles.birdName}>{name}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>

        {/* Play button with waveform */}
        <View style={styles.audioPlayer}>
          <TouchableOpacity onPress={handlePlayPress} style={styles.playButton}>
            <MaterialCommunityIcons
              name={isPlaying ? "pause" : "play"}
              size={16}
              color={colors.textOnPrimary}
            />
          </TouchableOpacity>

          {/* Waveform visualization */}
          <View style={styles.waveform}>
            {[...Array(20)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.waveBar,
                  {
                    height: 4 + Math.sin(i * 0.5) * 8,
                    backgroundColor:
                      i % 2 === 0 ? colors.textTertiary : colors.outlineLight,
                  },
                ]}
              />
            ))}
          </View>

          {/* Time */}
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </View>

      {/* Bird image */}
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.birdImage} />
      ) : (
        <View style={styles.birdImagePlaceholder}>
          <MaterialCommunityIcons
            name="bird"
            size={60}
            color={colors.textSecondary}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E8F5E9",
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: spacing.lg,
    width: 280,
    marginRight: spacing.lg,
    alignItems: "flex-start",
  },
  leftContent: {
    flex: 1,
    gap: spacing.md,
  },
  birdName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  audioPlayer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: radii.round,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  waveform: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    height: 24,
  },
  waveBar: {
    width: 2,
    borderRadius: 1,
  },
  duration: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500",
    marginLeft: spacing.xs,
  },
  birdImage: {
    width: 100,
    height: 120,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
  },
  birdImagePlaceholder: {
    width: 100,
    height: 120,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
});
