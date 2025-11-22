import React, { useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from './src/context/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import InsightsScreen from './src/screens/InsightsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';

const Stack = createStackNavigator();

// Keep the splash screen visible while we prepare the app
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load any resources or data here
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false, // Hide default navigation headers
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Camera" component={CameraScreen} />
              <Stack.Screen name="Results" component={ResultsScreen} />
              <Stack.Screen name="History" component={HistoryScreen} />
              <Stack.Screen name="Insights" component={InsightsScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Notifications" component={NotificationsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
