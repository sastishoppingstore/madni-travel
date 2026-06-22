import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    isCheckingAuth,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError,
    checkAuth,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    isCheckingAuth,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError,
    checkAuth,
  };
};
