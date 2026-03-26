export default async function fetchLogin(isRegister, loginToSend, passwordToSend) {
  const response = await fetch(
    isRegister
      // ? 'http://alexandergetmanets.ru/3000-words/backend/public/api/register'
      // : 'http://alexandergetmanets.ru/3000-words/backend/public/api/login',
      ? 'http://localhost:8080/api/register'
      : 'http://localhost:8080/api/login',
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

export function getToken() {
  return localStorage.getItem('auth_token');
}

// Автоматически добавляем Authorization header
export async function authFetch(url, options = {}) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
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