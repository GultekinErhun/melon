
// frontend/src/services/api.js
import axios from 'axios';

// Axios örneği oluşturuyoruz
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Backend URL'sini burada belirtiyoruz
  headers: {
    'Content-Type': 'application/json',
  },
});

// Kayıt işlemi için düzenlenmiş fonksiyon
export const registerUser = async (username, email, password, confirmPassword) => {
  try {
    // Backend'in beklediği JSON yapısı
    const payload = {
      username: username.trim(), // Fazladan boşlukları kaldır
      email: email.trim().toLowerCase(), // Email küçük harfe çevrilir
      password: password,
      confirm_password: confirmPassword,
    };

    // POST isteği gönderiyoruz
    const response = await API.post('users/register/', payload);

    // Başarılı yanıtı döndürüyoruz
    return response.data;
  } catch (error) {
    // Hata varsa logla ve fırlat
    console.error('RegisterUser API Error:', error.response?.data || error.message);
    throw error; // Hata yönetimi için çağıran fonksiyona fırlatılır
  }
};


export const loginUser = async (email, password) => {
  const response = await API.post('users/login/', { email, password });
  return response.data; // Token döner
};
