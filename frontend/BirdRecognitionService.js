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
```

---

## PART 7 — How the Math Works (Simple Explanation)

Let us walk through a real example so you understand exactly what happens:

**Scenario**: User is in Kerala. They record a bird sound.

**Model raw output** (before location filter):
```
// Great_Hornbill:           0.45  ← model is 45% sure
// Malabar_Whistling_Thrush: 0.30  ← model is 30% sure
// Desert_Wheatear:          0.20  ← model is 20% sure (WRONG — desert bird)
// Indian_Robin:             0.05
```

**Location prior for Kerala**:
```
Great_Hornbill:           0.80  ← confirmed present in Kerala
Malabar_Whistling_Thrush: 0.95  ← endemic to Kerala (very high!)
Desert_Wheatear:          0.01  ← almost never in Kerala
Indian_Robin:             0.80  ← confirmed present
```

**After applying location filter** (location_weight = 0.3):
```
multiplier = 0.7 + (0.3 × prior)

Great_Hornbill:           0.45 × (0.7 + 0.3×0.80) = 0.45 × 0.94 = 0.423
Malabar_Whistling_Thrush: 0.30 × (0.7 + 0.3×0.95) = 0.30 × 0.985 = 0.296
Desert_Wheatear:          0.20 × (0.7 + 0.3×0.01) = 0.20 × 0.703 = 0.141
Indian_Robin:             0.05 × (0.7 + 0.3×0.80) = 0.05 × 0.94  = 0.047
```

After normalization (dividing by total 0.907):
```
Great_Hornbill:           0.467  ← slightly boosted
Malabar_Whistling_Thrush: 0.326  ← boosted because endemic to Kerala
Desert_Wheatear:          0.155  ← reduced (desert bird in Kerala is unlikely)
Indian_Robin:             0.052
```

The Desert Wheatear went from 20% → 15.5%. The Malabar Whistling Thrush went up slightly. The model was not overridden — it was **gently guided** by location. This is the key philosophy: location helps, it does not dictate.

---

## Complete Updated Flow
```
User in Kerala opens app
        ↓
User chooses: "Use my state" → picks Kerala from dropdown
        OR: "Use GPS" → phone sends coordinates
        OR: "No location" → filter skipped entirely
        ↓
React Native sends: audio + image + state/coordinates to FastAPI
        ↓
Backend resolves state name
        ↓
Audio model → raw probabilities (all 500 species)
Image model → raw probabilities (all 500 species)
        ↓
Weighted fusion: 55% audio + 45% image
        ↓
Location filter applied (if state available):
  - Load Kerala row from prior matrix
  - Apply seasonal check (month of year)
  - Multiply model output by location weights
  - Re-normalize
        ↓
Top 5 results → fetch from PostgreSQL
        ↓
Response to React Native:
  {
    bird_name: "Great Hornbill",
    scientific_name: "Buceros bicornis",
    confidence: "46.7%",
    habitat: "Dense forest",
    location_filter: "Kerala filter applied",
    alternatives: [...]
  }