import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Dimensions } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function InsightsScreen({ navigation }) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const styles = getStyles();

  // Mock insights data
  const weeklyTrends = [
    { day: 'Mon', heartRate: 72, stress: 3 },
    { day: 'Tue', heartRate: 68, stress: 2 },
    { day: 'Wed', heartRate: 75, stress: 4 },
    { day: 'Thu', heartRate: 70, stress: 2 },
    { day: 'Fri', heartRate: 73, stress: 3 },
    { day: 'Sat', heartRate: 65, stress: 1 },
    { day: 'Sun', heartRate: 69, stress: 2 },
  ];

  const insights = [
    {
      id: '1',
      icon: 'trending-up',
      iconColor: '#10b981',
      bgColor: '#d1fae5',
      title: 'Heart Rate Improving',
      description: 'Your average heart rate has decreased by 5% this week, indicating better cardiovascular health.',
      type: 'positive',
    },
    {
      id: '2',
      icon: 'alert-circle',
      iconColor: '#f59e0b',
      bgColor: '#fef3c7',
      title: 'Stress Spike Detected',
      description: 'Wednesday showed elevated stress levels. Consider relaxation techniques.',
      type: 'attention',
    },
    {
      id: '3',
      icon: 'lightbulb-on',
      iconColor: '#6366f1',
      bgColor: '#e0e7ff',
      title: 'Optimal Scan Times',
      description: 'Morning scans show most consistent results. Try scanning between 8-10 AM.',
      type: 'tip',
    },
    {
      id: '4',
      icon: 'trophy',
      iconColor: '#f97316',
      bgColor: '#fed7aa',
      title: 'Weekly Goal Achieved',
      description: 'You completed 7 health scans this week. Great consistency!',
      type: 'achievement',
    },
  ];

  const stats = [
    {
      label: 'Avg Heart Rate',
      value: '70',
      unit: 'BPM',
      change: '-3%',
      changeType: 'positive',
      icon: 'heart-pulse',
      color: '#ef4444',
    },
    {
      label: 'HRV Score',
      value: '48',
      unit: 'ms',
      change: '+12%',
      changeType: 'positive',
      icon: 'pulse',
      color: '#6366f1',
    },
    {
      label: 'Stress Level',
      value: '2.4',
      unit: '/10',
      change: '-15%',
      changeType: 'positive',
      icon: 'spa',
      color: '#10b981',
    },
    {
      label: 'Scans This Week',
      value: '12',
      unit: 'scans',
      change: '+2',
      changeType: 'neutral',
      icon: 'camera',
      color: '#f59e0b',
    },
  ];

  const maxHeartRate = Math.max(...weeklyTrends.map((t) => t.heartRate));
  const minHeartRate = Math.min(...weeklyTrends.map((t) => t.heartRate));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Health Insights</Text>
              <Text style={styles.headerSubtitle}>Your wellness trends</Text>
            </View>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="share-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Period Selector */}
        <View style={styles.periodSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.periodScrollContent}
          >
            {['day', 'week', 'month', 'year'].map((period) => (
              <TouchableOpacity
                key={period}
                style={[styles.periodTab, selectedPeriod === period && styles.periodTabActive]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text
                  style={[styles.periodText, selectedPeriod === period && styles.periodTextActive]}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statHeader}>
                  <MaterialCommunityIcons name={stat.icon} size={24} color={stat.color} />
                  <View
                    style={[
                      styles.changeIndicator,
                      stat.changeType === 'positive' && styles.changePositive,
                      stat.changeType === 'negative' && styles.changeNegative,
                    ]}
                  >
                    <Text
                      style={[
                        styles.changeText,
                        stat.changeType === 'positive' && styles.changeTextPositive,
                        stat.changeType === 'negative' && styles.changeTextNegative,
                      ]}
                    >
                      {stat.change}
                    </Text>
                  </View>
                </View>
                <Text style={styles.statValue}>
                  {stat.value}
                  <Text style={styles.statUnit}> {stat.unit}</Text>
                </Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Heart Rate Trend Chart */}
        <View style={styles.chartSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Heart Rate Trend</Text>
            <Text style={styles.sectionSubtitle}>This Week</Text>
          </View>
          <View style={styles.chartCard}>
            <View style={styles.chartContainer}>
              {weeklyTrends.map((trend, index) => {
                const height =
                  ((trend.heartRate - minHeartRate) / (maxHeartRate - minHeartRate)) * 100 + 20;
                return (
                  <View key={index} style={styles.barContainer}>
                    <View style={styles.barWrapper}>
                      <View style={[styles.bar, { height: `${height}%` }]} />
                    </View>
                    <Text style={styles.barLabel}>{trend.day}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#6366f1' }]} />
                <Text style={styles.legendText}>Heart Rate (BPM)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Insights List */}
        <View style={styles.insightsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personalized Insights</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All →</Text>
            </TouchableOpacity>
          </View>
          {insights.map((insight) => (
            <View key={insight.id} style={styles.insightCard}>
              <View style={[styles.insightIcon, { backgroundColor: insight.bgColor }]}>
                <MaterialCommunityIcons
                  name={insight.icon}
                  size={24}
                  color={insight.iconColor}
                />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightDescription}>{insight.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <SafeAreaView edges={['bottom']} style={styles.bottomNavSafeArea}>
        <View style={styles.bottomNav}>
          <View style={styles.navContainer}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
              <Ionicons name="home-outline" size={22} color="#94a3b8" />
              <Text style={styles.navLabel}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('History')}
            >
              <Ionicons name="calendar-outline" size={22} color="#94a3b8" />
              <Text style={styles.navLabel}>History</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
              <MaterialCommunityIcons name="lightbulb-on" size={22} color="white" />
              <Text style={[styles.navLabel, styles.activeNavLabel]}>Insights</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('Profile')}
            >
              <Ionicons name="person-outline" size={22} color="#94a3b8" />
              <Text style={styles.navLabel}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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
      paddingBottom: 100,
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
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: 'white',
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
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

    // Period Section
    periodSection: {
      backgroundColor: 'white',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0',
    },
    periodScrollContent: {
      paddingHorizontal: 24,
      gap: 12,
    },
    periodTab: {
      paddingHorizontal: 24,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: '#f1f5f9',
    },
    periodTabActive: {
      backgroundColor: '#6366f1',
    },
    periodText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#64748b',
    },
    periodTextActive: {
      color: 'white',
    },

    // Stats Section
    statsSection: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 16,
      width: (SCREEN_WIDTH - 60) / 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    statHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    changeIndicator: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
      backgroundColor: '#f1f5f9',
    },
    changePositive: {
      backgroundColor: '#d1fae5',
    },
    changeNegative: {
      backgroundColor: '#fee2e2',
    },
    changeText: {
      fontSize: 11,
      fontWeight: '600',
      color: '#64748b',
    },
    changeTextPositive: {
      color: '#10b981',
    },
    changeTextNegative: {
      color: '#ef4444',
    },
    statValue: {
      fontSize: 24,
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: 4,
    },
    statUnit: {
      fontSize: 14,
      fontWeight: '400',
      color: '#94a3b8',
    },
    statLabel: {
      fontSize: 12,
      color: '#64748b',
    },

    // Chart Section
    chartSection: {
      paddingHorizontal: 24,
      paddingTop: 32,
    },
    sectionHeader: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: 4,
    },
    sectionSubtitle: {
      fontSize: 13,
      color: '#94a3b8',
    },
    chartCard: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    chartContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: 120,
      marginBottom: 16,
    },
    barContainer: {
      flex: 1,
      alignItems: 'center',
      height: '100%',
    },
    barWrapper: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: 4,
    },
    bar: {
      width: '80%',
      backgroundColor: '#6366f1',
      borderRadius: 6,
      minHeight: 20,
    },
    barLabel: {
      fontSize: 11,
      color: '#94a3b8',
      marginTop: 8,
      fontWeight: '600',
    },
    chartLegend: {
      borderTopWidth: 1,
      borderTopColor: '#e2e8f0',
      paddingTop: 12,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    legendDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    legendText: {
      fontSize: 12,
      color: '#64748b',
    },

    // Insights Section
    insightsSection: {
      paddingHorizontal: 24,
      paddingTop: 32,
      paddingBottom: 24,
    },
    seeAll: {
      fontSize: 13,
      color: '#6366f1',
      fontWeight: '600',
    },
    insightCard: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 16,
      marginTop: 12,
      flexDirection: 'row',
      gap: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    insightIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    insightContent: {
      flex: 1,
    },
    insightTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: '#0f172a',
      marginBottom: 6,
    },
    insightDescription: {
      fontSize: 13,
      color: '#64748b',
      lineHeight: 20,
    },

    // Bottom Navigation
    bottomNavSafeArea: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      zIndex: 1,
      elevation: 10,
    },
    bottomNav: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTopWidth: 1,
      borderTopColor: '#e2e8f0',
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
