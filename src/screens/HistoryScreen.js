import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const styles = getStyles();

  // Mock history data
  const historyData = [
    {
      id: '1',
      type: 'ppg',
      title: 'Heart Rate Analysis',
      date: 'Today, 2:30 PM',
      result: '72 BPM',
      status: 'normal',
      icon: 'heart-pulse',
      color: '#ef4444',
      bgColor: '#fee2e2',
    },
    {
      id: '2',
      type: 'face',
      title: 'Facial Wellness Scan',
      date: 'Today, 10:15 AM',
      result: 'Low Stress',
      status: 'good',
      icon: 'face-recognition',
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      id: '3',
      type: 'ppg',
      title: 'Heart Rate Analysis',
      date: 'Yesterday, 6:45 PM',
      result: '68 BPM',
      status: 'normal',
      icon: 'heart-pulse',
      color: '#ef4444',
      bgColor: '#fee2e2',
    },
    {
      id: '4',
      type: 'face',
      title: 'Facial Wellness Scan',
      date: 'Yesterday, 3:20 PM',
      result: 'Moderate Stress',
      status: 'attention',
      icon: 'face-recognition',
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      id: '5',
      type: 'ppg',
      title: 'Heart Rate Analysis',
      date: 'Nov 20, 11:00 AM',
      result: '75 BPM',
      status: 'normal',
      icon: 'heart-pulse',
      color: '#ef4444',
      bgColor: '#fee2e2',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
      case 'good':
        return '#10b981';
      case 'attention':
        return '#f59e0b';
      case 'warning':
        return '#ef4444';
      default:
        return '#94a3b8';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Scan History</Text>
              <Text style={styles.headerSubtitle}>Your health records</Text>
            </View>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="filter" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Filter Tabs */}
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          <TouchableOpacity
            style={[styles.filterTab, selectedFilter === 'all' && styles.filterTabActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterText, selectedFilter === 'all' && styles.filterTextActive]}>
              All Scans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, selectedFilter === 'ppg' && styles.filterTabActive]}
            onPress={() => setSelectedFilter('ppg')}
          >
            <Text style={[styles.filterText, selectedFilter === 'ppg' && styles.filterTextActive]}>
              Heart Rate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, selectedFilter === 'face' && styles.filterTabActive]}
            onPress={() => setSelectedFilter('face')}
          >
            <Text style={[styles.filterText, selectedFilter === 'face' && styles.filterTextActive]}>
              Wellness
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* History List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.listContainer}>
          {historyData
            .filter((item) => selectedFilter === 'all' || item.type === selectedFilter)
            .map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.historyCard}
                onPress={() => navigation.navigate('Results', { scanData: item })}
                activeOpacity={0.7}
              >
                <View style={[styles.historyIcon, { backgroundColor: item.bgColor }]}>
                  <MaterialCommunityIcons name={item.icon} size={28} color={item.color} />
                </View>
                <View style={styles.historyDetails}>
                  <Text style={styles.historyTitle}>{item.title}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
                <View style={styles.historyResult}>
                  <Text style={styles.resultValue}>{item.result}</Text>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                </View>
              </TouchableOpacity>
            ))}
        </View>

        {/* Empty State */}
        {historyData.filter((item) => selectedFilter === 'all' || item.type === selectedFilter)
          .length === 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="history" size={64} color="#cbd5e1" />
            <Text style={styles.emptyTitle}>No scans yet</Text>
            <Text style={styles.emptySubtitle}>
              Start scanning to see your health history
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

    // Filter Section
    filterSection: {
      backgroundColor: 'white',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0',
    },
    filterScrollContent: {
      paddingHorizontal: 24,
      gap: 12,
    },
    filterTab: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: '#f1f5f9',
    },
    filterTabActive: {
      backgroundColor: '#6366f1',
    },
    filterText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#64748b',
    },
    filterTextActive: {
      color: 'white',
    },

    // History List
    listContainer: {
      paddingHorizontal: 24,
      paddingTop: 20,
      gap: 12,
    },
    historyCard: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    historyIcon: {
      width: 56,
      height: 56,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    historyDetails: {
      flex: 1,
    },
    historyTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#0f172a',
      marginBottom: 4,
    },
    historyDate: {
      fontSize: 13,
      color: '#94a3b8',
    },
    historyResult: {
      alignItems: 'flex-end',
    },
    resultValue: {
      fontSize: 16,
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: 6,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },

    // Empty State
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
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
    },
  });
