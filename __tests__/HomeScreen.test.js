import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';

const mockNavigation = {
  navigate: jest.fn(),
};

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    expect(getByText('VitalCam')).toBeTruthy();
    expect(getByText('Heart Rate & Face Wellness Scanner')).toBeTruthy();
    expect(getByText('Finger PPG Scan')).toBeTruthy();
    expect(getByText('Face Vital Scan')).toBeTruthy();
  });

  it('navigates to camera on button press', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByText('Finger PPG Scan'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Camera', { mode: 'ppg' });

    fireEvent.press(getByText('Face Vital Scan'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Camera', { mode: 'face' });
  });
});
