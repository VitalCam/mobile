# VitalCam - React Native App (Expo)

A React Native application for camera-based heart rate and face wellness scanning using PPG and rPPG technology.

## Features

- **Finger PPG Scan**: Place finger over camera for heart rate monitoring
- **Face Vital Scan**: Non-contact facial wellness assessment
- **Real-time Processing**: On-device signal extraction
- **Wellness Insights**: Heart rate, HRV, stress, and fatigue metrics

## Technology Stack

- **React Native** with Expo SDK 51+
- **Camera**: expo-camera for video capture
- **Navigation**: React Navigation 6
- **HTTP Client**: Axios for API communication

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # App screens
│   ├── HomeScreen.js   # Landing page
│   ├── CameraScreen.js # Camera interface
│   └── ResultsScreen.js # Results display
├── services/           # API communication
│   └── api.js
└── utils/              # Helper functions
```

## Setup & Installation

1. **Prerequisites**
   - Node.js 18+
   - Expo CLI: `npm install -g @expo/cli`
   - iOS Simulator or Android emulator

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Run on Device/Emulator**
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## Configuration

Update the API base URL in `src/services/api.js` to point to your backend:

```javascript
const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api/v1'
  : 'https://your-production-api.com/api/v1';
```

## API Integration

The app communicates with two backend services:

1. **NestJS API Gateway** - Authentication, validation, and routing
2. **FastAPI Processor** - Signal processing and analysis

See API contracts in the main project README.

## Building for Production

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for Web
expo build:web
```

## Testing

```bash
npm test
```

## Contributing

1. Follow the coding standards
2. Write tests for new features
3. Update documentation as needed

## License

MIT - See main project README for details.
