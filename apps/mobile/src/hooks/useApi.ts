import { useState, useCallback } from 'react';
import { apiClient, handleApiError } from '@/utils/api';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export const useApiGet = <T>(url: string, options?: UseApiOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(
    async (params?: Record<string, any>) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiClient.get<T>(url, params);
        setData(result);
        options?.onSuccess?.(result);
        return result;
      } catch (err: any) {
        const message = handleApiError(err);
        setError(message);
        options?.onError?.(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  return { data, isLoading, error, fetch };
};

export const useApiPost = <T>(url: string, options?: UseApiOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const post = useCallback(
    async (body?: any) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiClient.post<T>(url, body);
        setData(result);
        options?.onSuccess?.(result);
        return result;
      } catch (err: any) {
        const message = handleApiError(err);
        setError(message);
        options?.onError?.(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  return { data, isLoading, error, post };
};

export const useMutation = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (mutationFn: () => Promise<T>) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await mutationFn();
        setData(result);
        return result;
      } catch (err: any) {
        const message = handleApiError(err);
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { data, isLoading, error, mutate };
};
