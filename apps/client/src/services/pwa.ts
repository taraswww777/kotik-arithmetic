const CACHE_NAME = 'kotik-arithmetic-v1';
const CACHEABLE_RESOURCES = [
  '/',
  '/index.html',
  '/main.ts',
  '/styles.css',
];

export async function registerServiceWorker(): Promise<void> {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker зарегистрирован:', registration.scope);
    } catch (error) {
      console.error('Ошибка регистрации Service Worker:', error);
    }
  }
}

export async function cacheStaticAssets(): Promise<void> {
  if ('caches' in window) {
    const cache = await caches.open(CACHE_NAME);
    for (const resource of CACHEABLE_RESOURCES) {
      try {
        const response = await fetch(resource);
        if (response.ok) {
          cache.put(resource, response);
        }
      } catch (error) {
        console.log(`Не удалось кэшировать ${resource}:`, error);
      }
    }
  }
}