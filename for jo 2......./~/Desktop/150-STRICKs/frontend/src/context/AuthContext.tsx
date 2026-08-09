"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('codeeasy_token');
    const savedUser = localStorage.getItem('codeeasy_user');
    if (savedToken) setToken(savedToken);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {}
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8008/api'}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.access);
        localStorage.setItem('codeeasy_token', data.access);
        
        // Fetch profile
        const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8008/api'}/auth/me/`, {
          headers: { 'Authorization': `Bearer ${data.access}` }
        });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setUser(profileData);
          localStorage.setItem('codeeasy_user', JSON.stringify(profileData));
        } else {
          const fallbackUser = { id: 1, username, email: '' };
          setUser(fallbackUser);
          localStorage.setItem('codeeasy_user', JSON.stringify(fallbackUser));
        }
        return true;
      }
      return false;
    } catch (e) {
      console.error("Login failed:", e);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8008/api'}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.access);
        setUser(data.user);
        localStorage.setItem('codeeasy_token', data.access);
        localStorage.setItem('codeeasy_user', JSON.stringify(data.user));
        return true;
      }
      return false;
    } catch (e) {
      console.error("Registration failed:", e);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('codeeasy_token');
    localStorage.removeItem('codeeasy_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
