import { useState, useEffect } from 'react';

const BASE_URL = 'http://127.0.0.1:5555';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginRole, setLoginRole] = useState('landlord'); // 'landlord' or 'tenant'

  // Restore user session from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('havenkey_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Authenticate against Flask API via /api/login
  const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.error || 'Invalid login credentials');
    }

    const user = await res.json();
    setCurrentUser(user);
    localStorage.setItem('havenkey_user', JSON.stringify(user));
    return user;
  };

  // Sign out and clear cached session
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('havenkey_user');
  };

  return {
    currentUser,
    loginRole,
    setLoginRole,
    login,
    logout,
  };
}