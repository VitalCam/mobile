import axios from 'axios';

// For development, you can use ngrok or similar to expose your local API
const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api/v1'
  : 'https://your-production-api.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitPPGData = async (data) => {
  try {
    const response = await api.post('/ppg/analyze', data);
    return response.data;
  } catch (error) {
    console.error('PPG analysis failed:', error);
    throw error;
  }
};

export const submitFaceData = async (data) => {
  try {
    const response = await api.post('/face/analyze', data);
    return response.data;
  } catch (error) {
    console.error('Face analysis failed:', error);
    throw error;
  }
};

export default api;
