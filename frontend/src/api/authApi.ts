import { AuthResponse } from '../types/auth';

const API = 'http://alexandergetmanets.ru/3000-words/backend/public/api';
// const API = 'http://localhost:8080/api';

export default async function fetchLogin(
  isRegister: boolean,
  loginToSend: string,
  passwordToSend: string
): Promise<AuthResponse> {
  const response = await fetch(
    isRegister
      ? `${API}/register`
      : `${API}/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: loginToSend,
        password: passwordToSend,
      }),
    }
  );

  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem('auth_token', data.access_token);
  }
  return data;
}

export function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

// Автоматически добавляем Authorization header
export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  const token = getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response.json();
}

// Получение текущего пользователя
export async function fetchCurrentUser(): Promise<any> {
  return authFetch(`${API}/me`);
}
