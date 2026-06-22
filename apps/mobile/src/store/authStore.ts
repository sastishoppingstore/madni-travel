import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '@/utils/api';
import { handleApiError } from '@/utils/api';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  error: string | null;

  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userStr = await AsyncStorage.getItem('user');
      if (token && userStr) {
        const user = JSON.parse(userStr);
        set({ user, token, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // For demo purposes, simulate login
      // const response = await apiClient.post<{ token: string; user: User }>('/auth/login', { email, password });

      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock user
      const user: User = {
        id: '1',
        name: 'Ahmad Khan',
        email: email,
        phone: '+923216001973',
      };
      const token = 'mock-jwt-token-' + Date.now();

      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      set({ user, token, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error: any) {
      set({ error: handleApiError(error), isLoading: false });
      return false;
    }
  },

  register: async (name: string, email: string, phone: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // For demo purposes, simulate register
      // const response = await apiClient.post<{ token: string; user: User }>('/auth/register', {
      //   name, email, phone, password,
      // });

      await new Promise(resolve => setTimeout(resolve, 1500));

      const user: User = {
        id: '1',
        name,
        email,
        phone,
      };
      const token = 'mock-jwt-token-' + Date.now();

      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      set({ user, token, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error: any) {
      set({ error: handleApiError(error), isLoading: false });
      return false;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  updateProfile: async (data: Partial<User>) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const currentUser = get().user;
      if (currentUser) {
        const updatedUser = { ...currentUser, ...data };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        set({ user: updatedUser, isLoading: false });
      }
      return true;
    } catch (error: any) {
      set({ error: handleApiError(error), isLoading: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));
