import axios, { AxiosInstance } from 'axios';

// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;

/**
 * Centralized Axios instance - basic template
 * TODO: Add request/response interceptors when backend is ready
 * TODO: Add token management and refresh logic
 * TODO: Add error handling and retry logic
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor template
 * Uncomment and implement when backend is ready
 */
// apiClient.interceptors.request.use(
//   (config) => {
//     // Add auth token from storage
//     // const token = localStorage.getItem('access_token');
//     // if (token) {
//       // config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

/**
 * Response interceptor template
 * Uncomment and implement when backend is ready
 */
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors (401, 403, 500, etc.)
//     // Implement token refresh logic here
//     return Promise.reject(error);
//   }
// );

export default apiClient;
