import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // include credentials for CORS requests
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth APIs
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
export const login = (userData) => api.post('/auth/login', userData);
export const getMe = () => api.get('/auth/me');

// Product APIs
export const getProducts = (params) => api.get('/products', { params });
export const getProduct = (id) => api.get(`/products/${id}`);
export const createReview = (id, reviewData) => api.post(`/products/${id}/reviews`, reviewData);

// Order APIs
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getMyOrders = () => api.get('/orders/myorders');
export const getOrderById = (id) => api.get(`/orders/${id}`);

// User APIs
export const updateProfile = (userData) => api.put('/users/profile', userData);
export const addToWishlist = (productId) => api.post(`/users/wishlist/${productId}`);
export const removeFromWishlist = (productId) => api.delete(`/users/wishlist/${productId}`);
export const getWishlist = () => api.get('/users/wishlist');

// AI APIs
export const getRecommendations = (data) => api.post('/ai/recommendations', data);
export const getSimilarProducts = (id) => api.get(`/ai/similar/${id}`);
export const chatWithAI = (message) => api.post('/ai/chat', { message });
export const getSizeRecommendation = (data) => api.post('/ai/size-recommendation', data);

export default api;