import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Switch } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function ProfileScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const styles = getStyles();

  const profileStats = [
    { label: 'Total Scans', value: '247', icon: 'camera' },
    { label: 'Streak Days', value: '14', icon: 'fire' },
    { label: 'Health Score', value: '98', icon: 'trophy' },
  ];

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: 'account', label: 'Personal Information', screen: null, showArrow: true },
        { icon: 'email', label: 'Email & Password', screen: null, showArrow: true },
        { icon: 'shield-check', label: 'Privacy & Security', screen: null, showArrow: true },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: 'bell',
          label: 'Notifications',
          toggle: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          icon: 'fingerprint',
          label: 'Biometric Login',
          toggle: biometricsEnabled,
          onToggle: setBiometricsEnabled,
        },
        { icon: 'theme-light-dark', label: 'Appearance', screen: null, showArrow: true },
        { icon: 'earth', label: 'Language', subtitle: 'English', showArrow: true },
      ],
    },
    {
      title: 'Health Data',
      items: [
        { icon: 'cloud-upload', label: 'Sync & Backup', screen: null, showArrow: true },
        { icon: 'file-export', label: 'Export Data', screen: null, showArrow: true },
        { icon: 'delete', label: 'Clear History', screen: null, showArrow: true, danger: true },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle', label: 'Help Center', screen: null, showArrow: true },
        { icon: 'file-document', label: 'Terms & Privacy', screen: null, showArrow: true },
        { icon: 'information', label: 'About', subtitle: 'Version 1.0.0', showArrow: true },
      ],
    },
  ];

  const renderSettingItem = (item) => {
    if (item.toggle !== undefined) {
      return (
        <View key={item.label} style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIconWrapper}>
              <MaterialCommunityIcons name={item.icon} size={20} color="#6366f1" />
            </View>
            <Text style={styles.settingLabel}>{item.label}</Text>
          </View>
          <Switch
            value={item.toggle}
            onValueChange={item.onToggle}
            trackColor={{ false: '#e2e8f0', true: '#c7d2fe' }}
            thumbColor={item.toggle ? '#6366f1' : '#f1f5f9'}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={item.label}
        style={styles.settingItem}
        activeOpacity={0.7}
        onPress={() => item.screen && navigation.navigate(item.screen)}
      >
        <View style={styles.settingLeft}>
          <View style={styles.settingIconWrapper}>
            <MaterialCommunityIcons
              name={item.icon}
              size={20}
              color={item.danger ? '#ef4444' : '#6366f1'}
            />
          </View>
          <View>
            <Text style={[styles.settingLabel, item.danger && styles.settingLabelDanger]}>
              {item.label}
            </Text>
            {item.subtitle && <Text style={styles.settingSubtitle}>{item.subtitle}</Text>}
          </View>
        </View>
        {item.showArrow && <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />}
      </TouchableOpacity>
    );
  };

  return (
      
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="settings-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Profile Info */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
              <TouchableOpacity style={styles.editAvatarBtn}>
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Stats */}
        <View style={styles.statsContainer}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <MaterialCommunityIcons name={stat.icon} size={24} color="#6366f1" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.settingsCard}>
              {group.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  {renderSettingItem(item)}
                  {itemIndex < group.items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ by VitalCam
          </Text>
        </View>
      </ScrollView>
    </View>
      
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8fafc',
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      paddingBottom: 120,
    },

    // Header Styles
    header: {
      backgroundColor: '#6366f1',
      paddingBottom: 20,
    },
    headerContent: {
      paddingHorizontal: 24,
      paddingTop: 20,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: 'white',
    },
    iconBtn: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },

    // Profile Card
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,      
    },
    avatarContainer: {
      position: 'relative',
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: 'white',
    },
    avatarText: {
      fontSize: 28,
      fontWeight: '700',
      color: 'white',
    },
    editAvatarBtn: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: '#6366f1',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'white',
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 22,
      fontWeight: '700',
      color: 'white',
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: 14,
      color: 'white',
      opacity: 0.9,
    },

    // Stats
    statsContainer: {
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      marginHorizontal: 24,
      marginTop: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 5,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: '700',
      color: '#0f172a',
      marginTop: 8,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 11,
      color: '#64748b',
      textAlign: 'center',
    },

    // Settings
    settingsGroup: {
      paddingHorizontal: 24,
      marginTop: 32,
    },
    groupTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 12,
    },
    settingsCard: {
      backgroundColor: 'white',
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    settingIconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: '#f1f5f9',
      justifyContent: 'center',
      alignItems: 'center',
    },
    settingLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: '#0f172a',
    },
    settingLabelDanger: {
      color: '#ef4444',
    },
    settingSubtitle: {
      fontSize: 13,
      color: '#94a3b8',
      marginTop: 2,
    },
    divider: {
      height: 1,
      backgroundColor: '#f1f5f9',
      marginLeft: 68,
    },

    // Logout
    logoutBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: 'white',
      marginHorizontal: 24,
      marginTop: 32,
      paddingVertical: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#fee2e2',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#ef4444',
    },

    // Footer
    footer: {
      paddingVertical: 24,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 13,
      color: '#94a3b8',
    },
  });
