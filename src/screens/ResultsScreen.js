import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import {
  formatBPM,
  formatHRV,
  formatPercentage,
  getQualityDescription,
  getConfidenceBadge,
  formatTimestamp,
  generateRecommendations,
  validateScanData
} from '../utils/helpers';
import { generateHealthInsights } from '../services/mockApi';
import Header, { HeaderStats } from '../components/Header';
import { useTheme } from '../context/ThemeContext';

export default function ResultsScreen({ navigation, route }) {
  const { mode, results: passedResults } = route.params;
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [results, setResults] = useState(passedResults || null);
  const [loading, setLoading] = useState(!passedResults);
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const processResults = (data) => {
    const validation = validateScanData(data, mode);

    if (validation.isValid) {
      setResults(data);
      setInsights(generateHealthInsights(data, mode));
      setRecommendations(generateRecommendations(data, mode));
    } else {
      // Handle invalid data
      console.warn('Invalid scan data:', validation.errors);
      setResults(data); // Still show results but with warnings
    }

    setLoading(false);
  };

  useEffect(() => {
    if (passedResults) {
      // Use results passed from camera
      processResults(passedResults);
    } else {
      // Fallback mock data if no results passed
      setTimeout(() => {
        const mockResults = {
          bpm: 72,
          hrv: 45,
          quality: 0.87,
          stress_score: 0.35,
          fatigue_score: 0.42,
          face_wellness: 76,
          confidence: 'high',
          timestamp: new Date().toISOString(),
          processing_time: 2500
        };
        processResults(mockResults);
      }, 2000);
    }
  }, [passedResults, processResults]);

  const MetricCard = ({ title, value, subtitle, color, status }) => (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={[styles.metricValue, { color: color || '#333' }]}>
        {value}
      </Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
      {status && (
        <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.statusText, { color }]}>{status}</Text>
        </View>
      )}
    </View>
  );

  const InsightCard = ({ insight }) => (
    <View style={[styles.insightCard, styles[`${insight.type}Card`]]}>
      <Text style={styles.insightTitle}>{insight.title}</Text>
      <Text style={styles.insightMessage}>{insight.message}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          <MaterialIcons name="search" size={20} color={theme.colors.text} /> Analyzing your scan...
        </Text>
        <Text style={styles.loadingSubtext}>Processing biometric signals</Text>
      </View>
    );
  }

  // Format data for display
  const bpmData = formatBPM(results.bpm);
  const hrvData = mode === 'ppg' ? formatHRV(results.hrv) : null;
  const qualityData = formatPercentage(results.quality);
  const confidenceBadge = getConfidenceBadge(results.confidence);

  return (
    <View style={styles.container}>
      <Header
        title={mode === 'ppg' ? 'PPG Analysis' : 'Face Wellness'}
        subtitle={`Completed at ${formatTimestamp(results.timestamp)}`}
        showBackButton={true}
        onBackPress={() => navigation.navigate('Home')}
        variant="primary"
        rightComponent={<HeaderStats bpm={results.bpm} quality={results.quality} />}
      />

      <ScrollView style={styles.scrollContainer}>
        {/* Confidence Badge */}
        <View style={styles.confidenceSection}>
          <View style={[styles.confidenceBadge, { backgroundColor: confidenceBadge.bgColor }]}>
            <Text style={[styles.confidenceText, { color: confidenceBadge.color }]}>
              {confidenceBadge.text}
            </Text>
          </View>
        </View>

      {/* Main Metrics */}
      <View style={styles.metricsContainer}>
        <MetricCard
          title="Heart Rate"
          value={`${bpmData.value} BPM`}
          color={bpmData.color}
          status={bpmData.status}
        />

        {mode === 'ppg' && hrvData && (
          <MetricCard
            title="Heart Rate Variability"
            value={`${hrvData.value} ms`}
            color={hrvData.color}
            status={hrvData.status}
          />
        )}

        {mode === 'face' && (
          <>
            <MetricCard
              title="Stress Level"
              value={`${formatPercentage(results.stress_score, true).value}%`}
              color={formatPercentage(results.stress_score, true).color}
              subtitle="Lower is better"
            />

            <MetricCard
              title="Fatigue Level"
              value={`${formatPercentage(results.fatigue_score, true).value}%`}
              color={formatPercentage(results.fatigue_score, true).color}
              subtitle="Lower is better"
            />

            <MetricCard
              title="Face Wellness Score"
              value={`${results.face_wellness}/100`}
              color={results.face_wellness > 70 ? '#34C759' : results.face_wellness > 50 ? '#FF9500' : '#FF3B30'}
            />
          </>
        )}

        <MetricCard
          title="Signal Quality"
          value={`${qualityData.value}%`}
          color={qualityData.color}
          subtitle={getQualityDescription(results.quality)}
        />
      </View>

      {/* Health Insights */}
      {insights.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="bulb" size={18} color="#FF9500" /> Health Insights
          </Text>
          {insights.map((insight, index) => (
            <InsightCard key={index} insight={insight} />
          ))}
        </View>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <MaterialIcons name="assignment" size={18} color="#007AFF" /> Recommendations
          </Text>
          <View style={styles.recommendationsList}>
            {recommendations.map((rec, index) => (
              <Text key={index} style={styles.recommendationItem}>
                • {rec}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Technical Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <MaterialIcons name="settings" size={18} color="#666" /> Technical Details
        </Text>
        <View style={styles.technicalDetails}>
          <Text style={styles.technicalItem}>
            Processing Time: {(results.processing_time / 1000).toFixed(1)}s
          </Text>
          {mode === 'face' && (
            <>
              <Text style={styles.technicalItem}>
                Respiratory Rate: {results.respiratory_rate} breaths/min
              </Text>
              <Text style={styles.technicalItem}>
                Face Detection: {(results.face_detection_confidence * 100).toFixed(1)}%
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimer}>
          <Ionicons name="warning" size={16} color="#FF9500" /> These are wellness insights for informational purposes only.
          Not intended for medical diagnosis. Consult healthcare professionals for medical concerns.
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Camera', { mode })}
        >
          <Text style={styles.secondaryButtonText}>Retake Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.primaryButtonText}>New Scan</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  confidenceSection: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: theme.colors.surface,
    marginBottom: 1,
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricsContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: '48%',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricTitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme.colors.text,
  },
  metricSubtitle: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  section: {
    backgroundColor: theme.colors.surface,
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 16,
  },
  insightCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  successCard: {
    backgroundColor: '#f0f9f0',
    borderLeftColor: '#34C759',
  },
  warningCard: {
    backgroundColor: '#fff8e6',
    borderLeftColor: '#FF9500',
  },
  infoCard: {
    backgroundColor: '#f0f8ff',
    borderLeftColor: '#007AFF',
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: theme.colors.text,
  },
  insightMessage: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  recommendationsList: {
    marginTop: 8,
  },
  recommendationItem: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  technicalDetails: {
    marginTop: 8,
  },
  technicalItem: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  disclaimerContainer: {
    backgroundColor: theme.colors.warning + '20',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderColor: theme.colors.warning + '60',
    borderWidth: 1,
  },
  disclaimer: {
    fontSize: 13,
    color: theme.colors.warning,
    textAlign: 'center',
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
    justifyContent: 'space-between',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
