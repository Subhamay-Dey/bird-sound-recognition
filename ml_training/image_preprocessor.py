import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

class ImagePreprocessor:
    def __init__(self, img_size=(224, 224)):
        self.img_size = img_size
    
    def preprocess_image(self, image_path):
        img = tf.keras.utils.load_img(image_path, target_size=self.img_size)
        img_array = tf.keras.utils.img_to_array(img)
        img_array = tf.keras.applications.efficientnet.preprocess_input(img_array)
        return img_array
    
    def get_augmentation_generator(self):
        return ImageDataGenerator(
            rotation_range=20,
            width_shift_range=0.2,
            height_shift_range=0.2,
            horizontal_flip=True,
            zoom_range=0.2,
            brightness_range=[0.8, 1.2],
            validation_split=0.2
        )