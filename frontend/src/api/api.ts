const API_BASE = 'http://alexandergetmanets.ru/3000-words/backend/public/api';
// const API_BASE = 'http://localhost:8080/api';

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

  delete: <T>(url: string) =>
    request<T>(url, { method: 'DELETE' }),
};