export const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface ApiError {
  statusCode: number;
  message: string;
}

export async function register(email: string, password: string): Promise<{ token: string }> {
  const response = await fetch(`${apiBaseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Регистрация не удалась');
  }

  return response.json();
}

export async function login(email: string, password: string): Promise<{ token: string }> {
  const response = await fetch(`${apiBaseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Вход не удался');
  }

  return response.json();
}

export async function getStats(params?: { difficulty?: string }): Promise<any> {
  const url = params?.difficulty
    ? `${apiBaseUrl}/stats?difficulty=${params.difficulty}`
    : apiBaseUrl + '/stats';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Получение статистики не удалось');
  }
  return response.json();
}

export async function saveResult(data: any): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Сохранение результата не удалось');
  }
}