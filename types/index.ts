export interface BirdRecognitionResult {
  species: string;
  confidence: number;
  imageUrl?: string;
  audioUrl?: string;
}

export interface RecordingState {
  isRecording: boolean;
  duration: number;
  uri?: string;
}
