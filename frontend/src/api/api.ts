import { API_BASE } from '../utils/constants';

function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'API error');
  }

  return data;
}

export const api = {
  get: <T>(url: string) => request<T>(url),

  post: <T>(url: string, body?: unknown) =>
    request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body?: unknown) =>
    request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string, body?: unknown) =>
    request<T>(url, {
      method: 'DELETE',
      body: JSON.stringify(body),
    }),
};