
// frontend/src/services/api.js
import axios from 'axios';

// Axios örneği oluşturuyoruz
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Backend URL'sini burada belirtiyoruz
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Session cookie'lerini gönder
});




// frontend/src/services/api.js
export const registerUser = async (username, email, password, confirmPassword) => {
  try {
    const payload = {
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      confirm_password: confirmPassword,
    };
    const response = await API.post('users/register/', payload);
    return response.data;
  } catch (error) {
    // Backend hatasını al ve fırlat
    if (error.response && error.response.data) {
      throw error.response.data; // Backend'den dönen hatayı ilet
    }
    throw error;
  }
};



// Kullanıcı profilini alma isteği
export const getProfile = async () => {
  const response = await API.get('profile/');
  return response.data;
};


export const loginUser = async (email, password) => {
  const response = await API.post('users/login/', { email, password });
  return response.data; // Token döner
};
