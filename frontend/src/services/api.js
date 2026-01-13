import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// Cars
export const getCars = () => api.get('/cars');
export const getCarById = (id) => api.get(`/cars/${id}`);
export const addCar = (carData) => api.post('/cars', carData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateCar = (id, carData) => api.put(`/cars/${id}`, carData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteCar = (id) => api.delete(`/cars/${id}`);

// Reservations - CORRECTED ENDPOINTS
export const createReservation = (reservationData) => 
  api.post('/reservations', reservationData); 

export const updateReservationStatus = (reservationId, newStatus) => 
  // FIX: Change 'statut' key to 'newStatus' to match backend expectation
  api.put(`/reservations/${reservationId}/statut`, { newStatus: newStatus }); 

export const getReservations = (userId) => 
  userId ? api.get(`/reservations/user/${userId}`) : api.get('/reservations');


// Contact
export const getContactMessages = () => api.get('/contact');
export const sendContactMessage = (messageData) => api.post('/contact', messageData);
export const deleteContactMessage = async (messageId) => {
  try {
    const response = await api.delete(`/contact/${messageId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

