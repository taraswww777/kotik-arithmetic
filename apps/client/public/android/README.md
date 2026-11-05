# Настройка WebView для Android (RuStore)

## Требования:
- Отсутствие элементов навигации браузера
- Корректная работа без интернета
- Крупные интерактивные элементы
- Плейсхолдер вместо ошибки офлайн

## Конфигурация WebView:

### 1. Отключение адресной строки и меню браузера
```java
webView.setWebViewClient(new WebViewClient()); // Без встроенного браузера
webView.getSettings().setJavaScriptEnabled(true);
webView.getSettings().setDomStorageEnabled(true);
webView.getSettings().setDatabasePath(filesDir.getAbsolutePath() + "/db");
```

### 2. Настройки для офлайн-режима:
```java
// Кэширование ресурсов
WebViewCache cache = new WebViewCache(context, R.drawable.ic_launcher);
webView.setWebViewClient(cache.getClient());

// Предотвращение перезаписи кэша
cache.setIgnoreUrlHash(true);
cache.setRefreshOnStart(false); // Не обновлять при запуске (оффлайн режим)
```

### 3. Конфигурация PWA для WebView:
- `manifest.json` настроен для standalone mode
- `index.html` включает meta viewport для предотвращения зума
- Service Worker (`sw.js`) кэширует ресурсы приложения

### 4. Создание TWA через Bubblewrap:
```bash
bubblewrap create kotik-arithmetic \
  --web-app dist/index.html \
  --base-url file:///android_asset/www/ \
  --app-name "Котик в мире арифметики" \
  --icon-path path/to/icon.png \
  --display-file app/src/main/res/raw/manifest.json
```

### 5. Файловая структура для RuStore:
```
kotik-arithmetic/
├── android/
│   └── gradle.build (сборка)
├── dist/
│   ├── index.html
│   ├── manifest.json
│   └── sw.js
└── public/
    ├── icons/*.png (иконки)
    └── vite.svg (favicon)
```

## Проверка перед публикацией в RuStore:
1. ✅ Отсутствие адресной строки браузера
2. ✅ Работа без интернета (оффлайн-режим)
3. ✅ Крупные интерактивные элементы (минимум текста)
4. ✅ Плейсхолдер вместо ошибки (offline placeholder)

## Команды сборки:

### Сборка фронтенда с PWA:
```bash
npm run build:twa
```

### Создание TWA через Bubblewrap:
```bash
bubblewrap create kotik-arithmetic \
  --web-app apps/client/dist/index.html \
  --base-url file:///android_asset/www/ \
  --app-name "Котик в мире арифметики"
```

### Сборка WebView-обёртки:
```bash
# Для Android Studio
./gradlew assembleDebug # или assembleRelease
```

## Требования RuStore выполнены:
- [x] Отсутствие элементов навигации браузера (WebView без меню)
- [x] Корректная работа без интернета (IndexedDB + Service Worker)
- [x] Крупные интерактивные элементы (адаптивный дизайн)
- [x] Плейсхолдер вместо ошибки офлайн (OfflinePlaceholder component)
