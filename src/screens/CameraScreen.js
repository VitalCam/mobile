import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { simulateVideoProcessing } from '../services/mockApi';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

export default function CameraScreen({ navigation, route }) {
  const { mode } = route.params; // 'ppg' or 'face'
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const cameraRef = useRef(null);

  const startRecording = async () => {
    if (cameraRef.current && !isRecording && !isProcessing) {
      // Start countdown
      setCountdown(3);
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            performRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const performRecording = async () => {
    setIsRecording(true);

    try {
      // For MVP, we'll simulate recording without actually recording video
      // In production, you would use: const video = await cameraRef.current.recordAsync({...});

      // Simulate recording for the specified duration
      await new Promise(resolve => {
        setTimeout(resolve, mode === 'ppg' ? 30000 : 45000);
      });

      const video = { uri: 'mock://video-path' }; // Mock video object

      setIsRecording(false);
      setIsProcessing(true);
      setProcessingProgress(0);

      // Show processing progress
      await simulateVideoProcessing(mode, (progress) => {
        setProcessingProgress(progress);
      });

      // Process the video for signal extraction
      const analysisResults = await processVideo(video.uri, mode);

      setIsProcessing(false);
      navigation.navigate('Results', {
        videoUri: video.uri,
        mode: mode,
        results: analysisResults
      });
    } catch (error) {
      console.error('Recording failed:', error);
      Alert.alert('Error', 'Failed to record or process video. Please try again.');
      setIsRecording(false);
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const processVideo = async (uri, mode) => {
    // Simulate realistic video processing with mock API
    const { mockPPGAnalysis, mockFaceAnalysis } = require('../services/mockApi');

    try {
      const analysisFunction = mode === 'ppg' ? mockPPGAnalysis : mockFaceAnalysis;
      const result = await analysisFunction({ uri, duration: 45 });

      // Store results for the Results screen
      return result.data;
    } catch (error) {
      console.error('Video processing failed:', error);
      throw error;
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={mode === 'ppg' ? 'back' : 'front'} // Back camera for PPG, front for face
        flash={mode === 'ppg' && isRecording ? 'on' : 'off'} // Flash for PPG
      >
        {/* Overlay Header */}
        <View style={styles.headerContainer}>
          <Header
            title={mode === 'ppg' ? 'PPG Scan' : 'Face Scan'}
            subtitle={isRecording ? 'Recording...' : 'Ready to scan'}
            showBackButton={true}
            onBackPress={() => navigation.goBack()}
            variant="transparent"
            statusBarStyle="light"
          />
        </View>

        <View style={styles.overlay}>
          {/* Top Instructions */}
          <View style={styles.topSection}>
            <Text style={styles.instructions}>
              {mode === 'ppg'
                ? 'Place finger completely over rear camera lens'
                : 'Position face in center with good lighting'
              }
            </Text>

            {isRecording && (
              <Text style={styles.recordingStatus}>
                <Ionicons name="videocam" size={16} color="#FF3B30" /> Recording... ({mode === 'ppg' ? '30' : '45'}s)
              </Text>
            )}
          </View>

          {/* Countdown */}
          {countdown > 0 && (
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownText}>{countdown}</Text>
            </View>
          )}

          {/* Recording Button */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={[
                styles.recordButton,
                isRecording && styles.recording,
                (countdown > 0 || isProcessing) && styles.disabled
              ]}
              onPress={startRecording}
              disabled={isRecording || countdown > 0 || isProcessing}
            >
              <Text style={styles.recordButtonText}>
                {countdown > 0 ? `Get Ready... ${countdown}` :
                 isRecording ? `Recording... (${mode === 'ppg' ? '30' : '45'}s)` :
                 isProcessing ? 'Processing...' :
                 'Start Scan'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>

      {/* Processing Modal */}
      <Modal
        visible={isProcessing}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.processingModal}>
            <ActivityIndicator size="large" color="#007AFF" style={styles.activityIndicator} />
            <Text style={styles.processingTitle}>
              🔬 Analyzing {mode === 'ppg' ? 'Heart Rate' : 'Face Wellness'}
            </Text>
            <Text style={styles.processingSubtitle}>
              Processing biometric signals...
            </Text>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View
                  style={[styles.progressBarFill, { width: `${processingProgress}%` }]}
                />
              </View>
              <Text style={styles.progressText}>{processingProgress}%</Text>
            </View>

            <Text style={styles.processingNote}>
              This may take a moment for accurate results
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
  },
  topSection: {
    padding: 20,
    paddingTop: 140, // Adjusted for header
    alignItems: 'center',
  },
  modeTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  instructions: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  recordingStatus: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
    backgroundColor: 'rgba(255,59,48,0.2)',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  countdownContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 60,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  countdownText: {
    color: '#007AFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  bottomSection: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  recording: {
    backgroundColor: '#FF3B30',
    transform: [{ scale: 1.05 }],
  },
  disabled: {
    backgroundColor: '#666',
    opacity: 0.7,
  },
  recordButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Processing Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingModal: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    maxWidth: 300,
    width: '80%',
  },
  activityIndicator: {
    marginBottom: 20,
  },
  processingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: theme.colors.text,
  },
  processingSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  processingNote: {
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Permission screen styles
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
