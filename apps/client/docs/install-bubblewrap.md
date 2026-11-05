# Установка Bubblewrap

## Что такое Bubblewrap?

Bubblewrap — это утилита Google для создания [Top-level Web Apps (TWA)](https://developer.android.com/guides/webapps) без необходимости создавать полноценный проект Android. Она упаковывает ваше веб-приложение в APK файл, который можно установить на Android устройства.

## Варианты установки

### Способ 1: Через npm (рекомендуется)

```bash
npm install -g @react-native-community/cli-bundle

# Или используйте пакет bubblewrap напрямую
npm install -g bubblewrap-cli
```

**Проверка установки:**
```bash
bubblewrap --version
# Ожидаемый вывод: 1.25.0+ (или последняя версия)
```

### Способ 2: Через npx

Если не хотите устанавливать глобально:

```bash
npx bubblewrap create kotik-arithmetic \
  --web-app dist/index.html \
  --app-name "Котик в мире арифметики"
```

## Требования к системе

- Node.js >= 14.x
- npm >= 6.x
- Windows/Mac/Linux

## Установка на Windows

### Через PowerShell или CMD:

```powershell
npm install -g @react-native-community/cli-bundle
```

**Или через chocolatey (если установлен):**
```powershell
choco install bubblewrap-cli
```

## Проверка работы

### Создание тестового TWA:

```bash
# Сначала соберите фронтенд
npm run build:twa

# Затем создайте TWA
bubblewrap create kotik-arithmetic \
  --web-app dist/index.html \
  --base-url file:///android_asset/www/ \
  --app-name "Котик в мире арифметики" \
  --icon-path path/to/icon.png
```

**Проверка:**
1. Команда создаст структуру проекта Android в папке `kotik-arithmetic`
2. В папке будет `build.gradle` и другие файлы конфигурации
3. Вы можете запустить проект через Android Studio или генерировать APK

## Решение проблем

### Проблема: npm не может установить bubblewrap

**Решение:**
```bash
npm cache clean --force
npm install -g @react-native-community/cli-bundle
```

### Проблема: Bubblewrap не находит dist/index.html

**Решение:**
Убедитесь, что вы запустили команду сборки перед созданием TWA:
```bash
npm run build:twa
# Или вручную: npm run build
```

### Проблема: Нет Android SDK

**Решение:**
Bubblewrap не требует установки Android SDK для создания TWA. Однако, если вы хотите генерировать APK файлы, потребуется:
1. Скачать и установить Android Studio
2. Настроить Android SDK в настройках Bubblewrap

## Альтернативы Bubblewrap

Если Bubblewrap не подходит, рассмотрите эти варианты:

### 1. WebView обёртка (без Bubblewrap):
Создайте свой проект Android Studio и используйте WebView для отображения вашего веб-приложения.

**Преимущества:**
- Полный контроль над конфигурацией
- Можно настраивать любые параметры
- Не требует дополнительных зависимостей

**Недостатки:**
- Требуется настройка проекта Android Studio
- Более сложный процесс сборки

### 2. Capacitor:
```bash
npm install @capacitor/cli
npx cap init
npx cap add android
npx cap open android
```

**Преимущества:**
- Простая настройка
- Хорошая документация
- Поддержка многих плагинов

### 3. Cordova:
```bash
npm install -g cordova
cordova create kotik-arithmetic com.kotikarithmetic KotikArithmetic
cd kotik-arithmetic
cordova platform add android
cordova build android
```

## Дополнительные ресурсы

- [Официальная документация Bubblewrap](https://developer.android.com/studio/build/bundle-web-apps)
- [TWA Guide от Google](https://developer.android.com/guides/webapps)
- [Android Developers - TWA](https://developer.android.com/topic/apps/webapps)
