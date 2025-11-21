import 'react-native-gesture-handler/jestSetup';

// Mock expo-camera
jest.mock('expo-camera', () => ({
  Camera: 'Camera',
  Constants: {
    Type: {
      front: 'front',
    },
  },
}));

// Mock react-native-vision-camera
jest.mock('react-native-vision-camera', () => ({
  Camera: 'Camera',
  useCameraDevice: jest.fn(() => ({})),
  useCameraPermission: jest.fn(() => [true, null]),
}));
