// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Backend'in ana URL'i
});

export const loginUser = async (email, password) => {
  const response = await API.post('users/login/', { email, password });
  return response.data; // Backend'den dönen JWT token'ı döndür
};
