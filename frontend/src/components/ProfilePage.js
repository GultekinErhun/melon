import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError('Oturum açık değil.');
      }
    };
    fetchProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div>
      <h2>Profil</h2>
      <p>Kullanıcı Adı: {profile.username}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default ProfilePage;
