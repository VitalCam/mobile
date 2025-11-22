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

// Helper function to convert axios request to curl command
const generateCurlCommand = (config) => {
  const method = (config.method || 'get').toUpperCase();
  const url = config.baseURL ? `${config.baseURL}${config.url}` : config.url;

  let curlCmd = `curl -X ${method} '${url}'`;

  // Add headers
  if (config.headers) {
    Object.keys(config.headers).forEach((key) => {
      if (config.headers[key]) {
        curlCmd += ` \\\n  -H '${key}: ${config.headers[key]}'`;
      }
    });
  }

  // Add data for POST, PUT, PATCH requests
  if (config.data && ['POST', 'PUT', 'PATCH'].includes(method)) {
    const data = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);
    curlCmd += ` \\\n  -d '${data}'`;
  }

  // Add query params
  if (config.params) {
    const params = new URLSearchParams(config.params).toString();
    if (params) {
      curlCmd += ` \\\n  --data-urlencode '${params}'`;
    }
  }

  return curlCmd;
};

// Request interceptor to log curl commands
api.interceptors.request.use(
  (config) => {
    const curlCommand = generateCurlCommand(config);
    console.log('\n========== API REQUEST (CURL) ==========');
    console.log(curlCommand);
    console.log('========================================\n');
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to log responses
api.interceptors.response.use(
  (response) => {
    console.log('\n========== API RESPONSE ==========');
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(response.data, null, 2));
    console.log('==================================\n');
    return response;
  },
  (error) => {
    console.error('\n========== API ERROR ==========');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    console.error('===============================\n');
    return Promise.reject(error);
  }
);

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
