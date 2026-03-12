import tensorflow as tf
import numpy as np
from sklearn.preprocessing import LabelEncoder
from pathlib import Path
import pickle
from audio_preprocessor import AudioPreprocessor
from image_preprocessor import ImagePreprocessor

class BirdDatasetBuilder:
    def __init__(self, audio_dir, image_dir):
        self.audio_dir = Path(audio_dir)
        self.image_dir = Path(image_dir)
        self.audio_preprocessor = AudioPreprocessor()
        self.image_preprocessor = ImagePreprocessor()
        self.label_encoder = LabelEncoder()
    
    def build_audio_dataset(self, augment=True):
        audio_data, labels = [], []
        
        for species_dir in sorted(self.audio_dir.iterdir()):
            if not species_dir.is_dir():
                continue
            species_name = species_dir.name
            
            for audio_file in species_dir.glob("*.wav"):
                features = self.audio_preprocessor.extract_features(audio_file)
                audio_data.append(features)
                labels.append(species_name)
                
                # Data augmentation
                if augment:
                    audio = self.audio_preprocessor.load_audio(audio_file)
                    augmented_audios = self.audio_preprocessor.augment_audio(audio)
                    for aug_audio in augmented_audios:
                        aug_mel = self.audio_preprocessor.audio_to_melspectrogram(aug_audio)
                        aug_mel_norm = (aug_mel - aug_mel.min()) / (aug_mel.max() - aug_mel.min() + 1e-8)
                        from skimage.transform import resize
                        aug_resized = resize(aug_mel_norm, (128, 128))
                        aug_3ch = np.stack([aug_resized] * 3, axis=-1)
                        audio_data.append(aug_3ch.astype(np.float32))
                        labels.append(species_name)
        
        X = np.array(audio_data)
        y = self.label_encoder.fit_transform(labels)
        
        # Save encoder for inference
        with open('models/label_encoder.pkl', 'wb') as f:
            pickle.dump(self.label_encoder, f)
        
        return X, y
    
    def build_tf_dataset(self, X, y, batch_size=32):
        dataset = tf.data.Dataset.from_tensor_slices((X, y))
        dataset = dataset.shuffle(buffer_size=1000)
        dataset = dataset.batch(batch_size)
        dataset = dataset.prefetch(tf.data.AUTOTUNE)
        return dataset