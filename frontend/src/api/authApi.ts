import { api } from './api';
import { AuthResponse } from '../types/auth';
import { User } from '../types/user';

export async function login(
  login: string,
  password: string
): Promise<AuthResponse> {
  const data = await api.post<AuthResponse>('/login', {
    login,
    password,
  });

  if (data.access_token) {
    localStorage.setItem('auth_token', data.access_token);
  }

  return data;
}

export async function register(
  login: string,
  password: string
): Promise<AuthResponse> {
  const data = await api.post<AuthResponse>('/register', {
    login,
    password,
  });

  if (data.access_token) {
    localStorage.setItem('auth_token', data.access_token);
  }

  return data;
}

export async function fetchCurrentUser(): Promise<User> {
  return api.get<User>('/me');
}

export function logout() {
  localStorage.removeItem('auth_token');
}
