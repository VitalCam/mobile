import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedHeart = ({ size = 20, color = '#FF3B30', bpm = 72 }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const createHeartbeat = () => {
      Animated.sequence([
        // First beat
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.4,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.8,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        // Brief pause
        Animated.delay(100),
        // Second beat (lub-dub)
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 80,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.9,
            duration: 80,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 80,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 80,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        // Calculate next heartbeat interval
        const interval = 60000 / bpm; // Convert BPM to milliseconds
        setTimeout(createHeartbeat, Math.max(interval - 360, 300)); // Subtract animation duration
      });
    };

    createHeartbeat();
  }, [bpm, scaleAnim, opacityAnim]);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      >
        <MaterialCommunityIcons
          name="heart"
          size={size}
          color={color}
        />
      </Animated.View>
    </View>
  );
};

export default AnimatedHeart;