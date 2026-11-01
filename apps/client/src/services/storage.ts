const STORAGE_KEYS = {
  THEME: 'kotik-theme',
  USER_TOKEN: 'kotik-token',
  PWA_UPDATES: 'kotik-pwa-updates',
};

export function getToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.USER_TOKEN);
  } catch (error) {
    console.warn('LocalStorage недоступен');
    return null;
  }
}

export function setToken(token: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);
  } catch (error) {
    console.error('Не удалось сохранить токен', error);
  }
}

export function removeToken(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
  } catch (error) {
    console.error('Не удалось удалить токен', error);
  }
}

export function getTheme(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME);
  } catch (error) {
    console.warn('LocalStorage недоступен');
    return null;
  }
}

export function setTheme(theme: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Не удалось сохранить тему', error);
  }
}