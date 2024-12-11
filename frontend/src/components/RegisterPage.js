// frontend/src/components/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun default davranışını engeller
    try {
      console.log("Kayıt isteği gönderiliyor...");
      const data = await registerUser(username, email, password, confirmPassword);
      console.log("Kayıt başarılı:", data);
      alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
      navigate('/login'); // Kayıt sonrası giriş sayfasına yönlendir
    } catch (err) {
      console.error("Kayıt Hatası:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };
  

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kullanıcı Adı:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Şifre (Tekrar):</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
}

export default RegisterPage;
