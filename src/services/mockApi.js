// Mock API service for MVP demonstration
// This simulates the NestJS Gateway + FastAPI Processor responses

// Realistic heart rate data based on age, fitness, and time
const generateRealisticBPM = () => {
  const baseBPM = 60 + Math.random() * 40; // 60-100 BPM range
  return Math.round(baseBPM + (Math.random() - 0.5) * 10); // Add some variation
};

const generateHRV = (bpm) => {
  // HRV inversely correlates with heart rate
  const baseHRV = 120 - (bpm - 60); // Higher BPM = lower HRV
  return Math.round(Math.max(20, baseHRV + (Math.random() - 0.5) * 30));
};

const generateQualityScore = () => {
  // Most scans should be decent quality for demo
  return 0.7 + Math.random() * 0.25; // 70-95% quality
};

const generateStressScore = (bpm, hrv) => {
  // Higher BPM and lower HRV indicate higher stress
  let stress = (bpm - 70) / 30 + (50 - hrv) / 50;
  return Math.max(0, Math.min(1, stress + (Math.random() - 0.5) * 0.3));
};

const generateFatigueScore = (bpm, hrv, stress) => {
  // Fatigue correlates with stress and low HRV
  let fatigue = stress * 0.7 + (50 - hrv) / 60;
  return Math.max(0, Math.min(1, fatigue + (Math.random() - 0.5) * 0.2));
};

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock PPG Analysis (Finger scan)
export const mockPPGAnalysis = async (videoData) => {
  // Simulate processing time
  await delay(2000 + Math.random() * 2000);

  const bpm = generateRealisticBPM();
  const hrv = generateHRV(bpm);
  const quality = generateQualityScore();

  return {
    success: true,
    data: {
      bpm,
      hrv,
      quality,
      signal_strength: quality * 0.9 + Math.random() * 0.1,
      processing_time: Math.round(1500 + Math.random() * 1000),
      timestamp: new Date().toISOString(),
      confidence: quality > 0.8 ? 'high' : quality > 0.6 ? 'medium' : 'low'
    },
    message: quality > 0.7 ? 'Analysis completed successfully' : 'Low signal quality detected'
  };
};

// Mock Face/rPPG Analysis (Face scan)
export const mockFaceAnalysis = async (videoData) => {
  // Simulate longer processing time for face analysis
  await delay(3000 + Math.random() * 2000);

  const bpm = generateRealisticBPM();
  const hrv = generateHRV(bpm);
  const quality = generateQualityScore();
  const stress = generateStressScore(bpm, hrv);
  const fatigue = generateFatigueScore(bpm, hrv, stress);

  return {
    success: true,
    data: {
      // Cardiovascular metrics
      bpm,
      hrv,

      // Wellness metrics
      stress_score: stress,
      fatigue_score: fatigue,
      face_wellness: Math.round(100 - (stress + fatigue) * 40), // 0-100 scale

      // Quality metrics
      quality,
      face_detection_confidence: Math.min(quality + 0.1, 0.98),
      lighting_quality: 0.6 + Math.random() * 0.35,

      // Additional insights
      respiratory_rate: Math.round(12 + Math.random() * 8), // 12-20 breaths/min
      skin_tone_analysis: {
        detected: true,
        consistency: quality > 0.8 ? 'good' : 'fair'
      },

      processing_time: Math.round(2500 + Math.random() * 1500),
      timestamp: new Date().toISOString(),
      confidence: quality > 0.8 ? 'high' : quality > 0.6 ? 'medium' : 'low'
    },
    message: quality > 0.7 ? 'Face analysis completed successfully' : 'Suboptimal lighting conditions detected'
  };
};

// Mock video processing simulation
export const simulateVideoProcessing = (mode, onProgress) => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onProgress(progress);
        resolve();
      } else {
        onProgress(Math.round(progress));
      }
    }, 300);
  });
};

// Health insights based on results
export const generateHealthInsights = (data, mode) => {
  const insights = [];

  if (mode === 'ppg') {
    if (data.bpm < 60) {
      insights.push({
        type: 'info',
        title: 'Low Heart Rate',
        message: 'Your resting heart rate is below average. This could indicate good fitness or may warrant consultation.'
      });
    } else if (data.bpm > 100) {
      insights.push({
        type: 'warning',
        title: 'Elevated Heart Rate',
        message: 'Your heart rate is elevated. Consider relaxation techniques or consult a healthcare provider.'
      });
    } else {
      insights.push({
        type: 'success',
        title: 'Normal Heart Rate',
        message: 'Your heart rate is within the normal resting range.'
      });
    }

    if (data.hrv > 50) {
      insights.push({
        type: 'success',
        title: 'Good Heart Rate Variability',
        message: 'Higher HRV generally indicates better cardiovascular fitness and stress resilience.'
      });
    }
  } else {
    // Face scan insights
    if (data.stress_score > 0.7) {
      insights.push({
        type: 'warning',
        title: 'High Stress Detected',
        message: 'Consider stress management techniques like deep breathing or meditation.'
      });
    } else if (data.stress_score < 0.3) {
      insights.push({
        type: 'success',
        title: 'Low Stress Levels',
        message: 'You appear to be in a relaxed state. Great job managing stress!'
      });
    }

    if (data.fatigue_score > 0.6) {
      insights.push({
        type: 'info',
        title: 'Fatigue Indicators',
        message: 'Signs of fatigue detected. Ensure adequate rest and hydration.'
      });
    }

    if (data.face_wellness > 80) {
      insights.push({
        type: 'success',
        title: 'Excellent Wellness Score',
        message: 'Your overall face wellness indicators look great!'
      });
    }
  }

  return insights;
};

export default {
  mockPPGAnalysis,
  mockFaceAnalysis,
  simulateVideoProcessing,
  generateHealthInsights
};