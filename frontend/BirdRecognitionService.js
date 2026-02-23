import * as Location from 'expo-location';

const API_BASE = 'https://your-backend.com/api/v1';

// Full list of Indian states for the dropdown picker
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi',
  'Jammu and Kashmir', 'Ladakh'
];

export const recognizeBirdWithLocation = async ({
  audioUri,
  imageUri,
  useLocation = true,
  manualStateName = null,   // if user picked from dropdown
  useGPS = false,           // if user allowed GPS
}) => {
  const formData = new FormData();

  // Attach audio file
  formData.append('audio', {
    uri: audioUri,
    type: 'audio/wav',
    name: 'bird_sound.wav',
  });

  // Attach image file
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'bird_photo.jpg',
  });

  // Tell backend whether to apply location filter at all
  formData.append('use_location', useLocation.toString());

  if (useLocation) {
    if (manualStateName) {
      // User picked a state from dropdown — send state name
      formData.append('state_name', manualStateName);

    } else if (useGPS) {
      // User allowed GPS — get coordinates
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          formData.append('latitude', location.coords.latitude.toString());
          formData.append('longitude', location.coords.longitude.toString());
        }
      } catch (error) {
        console.log('GPS unavailable, proceeding without location');
        // No problem — backend handles missing location gracefully
      }
    }
    // If neither manualStateName nor useGPS — no location sent, filter skipped
  }

  const response = await fetch(`${API_BASE}/recognize/fusion`, {
    method: 'POST',
    body: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return await response.json();
};