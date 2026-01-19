import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useRef, useState } from "react";
import { requestMicrophonePermission } from "../utils/permissions";

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      recordingRef.current = recording;
      setIsRecording(true);
      setRecordingTime(0);

      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (!recordingRef.current) return null;

    try {
      await recordingRef.current.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recordingRef.current.getURI();
      setIsRecording(false);
      setRecordingUri(uri);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      recordingRef.current = null;
      return uri;
    } catch (err) {
      console.error("Failed to stop recording", err);
      return null;
    }
  };

  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
      });

      if (!result.canceled && result.assets[0]) {
        setRecordingUri(result.assets[0].uri);
        return result.assets[0].uri;
      }
    } catch (error) {
      console.error("Error picking audio:", error);
    }
    return null;
  };

  return {
    isRecording,
    recordingTime,
    recordingUri,
    startRecording,
    stopRecording,
    pickAudio,
  };
}
