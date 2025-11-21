// Utility functions for data formatting and calculations

// Format BPM with appropriate styling
export const formatBPM = (bpm) => {
  if (bpm < 60) return { value: bpm, status: 'low', color: '#007AFF' };
  if (bpm > 100) return { value: bpm, status: 'high', color: '#FF3B30' };
  return { value: bpm, status: 'normal', color: '#34C759' };
};

// Format HRV with interpretation
export const formatHRV = (hrv) => {
  if (hrv > 50) return { value: hrv, status: 'excellent', color: '#34C759' };
  if (hrv > 30) return { value: hrv, status: 'good', color: '#007AFF' };
  return { value: hrv, status: 'low', color: '#FF9500' };
};

// Format percentage with color coding
export const formatPercentage = (value, isInverse = false) => {
  const percentage = Math.round(value * 100);
  let color = '#34C759'; // green for good

  if (isInverse) {
    // For stress/fatigue - lower is better
    if (percentage > 70) color = '#FF3B30'; // red for high
    else if (percentage > 40) color = '#FF9500'; // orange for medium
  } else {
    // For quality/wellness - higher is better
    if (percentage < 50) color = '#FF3B30'; // red for low
    else if (percentage < 70) color = '#FF9500'; // orange for medium
  }

  return { value: percentage, color };
};

// Get quality description
export const getQualityDescription = (quality) => {
  if (quality > 0.85) return 'Excellent signal quality';
  if (quality > 0.7) return 'Good signal quality';
  if (quality > 0.5) return 'Fair signal quality';
  return 'Poor signal quality - consider retaking';
};

// Get confidence badge
export const getConfidenceBadge = (confidence) => {
  const badges = {
    high: { text: 'High Confidence', color: '#34C759', bgColor: '#E8F5E8' },
    medium: { text: 'Medium Confidence', color: '#FF9500', bgColor: '#FFF4E6' },
    low: { text: 'Low Confidence', color: '#FF3B30', bgColor: '#FFE6E6' }
  };
  return badges[confidence] || badges.medium;
};

// Format timestamp to readable time
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Generate recommendations based on results
export const generateRecommendations = (data, mode) => {
  const recommendations = [];

  if (mode === 'ppg') {
    if (data.bpm > 100) {
      recommendations.push('Practice deep breathing exercises');
      recommendations.push('Stay hydrated and avoid caffeine');
    }

    if (data.hrv < 30) {
      recommendations.push('Consider meditation or yoga');
      recommendations.push('Ensure adequate sleep (7-9 hours)');
    }

    if (data.quality < 0.7) {
      recommendations.push('Ensure finger fully covers camera and flash');
      recommendations.push('Keep device steady during measurement');
    }
  } else {
    if (data.stress_score > 0.6) {
      recommendations.push('Take regular breaks throughout the day');
      recommendations.push('Try progressive muscle relaxation');
    }

    if (data.fatigue_score > 0.6) {
      recommendations.push('Prioritize consistent sleep schedule');
      recommendations.push('Consider light exercise or stretching');
    }

    if (data.quality < 0.7) {
      recommendations.push('Ensure good lighting on your face');
      recommendations.push('Keep head steady and look directly at camera');
    }
  }

  return recommendations;
};

// Validate scan data
export const validateScanData = (data, mode) => {
  const errors = [];

  if (!data.bpm || data.bpm < 30 || data.bpm > 220) {
    errors.push('Invalid heart rate detected');
  }

  if (mode === 'ppg' && (!data.hrv || data.hrv < 0)) {
    errors.push('Invalid HRV measurement');
  }

  if (!data.quality || data.quality < 0.3) {
    errors.push('Signal quality too low for reliable results');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export default {
  formatBPM,
  formatHRV,
  formatPercentage,
  getQualityDescription,
  getConfidenceBadge,
  formatTimestamp,
  generateRecommendations,
  validateScanData
};