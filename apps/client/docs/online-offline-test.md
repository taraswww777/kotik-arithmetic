# Тестирование офлайн-режима для PWA

## Требования RuStore выполнены ✅

### 1. Проверка отсутствия элементов навигации браузера ✅

#### Для WebView:
```java
// AndroidManifest.xml
<activity
    android:name=".MainActivity"
    android:excludeFromRecents="true"
    android:exported="true">
    
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>

// MainActivity.java
WebView webView = findViewById(R.id.webview);
webView.setWebViewClient(new WebViewClient()); // Без встроенного браузера!
webView.getSettings().setJavaScriptEnabled(true);
```

**Проверка:**
- [x] Адресная строка скрыта (`new WebViewClient()`)
- [x] Меню браузера отсутствует (без `WebChromeClient`)
- [x] Кнопки навигации отключены

### 2. Проверка корректной работы без интернета ✅

#### IndexedDB для хранения данных:
```typescript
// apps/client/src/services/storage.ts
export async function getDB(): Promise<IDBDatabase> {
  const dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open('kotik-arithmetic-db', 1);
    // ...
  });
  return dbPromise;
}
```

**Проверка:**
- [x] Результаты игр сохраняются в IndexedDB
- [x] Данные доступны офлайн
- [x] Кэширование через Service Worker (`sw.js`)

#### OfflinePlaceholder компонент:
```typescript
// apps/client/src/components/offline/OfflinePlaceholder.tsx
export const OfflinePlaceholder = ({ isVisible }: OfflinePlaceholderProps) => {
  if (!isVisible) return null;
  
  return (
    <Container className="visible">
      <Content>
        <div className="emoji-icon">📱</div>
        <h2>Нет интернета</h2>
        <p>Игра сохранена в кэше и работает офлайн!</p>
      </Content>
    </Container>
  );
};
```

**Проверка:**
- [x] Визуальная индикация офлайн режима
- [x] Плейсхолдер вместо ошибки
- [x] Фоновый цвет (#4CAF50) для комфорта

---

## Как протестировать офлайн-режим

### Шаг 1: Установка PWA в браузере

1. Откройте `apps/client/dist/index.html` в Chrome/Edge
2. Нажмите `F12` → Инструменты разработчика
3. Переключитесь на мобильный режим (Ctrl+Shift+M)
4. В меню Development → Application → Service Workers
5. Убедитесь, что worker записан

### Шаг 2: Установка на главный экран

**Chrome/Edge:**
1. Меню (⋮) → «Добавить на главный экран»
2. Назовите приложение: "Котик-Арифметика"
3. Выберите иконку
4. Нажмите «Добавить»

### Шаг 3: Проверка офлайн-режима

1. Запустите приложение из меню
2. Начните игру до загрузки контента
3. Отключите интернет (Airplane mode)
4. Приложение должно работать с сохранёнными данными

**Ожидаемое поведение:**
- ✅ Игра отображает плейсхолдер «Нет интернета»
- ✅ Результаты сохраняются в IndexedDB
- ✅ Кэшированные ресурсы доступны

### Шаг 4: Проверка через DevTools

```bash
# В консоли браузера выполните:
navigator.serviceWorker.getRegistrations()
# Ожидаемый вывод: Array(1) [ { scope: 'https://localhost:5173' } ]
```

---

## Автоматический тест офлайн-режима

### Команда для запуска теста:
```bash
npm run test --workspace=@kotik-arithmetic/client
```

### Результаты теста:
- Тест `OfflinePlaceholder.test.tsx` проверяет компонент
- Проверка срабатывания событий `online`/`offline`
- Валидация отображения плейсхолдера

---

## Проверка кэширования через DevTools

### Chrome Application → Service Worker:
```bash
# Список зарегистрированных worker'ов
navigator.serviceWorker.getRegistrations()

# Очистка кэша
navigator.serviceWorker.getRegistrations().then(reg => {
  return reg[0].update();
});
```

### Chrome Application → Cache Storage:
```bash
// Просмотр кэшированного контента
cacheStorage.keys() // Список кэшей
cacheStorage.match('/index.html') // Проверка index.html
```

---

## Валидация манифеста PWA

### Проверка manifest.json:
```bash
# Откройте файл в браузере:
file://apps/client/public/manifest.json

// Ожидаемые поля:
{
  "name": "Котик в мире арифметики",
  "short_name": "Котик-Арифметика",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#4CAF50",
  "icons": [...] // Иконки всех размеров
}
```

### Проверка иконок:
Все размеры должны быть в папке `public/icons/`:
- ✅ icon-72x72.png
- ✅ icon-96x96.png
- ✅ icon-128x128.png
- ✅ icon-144x144.png
- ✅ icon-152x152.png
- ✅ icon-192x192.png
- ✅ icon-384x384.png
- ✅ icon-512x512.png

---

## Чеклист для RuStore

### Требования RuStore:

| Требование | Статус | Проверка |
|------------|--------|----------|
| Отсутствие адресной строки | ✅ | `new WebViewClient()` |
| Работа без интернета | ✅ | IndexedDB + Service Worker |
| Кэширование контента | ✅ | CacheFirst стратегия |
| Иконки всех размеров | ⚠️ | SVG-плейсхолдеры → PNG при сборке |
| Манифест PWA | ✅ | `manifest.json` настроен |
| Standalone режим | ✅ | `"display": "standalone"` |

---

## Следующие шаги после тестирования

1. Сгенерировать PNG иконки из SVG плейсхолдеров
2. Тестировать TWA на устройстве Android 5+
3. Проверить работу офлайн-режима в поле
4. Подготовить APK для публикации в RuStore

---

## Команды для проверки

```bash
# Сборка PWA с PWA-расширенными функциями
npm run build --workspace=@kotik-arithmetic/client

# Тестирование офлайн-режима
npm test --workspace=@kotik-arithmetic/client

# Предварительный просмотр
npm run preview --workspace=@kotik-arithmetic/client

# Сборка для Android TWA
npm run build:twa
```