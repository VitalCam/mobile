import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen({ navigation }) {
  const styles = getStyles();

  // Mock notifications data
  const notifications = [
    {
      id: '1',
      type: 'scan_complete',
      title: 'Scan Complete',
      message: 'Your heart rate analysis is ready to view',
      time: '2 minutes ago',
      icon: 'heart-pulse',
      iconColor: '#ef4444',
      bgColor: '#fee2e2',
      unread: true,
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Daily Scan Reminder',
      message: "Don't forget your daily wellness check-in",
      time: '1 hour ago',
      icon: 'bell',
      iconColor: '#6366f1',
      bgColor: '#e0e7ff',
      unread: true,
    },
    {
      id: '3',
      type: 'insight',
      title: 'New Health Insight',
      message: 'Your stress levels have improved by 15% this week',
      time: '3 hours ago',
      icon: 'lightbulb-on',
      iconColor: '#f59e0b',
      bgColor: '#fef3c7',
      unread: false,
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: '7-day streak completed. Keep up the great work!',
      time: 'Yesterday',
      icon: 'trophy',
      iconColor: '#10b981',
      bgColor: '#d1fae5',
      unread: false,
    },
    {
      id: '5',
      type: 'update',
      title: 'New Feature Available',
      message: 'Try our new HRV analysis for better insights',
      time: '2 days ago',
      icon: 'sparkles',
      iconColor: '#8b5cf6',
      bgColor: '#e9d5ff',
      unread: false,
    },
    {
      id: '6',
      type: 'health_tip',
      title: 'Health Tip',
      message: 'Morning scans show more consistent results',
      time: '3 days ago',
      icon: 'information',
      iconColor: '#3b82f6',
      bgColor: '#bfdbfe',
      unread: false,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Notifications</Text>
              <Text style={styles.headerSubtitle}>
                {notifications.filter((n) => n.unread).length} unread
              </Text>
            </View>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="checkmark-done" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Today Section */}
        {notifications.filter((n) => n.time.includes('minute') || n.time.includes('hour')).length >
          0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today</Text>
            {notifications
              .filter((n) => n.time.includes('minute') || n.time.includes('hour'))
              .map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={[styles.notificationCard, notification.unread && styles.notificationUnread]}
                  activeOpacity={0.7}
                >
                  <View style={[styles.notificationIcon, { backgroundColor: notification.bgColor }]}>
                    <MaterialCommunityIcons
                      name={notification.icon}
                      size={24}
                      color={notification.iconColor}
                    />
                  </View>
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationHeader}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      {notification.unread && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}

        {/* Earlier Section */}
        {notifications.filter((n) => !n.time.includes('minute') && !n.time.includes('hour'))
          .length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Earlier</Text>
            {notifications
              .filter((n) => !n.time.includes('minute') && !n.time.includes('hour'))
              .map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={[styles.notificationCard, notification.unread && styles.notificationUnread]}
                  activeOpacity={0.7}
                >
                  <View style={[styles.notificationIcon, { backgroundColor: notification.bgColor }]}>
                    <MaterialCommunityIcons
                      name={notification.icon}
                      size={24}
                      color={notification.iconColor}
                    />
                  </View>
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationHeader}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      {notification.unread && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="bell-off-outline" size={64} color="#cbd5e1" />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptySubtitle}>
              You're all caught up! We'll notify you of important updates.
            </Text>
          </View>
        )}
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
      paddingBottom: 24,
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
      alignItems: 'center',
      gap: 16,
    },
    backBtn: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    headerCenter: {
      flex: 1,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: 'white',
      marginBottom: 2,
    },
    headerSubtitle: {
      fontSize: 13,
      color: 'white',
      opacity: 0.9,
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

    // Sections
    section: {
      marginTop: 24,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 12,
      paddingHorizontal: 24,
    },

    // Notifications
    notificationCard: {
      backgroundColor: 'white',
      marginHorizontal: 24,
      marginBottom: 12,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      gap: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    notificationUnread: {
      borderLeftWidth: 4,
      borderLeftColor: '#6366f1',
    },
    notificationIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationContent: {
      flex: 1,
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6,
    },
    notificationTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: '#0f172a',
      flex: 1,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#6366f1',
    },
    notificationMessage: {
      fontSize: 14,
      color: '#64748b',
      lineHeight: 20,
      marginBottom: 8,
    },
    notificationTime: {
      fontSize: 12,
      color: '#94a3b8',
    },

    // Empty State
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 80,
      paddingHorizontal: 40,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#0f172a',
      marginTop: 16,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      color: '#94a3b8',
      textAlign: 'center',
      lineHeight: 22,
    },
  });
