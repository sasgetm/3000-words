export default async function fetchLogin(isRegister, loginToSend, passwordToSend) {
  const response = await fetch(
    isRegister
      ? 'http://alexandergetmanets.ru/3000-words/backend/public/api/register'
      : 'http://alexandergetmanets.ru/3000-words/backend/public/api/login',
    {
      metod: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: loginToSend,
        password: passwordToSend,
      })
    }
  );
  return response();
}