import { useState, useEffect } from 'react';
import { getUserProfile } from '../api/auth';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserProfile();
      setUserProfile(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return {
    userProfile,
    loading,
    error,
    refetch: fetchUserProfile
  };
};

export default useUserProfile;
