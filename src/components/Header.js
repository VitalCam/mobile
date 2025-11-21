import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import AnimatedHeart from './AnimatedHeart';

const Header = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightComponent,
  variant = 'primary', // 'primary', 'transparent', 'gradient'
  statusBarStyle
}) => {
  const { theme, isDark } = useTheme();
  const styles = getStyles(theme);

  // Animation values
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const slideInAnim = useRef(new Animated.Value(-50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const heartBeatAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Initialize animations on mount
  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Slide in animation for title
    Animated.timing(slideInAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Scale animation for logo
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Heart beat animation (continuous)
    const heartBeat = () => {
      Animated.sequence([
        Animated.timing(heartBeatAnim, {
          toValue: 1.2,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(heartBeatAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(heartBeat, 2000); // Repeat every 2 seconds
      });
    };
    heartBeat();

    // Floating animation for subtle movement
    const float = () => {
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -3,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => float());
    };
    float();
  }, []);

  const getHeaderStyle = () => {
    switch (variant) {
      case 'transparent':
        return [styles.header, styles.transparentHeader];
      case 'gradient':
        return [styles.header, styles.gradientHeader];
      default:
        return [styles.header, styles.primaryHeader];
    }
  };

  const getTextColor = () => {
    return variant === 'primary' ? '#FFFFFF' : '#FFFFFF';
  };

  const resolvedStatusBarStyle = statusBarStyle || (isDark ? 'light' : 'dark');

  return (
    <>
      <StatusBar
        barStyle={resolvedStatusBarStyle === 'light' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={getHeaderStyle()} edges={['top', 'left', 'right']}>
        <Animated.View style={[
          styles.headerContent,
          {
            opacity: fadeInAnim,
            transform: [{ translateY: floatAnim }]
          }
        ]}>
          {/* Left Section */}
          <View style={styles.leftSection}>
            {showBackButton ? (
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={onBackPress}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color={getTextColor()}
                  />
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <Animated.View
                style={[
                  styles.logoIcon,
                  { transform: [{ scale: heartBeatAnim }] }
                ]}
              >
                <AnimatedHeart size={20} color="#FFFFFF" bpm={75} />
              </Animated.View>
            )}
          </View>

          {/* Center Section */}
          <View style={styles.centerSection}>
            <Animated.View
              style={[
                styles.titleContainer,
                { transform: [{ translateY: slideInAnim }] }
              ]}
            >
              <Text style={[styles.appTitle, { color: getTextColor() }]}>
                {title || 'VitalCam'}
              </Text>
              {subtitle && (
                <Text style={[styles.subtitle, { color: getTextColor(), opacity: 0.8 }]}>
                  {subtitle}
                </Text>
              )}
            </Animated.View>
          </View>

          {/* Right Section */}
          <View style={styles.rightSection}>
            {rightComponent ? (
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                {rightComponent}
              </Animated.View>
            ) : (
              <View style={{ width: 44, height: 44, opacity: 0 }} />
            )}
          </View>
        </Animated.View>

        {/* Bottom border/shadow effect */}
        <Animated.View style={[styles.headerShadow, { opacity: fadeInAnim }]} />
      </SafeAreaView>
    </>
  );
};

const getStyles = (theme) => StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '12%',
  },
  primaryHeader: {
    backgroundColor: theme.colors.primary,
  },
  transparentHeader: {
    backgroundColor: `${theme.colors.primary}E6`, // 90% opacity
  },
  gradientHeader: {
    backgroundColor: theme.colors.primary,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '5%',
  },
  leftSection: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerSection: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    width: '25%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
    marginLeft: -1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 20,
  },
  titleContainer: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: '0.5%',
    fontWeight: '500',
  },
  headerShadow: {
    height: '0.2%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: '1%',
    width: '100%',
  },

  // Right component styles for common use cases
  rightButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  rightButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusDotActive: {
    backgroundColor: '#34C759',
  },
  statusDotInactive: {
    backgroundColor: '#FF9500',
  },
});

// Pre-built right components
export const HeaderStatusDot = ({ isActive = false }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={[styles.statusDot, isActive ? styles.statusDotActive : styles.statusDotInactive]} />
  );
};

export const HeaderButton = ({ title, onPress, disabled = false }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <TouchableOpacity
      style={[styles.rightButton, disabled && { opacity: 0.5 }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.rightButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const HeaderStats = ({ bpm, quality }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (bpm) {
      const pulse = () => {
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Pulse based on heart rate (60000ms / bpm = interval)
          const interval = bpm ? 60000 / bpm : 1000;
          setTimeout(pulse, Math.max(interval, 500)); // Min 500ms for visual comfort
        });
      };
      pulse();
    }
  }, [bpm, pulseAnim]);

  return (
    <View style={{ alignItems: 'center' }}>
      {bpm && (
        <Animated.Text
          style={[
            styles.rightButtonText,
            { fontSize: 12, transform: [{ scale: pulseAnim }] }
          ]}
        >
          <MaterialCommunityIcons name="heart-pulse" size={12} color="#FFFFFF" /> {bpm}
        </Animated.Text>
      )}
      {quality && (
        <Text style={[styles.rightButtonText, { fontSize: 10, opacity: 0.8 }]}>
          {Math.round(quality * 100)}%
        </Text>
      )}
    </View>
  );
};

export default Header;