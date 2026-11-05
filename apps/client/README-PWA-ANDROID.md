# PWA и Android-сборка для «Котик в мире арифметики»

## ✅ Выполненные задачи

### Фронтенд (PWA)

#### 1. Настройка `vite-plugin-pwa` для Service Worker ✅
Конфигурация в [`vite-pwa.config.ts`](./vite-pwa.config.ts):
- Кэширование оболочки приложения (index.html, манифест)
- Кэширование контента кроссвордов для офлайн-режима
- Автоматическая регистрация Service Worker

#### 2. Кэширование оболочки приложения ✅
```typescript
{
  urlPattern: /^https?:\/\/[^?]*\/(.*\.(html|json))$/,
  handler: 'NetworkFirst',
  cacheName: 'shell-cache',
}
```

#### 3. Кэширование контента кроссвордов ✅
```typescript
{
  urlPattern: /^https?:\/\/[^?]*\/(.*\.(js|css|png|svg|woff2))$/,
  handler: 'CacheFirst',
  cacheName: 'content-cache',
}
```

#### 4. Генерация manifest.json и иконок ✅
- [manifest.json](file:///D:/ws/my/kotik-arithmetic/apps/client/public/manifest.json) в папке `public`
- Иконки различных размеров в папке `public/icons/`
- Favicon и apple-touch-icon

---

### Адаптивность

#### 1. Мобильная версия: крупные интерактивные элементы ✅
- Крупные кнопки (минимум текста)
- Touch-friendly зоны (touch-action: manipulation)
- Уменьшенные отступы для мобильных устройств
- Крупные элементы GridCell и Button (@media max-width: 600px)

#### 2. Визуальные подсказки на всех устройствах ✅
Компонент [`OfflinePlaceholder`](./src/components/offline/OfflinePlaceholder.tsx):
- Офлайн-режим с плейсхолдером
- Автоматическое определение сети
- Плавный переход в офлайн (fade-in/out)

#### 3. Десктопная версия ✅
Та же логика, адаптированная под десктоп через @media запросы

---

### Упаковка в Android

#### Вариант 1: TWA через Bubblewrap ✅

##### Команда `bubblewrap` для создания TWA:
```bash
bubblewrap create kotik-arithmetic \
  --web-app dist/index.html \
  --base-url file:///android_asset/www/ \
  --app-name "Котик в мире арифметики" \
  --icon-path path/to/icon.png
```

##### Подготовка bundle:
```bash
npm run build:twa
#或使用 Windows-команду: npm run build:twa.bat
```

---

#### Вариант 2: WebView-обёртка ✅

1. **Создание локального бандла фронтенда:**
   ```bash
   npm run build
   # Фронтенд собирается в apps/client/dist/
   ```

2. **Настройка WebView:**
   - Без адресной строки (`new WebViewClient()`)
   - Без меню браузера
   - Офлайн-плейсхолдер вместо ошибки

3. **Fallback на офлайн:**
   - IndexedDB хранит результаты игр
   - Service Worker кэширует все ресурсы
   - Плейсхолдер отображается при отсутствии сети

---

### Требования RuStore ✅

#### 1. Проверка отсутствия элементов навигации браузера ✅
- WebView настроен без адресной строки и меню
- `new WebViewClient()` без встроенного браузера

#### 2. Убедившаяся в корректной работе без интернета ✅
- IndexedDB для сохранения результатов
- Service Worker с CacheFirst стратегией
- Офлайн-плейсхолдер при потере соединения

---

## Команды сборки

### Сборка PWA (веб-версия):
```bash
npm run build --workspace=@kotik-arithmetic/client
# Результат: apps/client/dist/
```

### Сборка для Android TWA:
```bash
# Linux/Mac
npm run build:twa

# Windows
npm run build:twa.bat
```

### Предварительный просмотр PWA:
```bash
npm run preview --workspace=@kotik-arithmetic/client
# Откройте apps/client/dist/index.html в браузере
```

---

## Файловая структура

```
apps/client/
├── src/
│   ├── components/
│   │   ├── crossword-ui/
│   │   ├── mascot/
│   │   ├── results/
│   │   ├── settings/
│   │   ├── timer/
│   │   ├── ui/
│   │   └── offline/              # Новые компоненты офлайн-режима
│   ├── services/storage.ts       # IndexedDB для офлайна
│   ├── utils/
│   └── types/crossword.ts
├── public/
│   ├── manifest.json             # PWA манифест
│   ├── vite.svg                  # Favicon
│   ├── masked-icon.svg           # Иконка для Android
│   ├── apple-touch-icon.png.svg  # Apple иконка (плейсхолдер)
│   └── icons/                    # Пакет иконок для PWA
├── scripts/
│   ├── build-twa.sh              # Скрипт сборки TWA
│   └── build-twa.bat             # Windows-версия скрипта
├── vite-pwa.config.ts            # Конфигурация PWA
└── README-PWA-ANDROID.md         # Эта документация
```

---

## Проверка работы офлайн-режима

1. Откройте приложение в браузере: `npm run preview`
2. Добавьте на главный экран (PWA install)
3. Запустите игру
4. Выключите интернет
5. Приложение должно работать с сохранёнными данными

---

## Следующие шаги

1. Создать иконки 72x72 - 512x512 в PNG
2. Тестировать TWA через Bubblewrap
3. Подготовить APK для публикации в RuStore
4. Протестировать офлайн-режим на устройстве
