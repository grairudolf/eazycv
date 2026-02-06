import axios from 'axios';
import { transformToBackendFormat } from '../utils/dataTransform';

/**
 * API Service Configuration
 * Uses Vite environment variables for flexible configuration
 * Fallback to localhost:8000 for local development
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Response interceptor for consistent error handling
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'API Error';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

/**
 * CV Service - Handles all CV-related API operations
 * All methods return backend response data with automatic transformation
 */
export const cvService = {
  /**
   * Create a new CV
   * @param {Object} data - CV form data from React component
   * @returns {Promise} Backend CV response
   */
  create: async (data) => {
    const response = await api.post('/cvs/', transformToBackendFormat(data));
    return response;
  },

  /**
   * Fetch a CV by ID
   * @param {number} cvId - CV ID
   * @returns {Promise} Backend CV data
   */
  get: async (cvId) => {
    const response = await api.get(`/cvs/${cvId}`);
    return response;
  },

  /**
   * Optimize CV with AI (Gemini)
   * @param {number} cvId - CV ID to optimize
   * @returns {Promise} Updated CV with optimized_cv field
   */
  optimize: async (cvId) => {
    try {
      const response = await api.post(`/cvs/${cvId}/optimize`);
      return response;
    } catch (error) {
      if (error.response?.status === 503) {
        throw new Error(error.response?.data?.detail || 'AI optimization is not configured.');
      }
      if (error.response?.status === 502) {
        throw new Error('AI optimization service is temporarily unavailable. Please try again later.');
      }
      if (error.response?.status === 400) {
        throw new Error('CV has no summary to optimize. Please add a professional summary first.');
      }
      throw error;
    }
  },

  /**
   * Download CV as PDF
   * @param {number} cvId - CV ID to download
   * @returns {Promise} PDF file blob
   */
  download: async (cvId) => {
    const response = await api.get(`/cvs/${cvId}/download`, {
      responseType: 'blob',
    });
    return response;
  },

  /**
   * List all CVs for the current user (demo mode)
   * @returns {Promise} Array of CV objects
   */
  listAll: async () => {
    const response = await api.get('/cvs/');
    return response;
  },
};

export default api;

