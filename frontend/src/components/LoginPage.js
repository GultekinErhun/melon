// frontend/src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; // Backend ile iletişim

function LoginPage() {
  const [email, setEmail] = useState(''); // Email bilgisi
  const [password, setPassword] = useState(''); // Şifre bilgisi
  const [error, setError] = useState(''); // Hata mesajı
  const navigate = useNavigate(); // Yönlendirme için kullanılan hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Hata mesajını sıfırla
    try {
      // Backend'den login isteği gönderiliyor
      const data = await loginUser(email, password);
      
      // Başarılı giriş: Token'ları localStorage'a kaydediyoruz
      localStorage.setItem('accessToken', data.tokens.access);
      localStorage.setItem('refreshToken', data.tokens.refresh);
      alert('Giriş başarılı!'); // Başarı mesajı
      navigate('/profile'); // Başarılı giriş sonrası profile yönlendirme
    } catch (err) {
      // Hata durumunda kullanıcıya bilgi ver
      setError('Email veya şifre hatalı.');
    }
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Email state güncellenir
            required
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Şifre state güncellenir
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hata mesajı */}
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}

export default LoginPage;
