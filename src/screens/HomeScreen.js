import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Custom Header with Purple Gradient */}
        <SafeAreaView edges={['top']} style={styles.header}>
          {/* Header Content */}
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View style={styles.logoSection}>
                <View style={styles.logo}>
                  <Text style={styles.logoEmoji}>💜</Text>
                </View>
                <View style={styles.appInfo}>
                  <Text style={styles.appName}>VitalCam</Text>
                  <Text style={styles.appTagline}>AI Health Companion</Text>
                </View>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Ionicons name="notifications" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <Ionicons name="menu" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* User Stats */}
            <View style={styles.userStats}>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>7</Text>
                  <Text style={styles.statLabel}>DAY STREAK</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>98%</Text>
                  <Text style={styles.statLabel}>HEALTH SCORE</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>24</Text>
                  <Text style={styles.statLabel}>SCANS TODAY</Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>

        {/* Trust Badges Section */}
        <View style={styles.trustSection}>
          <View style={styles.trustContainer}>
            <View style={styles.trustBadge}>
              <View style={[styles.badgeIconWrapper, styles.fdaBadge]}>
                <MaterialIcons name="star" size={24} color="#8b5cf6" />
              </View>
              <Text style={styles.badgeText}>FDA{'\n'}Cleared</Text>
            </View>
            <View style={styles.trustBadge}>
              <View style={[styles.badgeIconWrapper, styles.hipaaBadge]}>
                <Ionicons name="lock-closed" size={22} color="#f97316" />
              </View>
              <Text style={styles.badgeText}>HIPAA{'\n'}Secure</Text>
            </View>
            <View style={styles.trustBadge}>
              <View style={[styles.badgeIconWrapper, styles.medicalBadge]}>
                <Ionicons name="medical" size={22} color="#3b82f6" />
              </View>
              <Text style={styles.badgeText}>Medical{'\n'}Grade</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Quick Scan Section */}
          <View style={styles.quickActions}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Scan</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>View All →</Text>
              </TouchableOpacity>
            </View>

            {/* Heart Rate Analysis Card */}
            <TouchableOpacity
              style={[styles.scanCard, styles.heartCard]}
              onPress={() => navigation.navigate('Camera', { mode: 'ppg' })}
              activeOpacity={0.8}
            >
              <View style={styles.scanContent}>
                <View style={[styles.scanIconWrapper, styles.heartIconWrapper]}>
                  <Text style={styles.scanEmoji}>❤️</Text>
                </View>
                <View style={styles.scanDetails}>
                  <Text style={styles.scanTitle}>Heart Rate Analysis</Text>
                  <Text style={styles.scanDescription}>
                    Advanced PPG technology for accurate cardiovascular monitoring
                  </Text>
                  <View style={styles.scanMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={16} color="#999" />
                      <Text style={styles.metaText}>30 sec</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <View style={styles.liveIndicator} />
                      <Text style={styles.metaText}>Live tracking</Text>
                    </View>
                    <View style={styles.accuracyBadge}>
                      <Text style={styles.accuracyText}>98% Accurate</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Facial Wellness Scan Card */}
            <TouchableOpacity
              style={[styles.scanCard, styles.faceCard]}
              onPress={() => navigation.navigate('Camera', { mode: 'face' })}
              activeOpacity={0.8}
            >
              <View style={styles.scanContent}>
                <View style={[styles.scanIconWrapper, styles.faceIconWrapper]}>
                  <Text style={styles.scanEmoji}>🎯</Text>
                </View>
                <View style={styles.scanDetails}>
                  <Text style={styles.scanTitle}>Facial Wellness Scan</Text>
                  <Text style={styles.scanDescription}>
                    AI-powered facial analysis for stress and vitality assessment
                  </Text>
                  <View style={styles.scanMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={16} color="#999" />
                      <Text style={styles.metaText}>45 sec</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <View style={styles.liveIndicator} />
                      <Text style={styles.metaText}>Real-time AI</Text>
                    </View>
                    <View style={styles.accuracyBadge}>
                      <Text style={styles.accuracyText}>95% Accurate</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Health Metrics Section */}
          <View style={styles.metricsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Health Metrics</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Details →</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.metricsGrid}>
              <View style={[styles.metricCard, styles.heartRateCard]}>
                <MaterialIcons name="favorite" size={32} color="#ef4444" />
                <Text style={styles.metricName}>Heart Rate</Text>
                <Text style={styles.metricValue}>72 BPM • Normal</Text>
              </View>

              <View style={[styles.metricCard, styles.hrvCard]}>
                <Ionicons name="pulse" size={32} color="#6366f1" />
                <Text style={styles.metricName}>HRV Score</Text>
                <Text style={styles.metricValue}>45 ms • Good</Text>
              </View>

              <View style={[styles.metricCard, styles.stressCard]}>
                <MaterialIcons name="layers" size={32} color="#10b981" />
                <Text style={styles.metricName}>Stress Level</Text>
                <Text style={styles.metricValue}>Low • Relaxed</Text>
              </View>

              <View style={[styles.metricCard, styles.energyCard]}>
                <Ionicons name="sunny" size={32} color="#f59e0b" />
                <Text style={styles.metricName}>Energy Level</Text>
                <Text style={styles.metricValue}>High • Active</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <SafeAreaView edges={['bottom']} style={styles.bottomNavSafeArea}>
        <View style={styles.bottomNav}>
          <View style={styles.navContainer}>
            <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
              <Ionicons name="home" size={22} color="white" />
              <Text style={[styles.navLabel, styles.activeNavLabel]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="calendar-outline" size={22} color="#94a3b8" />
              <Text style={styles.navLabel}>History</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="chatbubble-outline" size={22} color="#94a3b8" />
              <Text style={styles.navLabel}>Insights</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="person-outline" size={22} color="#94a3b8" />
              <Text style={styles.navLabel}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const getStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },

  // Header Styles
  header: {
    backgroundColor: '#6366f1',
    paddingBottom: 70,
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
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  logoEmoji: {
    fontSize: 24,
  },
  appInfo: {
    justifyContent: 'center',
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  appTagline: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
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

  // User Stats
  userStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: 'white',
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },

  // Trust Section
  trustSection: {
    marginTop: -50,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  trustContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  trustBadge: {
    alignItems: 'center',
    flex: 1,
  },
  badgeIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  fdaBadge: {
    backgroundColor: '#e9d5ff',
  },
  hipaaBadge: {
    backgroundColor: '#fed7aa',
  },
  medicalBadge: {
    backgroundColor: '#bfdbfe',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
    lineHeight: 12,
  },

  // Main Content
  mainContent: {
    paddingHorizontal: 24,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  seeAll: {
    fontSize: 13,
    color: '#6366f1',
    fontWeight: '600',
  },

  // Quick Actions
  quickActions: {
    marginBottom: 28,
  },

  // Scan Cards
  scanCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  scanContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  scanIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIconWrapper: {
    backgroundColor: '#fee2e2',
  },
  faceIconWrapper: {
    backgroundColor: '#d1fae5',
  },
  scanEmoji: {
    fontSize: 28,
  },
  scanDetails: {
    flex: 1,
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  scanDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
    lineHeight: 20,
  },
  scanMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#94a3b8',
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
  },
  accuracyBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  accuracyText: {
    fontSize: 11,
    color: '#92400e',
    fontWeight: '600',
  },

  // Health Metrics
  metricsSection: {
    marginBottom: 28,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  metricName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginTop: 8,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 11,
    color: '#94a3b8',
  },

  // Bottom Navigation
  bottomNavSafeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  bottomNav: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
