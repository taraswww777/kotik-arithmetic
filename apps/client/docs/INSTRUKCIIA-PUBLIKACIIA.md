# Инструкции по публикации в RuStore

## Требования для «Котик в мире арифметики» ✅

### 1. ПWA-функциональность выполнено:
- [x] Service Worker настроен через `vite-plugin-pwa`
- [x] Кэширование оболочки (index.html, манифест)
- [x] Кэширование контента (кроссворды для офлайн режима)
- [x] Генерация manifest.json и иконок

### 2. Адаптивность выполнено:
- [x] Мобильная версия с крупными элементами
- [x] Визуальные подсказки на всех устройствах
- [x] Десктопная версия с той же логикой

### 3. Android-сборка выполнена:
- [x] Настроена команда `bubblewrap` для создания TWA
- [x] Подготовлен bundle для включения в TWA
- [x] Создан WebView fallback на офлайн (плейсхолдер вместо ошибки)

### 4. Требования RuStore выполнены:
- [x] Отсутствуют элементы навигации браузера
- [x] Корректная работа без интернета

---

## Этапы публикации

### Шаг 1: Сборка проекта

#### Сборка фронтенда с PWA:
```bash
cd apps/client
npm run build:twa
# Или вручную:
npm run build
```

**Результат:** Файлы собраны в `apps/client/dist/`

### Шаг 2: Создание TWA через Bubblewrap

```bash
bubblewrap create kotik-arithmetic \
  --web-app dist/index.html \
  --base-url file:///android_asset/www/ \
  --app-name "Котик в мире арифметики" \
  --icon-path path/to/icon.png
```

**Результат:** Структура проекта Android создана в папке `kotik-arithmetic`

### Шаг 3: Генерация APK

#### Отладочная сборка (для тестирования):
```bash
cd kotik-arithmetic/android
./gradlew assembleDebug
# APK будет в app/build/outputs/apk/debug/app-debug.apk
```

#### Прорезиненная сборка (для публикации):
```bash
./gradlew assembleRelease
# APK будет в app/build/outputs/apk/release/app-release.apk
```

### Шаг 4: Генерация Android App Bundle (.aab)

Для публикации в Google Play Store или RuStore требуется .aab файл:

```bash
./gradlew bundleRelease
# AAB будет в app/build/outputs/bundle/release/app-release.aab
```

---

## Подготовка для RuStore

### Файлы для загрузки в RuStore:

1. **APK или AAB файл:**
   - `app-release.apk` (для APK)
   - Или `app-release.aab` (для Android App Bundle)

2. **Метаданные приложения:**
   ```
   Название: Котик в мире арифметики
   Категория: Образование / Развивающие игры
   Возраст: 5-9 лет
   Размер: <100 МБ
   Язык: Русский
   Версия: 1.0.0
   Минимальная версия Android: 5.0 (API 21)
   ```

3. **Описание:**
   > «Котик в мире арифметики» — это обучающая игра для детей 5–9 лет, где они решают арифметические примеры в формате кроссворда. Игра работает офлайн и не требует интернета!

### Требования RuStore:

| Требование | Статус |
|------------|--------|
| Минимальная версия Android 5.0 | ✅ `minSdk 21` |
| Оффлайн режим | ✅ IndexedDB + Service Worker |
| Иконки всех размеров | ⚠️ SVG плейсхолдеры (нужны PNG) |
| Манифест PWA | ✅ `manifest.json` настроен |
| Без элементов навигации | ✅ WebView без меню браузера |

---

## Чеклист перед публикацией

### Фронтенд:
- [x] `vite-pwa.config.ts` настроен
- [x] `manifest.json` в папке `public/`
- [x] Иконки в папке `public/icons/`
- [x] `index.html` с meta viewport

### Адаптивность:
- [x] Крупные интерактивные элементы (кнопки, клетки)
- [x] Визуальные подсказки на всех устройствах
- [x] Мобильная и десктопная версии

### Android:
- [x] `bubblewrap` команда настроена
- [x] Bundle подготовлен для TWA
- [x] WebView fallback на офлайн

### RuStore:
- [x] Отсутствуют элементы навигации браузера
- [x] Корректная работа без интернета
- [ ] Проверить иконки (SVG → PNG)

---

## Команды для финальной сборки

```bash
# 1. Установка зависимостей
npm install --workspace=@kotik-arithmetic/client

# 2. Сборка фронтенда с PWA
npm run build:twa

# 3. Тестирование офлайн-режима
npm test --workspace=@kotik-arithmetic/client

# 4. Предварительный просмотр
npm run preview --workspace=@kotik-arithmetic/client

# 5. Сборка TWA через Bubblewrap
bubblewrap create kotik-arithmetic \
  --web-app apps/client/dist/index.html \
  --base-url file:///android_asset/www/ \
  --app-name "Котик в мире арифметики" \
  --icon-path path/to/icon.png

# 6. Сборка APK (через Android Studio)
cd kotik-arithmetic/android
./gradlew assembleRelease
```

---

## Документация и инструкции

### Файлы документации:
- `apps/client/README-PWA-ANDROID.md` — Общая документация PWA и Android сборки
- `apps/client/docs/bubblewrap-setup.md` — Настройка Bubblewrap
- `apps/client/docs/install-bubblewrap.md` — Инструкция по установке Bubblewrap
- `apps/client/docs/webview-config-example.xml` — Пример конфигурации WebView
- `apps/client/docs/online-offline-test.md` — Тестирование офлайн-режима
- `apps/client/docs/INSTRUKCIIA-PUBLIKACIIA.md` — Этапы публикации (этот файл)

---

## Контакты и поддержка

При возникновении проблем:

1. Проверьте документацию в папке `apps/client/docs/`
2. Протестируйте офлайн-режим через DevTools
3. Используйте команду `npm run preview` для проверки PWA
