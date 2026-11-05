# Генерация иконок для PWA и Android

## Текущее состояние ⚠️

### SVG плейсхолдеры созданы ✅
Все иконки в формате SVG в папке `apps/client/public/icons/`:
- ✅ icon-72x72.png.svg
- ✅ icon-96x96.png.svg
- ✅ icon-128x128.png.svg
- ✅ icon-144x144.png.svg
- ✅ icon-152x152.png.svg
- ✅ icon-192x192.png.svg
- ✅ icon-384x384.png.svg
- ✅ icon-512x512.png.svg

### PNG иконки отсутствуют ❌
Нужно сгенерировать PNG файлы из SVG или создать напрямую.

---

## Способы генерации PNG иконок

### Способ 1: Через Python (рекомендуется)

Скрипт для конвертации SVG в PNG:

```bash
# Установите Pillow если нужно:
pip install Pillow

# Выполните конвертацию
python scripts/convert-icons-to-png.py
```

### Способ 2: Онлайн-конвертеры

Используйте онлайн-сервисы:
- https://cloudconvert.com/svg-to-png
- https://svgtopng.com/

**Инструкция:**
1. Откройте один из SVG файлов в браузере
2. Скопируйте содержимое (Ctrl+A → Ctrl+C)
3. Вставьте в онлайн-конвертер
4. Скачайте PNG и загрузите в папку `apps/client/public/icons/`

### Способ 3: Через Node.js

Установите пакет для конвертации:
```bash
npm install --save-dev svg2png
```

Создайте скрипт `scripts/generate-icons.js`:
```javascript
const { execSync } = require('child_process');
const fs = require('fs');

// Конвертация всех SVG в PNG
const iconsDir = 'public/icons';
const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));

files.forEach(file => {
  const name = file.replace('.svg', '.png');
  console.log(`Конвертирую ${file} → ${name}`);
  
  // Команда конвертации через встраиванный convert или node-свой инструмент
  // execSync(`convert apps/client/public/icons/${file} apps/client/public/icons/${name}`, { stdio: 'inherit' });
});

console.log('✅ Все иконки сгенерированы!');
```

---

## Размеры иконок для разных платформ

### iOS (apple-touch-icon):
- 180x180px — рекомендуется
- 152x152px — поддерживается
- 120x120px — поддерживается
- 76x76px — поддерживается
- 58x58px — поддерживается

### Android (TWA):
- 48x48px — minimum
- 72x72px — medium
- 96x96px — large
- 144x144px — xlarge
- 192x192px — xxlarge (рекомендуется)
- 384x384px — xxxlarge
- 512x512px — для маркетплейсов

### PWA manifest:
- 72x72px
- 96x96px
- 128x128px
- 144x144px
- 152x152px
- 192x192px (важно!)
- 384x384px
- 512x512px (для RuStore)

---

## Создание кастомных иконок

### Векторная графика (Figma/Adobe Illustrator):
1. Создайте иконку размером 512x512px
2. Экспортируйте в PNG всех размеров через File → Export

### Чёрно-белая для масок:
- Для Android используйте версию с прозрачностью
- Белый фон для `maskable-any` иконок

### Пример структуры кастомных иконок:
```
public/icons/
├── icon-48x48.png          ← 48x48px
├── icon-72x72.png          ← 72x72px
├── icon-96x96.png          ← 96x96px
├── icon-128x128.png        ← 128x128px
├── icon-144x144.png        ← 144x144px
├── icon-152x152.png        ← 152x152px
├── icon-192x192.png        ← 192x192px (важно!)
├── icon-384x384.png        ← 384x384px
└── icon-512x512.png        ← 512x512px
```

---

## Проверка иконок после генерации

### Через DevTools:
```javascript
// В консоли браузера
const icons = [
  'icon-48x48.png',
  'icon-72x72.png',
  'icon-96x96.png',
  'icon-128x128.png',
  'icon-144x144.png',
  'icon-152x152.png',
  'icon-192x192.png',
  'icon-384x384.png',
  'icon-512x512.png',
];

icons.forEach(icon => {
  if (typeof fetch === 'undefined') {
    return;
  }
  
  fetch(`/icons/${icon}`).then(res => {
    console.log(`${icon}: ${res.status}`);
  }).catch(err => {
    console.error(`${icon} не найден:`, err.message);
  });
});
```

### Команда для проверки:
```bash
# Предварительный просмотр и проверка всех ресурсов
npm run preview --workspace=@kotik-arithmetic/client
```

---

## Иконки для Android (TWA)

### Структура иконок Android:
```
android/app/src/main/res/
├── mipmap-anydpi-v26/
│   ├── ic_launcher_round.xml  ← круглая иконка
│   └── ic_launcher.xml       ← обычная иконка
├── mipmap-hdpi/
│   └── ic_launcher.png       ← 72x72px или больше
├── mipmap-mdpi/
│   └── ic_launcher.png       ← 48x48px
└── mipmap-xhdpi/
    └── ic_launcher.png        ← 96x96px
```

### Создание через Android Studio:
1. Откройте проект TWA в Android Studio
2. Правой кнопкой на папке `res` → New → Image Asset
3. Выберите SVG или PNG иконку
4. Настройте размеры (72dp × 72dp, 96dp × 96dp)
5. Нажмите Generate

### Автоматическая генерация через Gradle:
```gradle
android {
    aaptOptions {
        additionalParameters '--no-header'
    }
}
```

---

## Валидация иконок перед публикацией

### Чеклист:
- [ ] Все SVG плейсхолдеры конвертированы в PNG
- [ ] PNG файлы имеют правильные размеры
- [ ] Иконки отображаются во всех браузерах
- [ ] Маскированные иконки для Android работают
- [ ] `apple-touch-icon.png` настроен

### Команда проверки:
```bash
# Предварительный просмотр с проверкой ресурсов
npm run preview --workspace=@kotik-arithmetic/client
# Откройте в браузере и проверьте иконки
```

---

## Следующие шаги после генерации иконок

1. Замените SVG плейсхолдеры PNG файлами:
   ```bash
   # Скопируйте сгенерированные PNG в папку icons/
   cp *.png apps/client/public/icons/
   ```

2. Проверьте работу PWA через DevTools

3. Соберите TWA через Bubblewrap:
   ```bash
   bubblewrap create kotik-arithmetic \
     --web-app dist/index.html \
     --icon-path path/to/icon.png
   ```

4. Тестировать на устройстве Android 5+
