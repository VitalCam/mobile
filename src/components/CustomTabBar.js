import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function CustomTabBar({ state, descriptors, navigation }) {
  const getIconName = (routeName, isFocused) => {
    switch (routeName) {
      case 'Home':
        return 'home';
      case 'History':
        return 'calendar-outline';
      case 'Insights':
        return null; // Will use MaterialCommunityIcons
      case 'Profile':
        return 'person-outline';
      default:
        return 'home';
    }
  };

  const getLabel = (routeName) => {
    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'History':
        return 'History';
      case 'Insights':
        return 'Insights';
      case 'Profile':
        return 'Profile';
      default:
        return routeName;
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.bottomNavSafeArea}>
      <View style={styles.bottomNav}>
        <View style={styles.navContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const iconName = getIconName(route.name, isFocused);
            const label = getLabel(route.name);

            return (
              <TouchableOpacity
                key={route.key}
                style={[styles.navItem, isFocused && styles.activeNavItem]}
                onPress={onPress}
                activeOpacity={0.7}
              >
                {route.name === 'Insights' ? (
                  <MaterialCommunityIcons
                    name="lightbulb-on-outline"
                    size={22}
                    color={isFocused ? 'white' : '#94a3b8'}
                  />
                ) : (
                  <Ionicons
                    name={iconName}
                    size={22}
                    color={isFocused ? 'white' : '#94a3b8'}
                  />
                )}
                <Text style={[styles.navLabel, isFocused && styles.activeNavLabel]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomNavSafeArea: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  bottomNav: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    minWidth: 60,
  },
  activeNavItem: {
    backgroundColor: '#6366f1',
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    color: '#94a3b8',
  },
  activeNavLabel: {
    color: 'white',
  },
});
