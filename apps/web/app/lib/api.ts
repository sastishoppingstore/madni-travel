const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export interface FetchOptions extends RequestInit {
  token?: string
}

export async function apiClient<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, headers, ...rest } = options

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.error || `API error: ${res.status}`)
  }

  return data as T
}

export const api = {
  flights: {
    search: (params: { from?: string; to?: string; date?: string }) =>
      apiClient(`/api/flights/search?${new URLSearchParams(params)}`),
    getById: (id: string) => apiClient(`/api/flights/${id}`),
  },
  packages: {
    list: () => apiClient("/api/packages"),
    getById: (id: string) => apiClient(`/api/packages/${id}`),
    byCategory: (category: string) => apiClient(`/api/packages?category=${category}`),
  },
  bookings: {
    list: (token: string) => apiClient("/api/bookings", { token }),
    create: (data: unknown, token: string) =>
      apiClient("/api/bookings", { method: "POST", body: JSON.stringify(data), token }),
    getById: (id: string, token: string) => apiClient(`/api/bookings/${id}`, { token }),
  },
  auth: {
    login: (data: { email: string; password: string }) =>
      apiClient("/api/auth/login", { method: "POST", body: JSON.stringify(data) }),
    register: (data: { name: string; email: string; password: string; phone?: string }) =>
      apiClient("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),
    me: (token: string) => apiClient("/api/auth/me", { token }),
  },
  hotels: {
    search: (params: { city?: string; checkIn?: string; checkOut?: string }) =>
      apiClient(`/api/hotels/search?${new URLSearchParams(params)}`),
  },
  buses: {
    search: (params: { from?: string; to?: string; date?: string }) =>
      apiClient(`/api/buses/search?${new URLSearchParams(params)}`),
  },
  visa: {
    types: () => apiClient("/api/visa/types"),
    apply: (data: unknown, token: string) =>
      apiClient("/api/visa/apply", { method: "POST", body: JSON.stringify(data), token }),
  },
  blog: {
    list: () => apiClient("/api/blog"),
    getBySlug: (slug: string) => apiClient(`/api/blog/${slug}`),
  },
  contact: {
    send: (data: { name: string; email: string; subject: string; message: string }) =>
      apiClient("/api/contact", { method: "POST", body: JSON.stringify(data) }),
  },
  dashboard: {
    stats: (token: string) => apiClient("/api/dashboard/stats", { token }),
    recentBookings: (token: string) => apiClient("/api/dashboard/recent-bookings", { token }),
  },
}

export type ApiClient = typeof api
