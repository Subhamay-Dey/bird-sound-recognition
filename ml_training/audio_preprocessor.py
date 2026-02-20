import librosa
import librosa.display
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import os

class AudioPreprocessor:
    def __init__(self, sample_rate=22050, duration=5, n_mels=128, hop_length=512):
        self.sample_rate = sample_rate
        self.duration = duration          # Fixed 5 seconds per clip
        self.n_mels = n_mels              # Mel filterbanks
        self.hop_length = hop_length
        self.target_shape = (128, 128)    # Spectrogram output size
    
    def load_audio(self, file_path):
        """Load and normalize audio to fixed duration"""
        audio, sr = librosa.load(file_path, sr=self.sample_rate, duration=self.duration)
        
        # Pad if shorter than target duration
        target_length = self.sample_rate * self.duration
        if len(audio) < target_length:
            audio = np.pad(audio, (0, target_length - len(audio)), mode='constant')
        else:
            audio = audio[:target_length]
        
        return audio
    
    def audio_to_melspectrogram(self, audio):
        """Convert audio waveform to Mel Spectrogram"""
        mel_spec = librosa.feature.melspectrogram(
            y=audio,
            sr=self.sample_rate,
            n_mels=self.n_mels,
            hop_length=self.hop_length,
            fmax=8000
        )
        # Convert to log scale (dB) — mimics human hearing perception
        mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
        return mel_spec_db
    
    def extract_features(self, file_path):
        """Full pipeline: audio file → normalized spectrogram array"""
        audio = self.load_audio(file_path)
        mel_spec = self.audio_to_melspectrogram(audio)
        
        # Normalize to [0, 1]
        mel_spec_normalized = (mel_spec - mel_spec.min()) / (mel_spec.max() - mel_spec.min())
        
        # Resize to fixed shape
        from skimage.transform import resize
        mel_spec_resized = resize(mel_spec_normalized, self.target_shape)
        
        # Add channel dimension (for CNN input)
        mel_spec_3ch = np.stack([mel_spec_resized] * 3, axis=-1)  # Grayscale → RGB
        
        return mel_spec_3ch.astype(np.float32)
    
    def augment_audio(self, audio):
        """Data augmentation for better generalization"""
        augmented = []
        
        # Time stretching
        stretched = librosa.effects.time_stretch(audio, rate=np.random.uniform(0.8, 1.2))
        augmented.append(stretched[:len(audio)])
        
        # Pitch shifting
        pitched = librosa.effects.pitch_shift(audio, sr=self.sample_rate, n_steps=np.random.randint(-3, 3))
        augmented.append(pitched)
        
        # Add background noise
        noise = np.random.randn(len(audio)) * 0.005
        noisy = audio + noise
        augmented.append(noisy)
        
        return augmented