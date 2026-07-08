import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore.js';

/**
 * Redirects to "/" (splash/auth) if the user is not logged in.
 * Returns { user, session, loading } for convenience.
 *
 * Usage:
 *   const { user, loading } = useRequireAuth();
 *   if (loading) return <Spinner />;
 */
export function useRequireAuth() {
  const { user, session, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  return { user, session, loading };
}
