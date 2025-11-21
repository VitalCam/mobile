import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

// Theme definitions
export const lightTheme = {
  name: 'light',
  colors: {
    primary: '#007AFF',
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    textLight: '#888888',
    border: '#e9ecef',
    shadow: '#000000',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  statusBar: 'dark',
};

export const darkTheme = {
  name: 'dark',
  colors: {
    primary: '#0A84FF',
    background: '#1c1c1e',
    surface: '#2c2c2e',
    text: '#ffffff',
    textSecondary: '#ebebf5',
    textLight: '#8e8e93',
    border: '#38383a',
    shadow: '#000000',
    success: '#30d158',
    warning: '#ff9f0a',
    error: '#ff453a',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  statusBar: 'light',
};

// Theme context
const ThemeContext = createContext({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme based on system preference
  useEffect(() => {
    const systemColorScheme = Appearance.getColorScheme();
    setIsDark(systemColorScheme === 'dark');

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === 'dark');
    });

    return () => subscription?.remove();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setTheme = (darkMode) => {
    setIsDark(darkMode);
  };

  const theme = isDark ? darkTheme : lightTheme;

  const value = {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper function to get themed styles
export const getThemedStyles = (styleFunction, theme) => {
  return styleFunction(theme);
};

export default ThemeContext;