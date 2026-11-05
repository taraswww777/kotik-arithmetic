# Настройка Bubblewrap для создания TWA

## Что такое Bubblewrap?

Bubblewrap — это утилита Google для быстрой разработки и тестирования [Top-level Web Apps (TWA)](https://developer.android.com/guides/webapps/). Она создаёт APK-файлы из веб-приложений без необходимости создавать полноценный проект Android.

## Установка Bubblewrap

### Через npm:
```bash
npm install -g @react-native-community/cli-bundle
# Или использовать bubblewrap напрямую:
npm install -g bubblewrap-cli
```

### Проверка установки:
```bash
bubblewrap --version
```

## Создание TWA для «Котик в мире арифметики»

### 1. Подготовка фронтенда:
```bash
cd apps/client
npm run build:twa
# Или вручную:
npm run build # Сборка Vite
```

### 2. Создание TWA через Bubblewrap:
```bash
bubblewrap create kotik-arithmetic \
  --web-app dist/index.html \
  --base-url file:///android_asset/www/ \
  --app-name "Котик в мире арифметики" \
  --icon-path path/to/icon.png \
  --display-file app/src/main/res/raw/manifest.json
```

### 3. Параметры Bubblewrap:

| Параметр | Описание |
|----------|----------|
| `--web-app` | Путь к index.html собранных ресурсов |
| `--base-url` | Базовая URL для загрузки ресурсов |
| `--app-name` | Название приложения в Android |
| `--icon-path` | Путь к иконке (PNG или SVG) |
| `--display-file` | Файл манифеста для PWA |

### 4. Структура проекта TWA:
```
kotik-arithmetic/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── AndroidManifest.xml
│   │       └── res/
│   │           └── raw/manifest.json  # PWA manifest
│   ├── build.gradle
│   └── settings.gradle
├── dist/                    # Сборка Vite
│   ├── index.html
│   ├── manifest.json
│   └── sw.js                # Service Worker
└── public/icons/           # Иконки для Android
```

## Настройка AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.kotikarithmetic">

    <!-- Разрешение на интернет (для первой загрузки) -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:label="Котик в мире арифметики"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/Theme.AppCompat.Light.NoActionBar"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale">
            
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <!-- Метаданные для PWA -->
            <meta-data
                android:name="com.google.android.play.bundling.webview_version"
                android:value="147212103" />
        </activity>
    </application>
</manifest>
```

## Настройка build.gradle

### app/build.gradle:
```gradle
plugins {
    id 'com.android.application'
}

android {
    compileSdk 33

    defaultConfig {
        applicationId "com.kotikarithmetic"
        minSdk 21
        targetSdk 33
        versionCode 1
        versionName "1.0"
    }

    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation 'com.google.android.material:material:1.5.0'
}
```

## Сборка APK

### Отладочная сборка (Debug):
```bash
./gradlew assembleDebug
# APK будет в app/build/outputs/apk/debug/app-debug.apk
```

### Прорезиненная сборка (Release):
```bash
./gradlew assembleRelease
# APK будет в app/build/outputs/apk/release/app-release.apk
```

## Установка APK на устройство

```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

## Проверка работы TWA

1. Откройте APK через ADB или установите на устройство
2. Проверьте, что:
   - Приложение работает офлайн
   - Иконки отображаются корректно
   - Кэш ресурсов работает правильно
3. Проверьте в настройках приложения, что он запущен в standalone режиме

## Публикация в RuStore

### Требования RuStore для TWA:
- ✅ APK файл версии 21+ minSdk
- ✅ Standalone режим (без адресной строки браузера)
- ✅ Кэширование ресурсов
- ✅ Иконки и манифест
- ✅ Работа без интернета

### Подготовка пакета:
1. Сгенерируйте подписанный APK:
   ```bash
   ./gradlew bundleRelease
   # Или вручную через Android Studio
   ```

2. Проверьте APK через:
   - [Android App Bundle Generator](https://support.google.com/googleplay/android-developer/answer/9850755)
   - [APK Analyzer](https://developer.android.com/studio/command-line/apkparser)

3. Загрузите в RuStore
