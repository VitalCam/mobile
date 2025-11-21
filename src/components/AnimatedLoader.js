import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const AnimatedLoader = ({
  size = 40,
  color = '#007AFF',
  style = {},
  dots = 3,
  animationSpeed = 600
}) => {
  const animations = useRef([]);

  // Initialize animations for each dot
  useEffect(() => {
    animations.current = Array.from({ length: dots }, () =>
      new Animated.Value(0)
    );
  }, [dots]);

  useEffect(() => {
    const createWaveAnimation = () => {
      const animationsSequence = animations.current.map((anim, index) => {
        return Animated.sequence([
          Animated.delay(index * (animationSpeed / dots)),
          Animated.timing(anim, {
            toValue: 1,
            duration: animationSpeed,
            useNativeDriver: true,
          }),
        ]);
      });

      Animated.parallel(animationsSequence).start(() => {
        // Reset all animations
        animations.current.forEach((anim) => anim.setValue(0));
        // Restart the sequence
        setTimeout(createWaveAnimation, 200);
      });
    };

    createWaveAnimation();
  }, [animationSpeed, dots]);

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }, style]}>
      {animations.current.map((animation, index) => (
        <Animated.View
          key={index}
          style={{
            width: size / 4,
            height: size / 4,
            borderRadius: size / 8,
            backgroundColor: color,
            marginHorizontal: 2,
            transform: [
              {
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.5],
                }),
              },
            ],
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1],
            }),
          }}
        />
      ))}
    </View>
  );
};

// Pulse Loader Component
export const PulseLoader = ({ size = 60, color = '#007AFF', style = {} }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const createPulse = () => {
      Animated.parallel([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        pulseAnim.setValue(1);
        opacityAnim.setValue(1);
        setTimeout(createPulse, 100);
      });
    };

    createPulse();
  }, []);

  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ scale: pulseAnim }],
          opacity: opacityAnim,
        }}
      />
    </View>
  );
};

export default AnimatedLoader;