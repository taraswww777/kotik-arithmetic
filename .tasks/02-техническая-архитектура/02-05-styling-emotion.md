# 02-05. Стилизация через Emotion (CSS-in-JS)

## Подзадачи:
- [ ] Установить Emotion в client:
  ```bash
  cd /apps/client && npm install @emotion/react @emotion/styled
  # Для PWA офлайн: добавить к cache'd resources
  ```
- [ ] Настроить Emotion с `createCache` для офлайн работы:
  ```ts
  import { createCache, cacheLocation } from '@emotion/cache';
  
  const cache = createCache({
    name: 'kotik-arithmetic',
    version: 1,
    // кэширование стилей в IndexedDB (для офлайн режим)
  });
  
  document.head.appendChild(
    cache.insertStyleElement(cacheLocation)
  );
  ```

## Компоненты UI (Emotion styled components):
- [ ] Создать компоненты в `/apps/client/src/components/ui/`:
  - `Button.tsx` — крупные кнопки для детей
  - `TextField.tsx` — поля ввода с крупными границами
  - `GridCell.tsx` — клетки кроссворда (заполненные и пустые)
  - `Mascot.tsx` — маскот-котик в углу экрана

## Пример кнопки (`Button.tsx`):
```tsx
import styled from '@emotion/styled';

export const Button = styled.button({
  padding: '16px 32px',              // крупные элементы
  fontSize: '18px',                  // читабельный шрифт
  borderRadius: '12px',
  backgroundColor: '#4CAF50',        // контрастный цвет
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  ':hover': {
    backgroundColor: '#45a049',
  },
  '@media (max-width: 600px)': {
    padding: '12px 24px',            // адаптив под мобилки
    fontSize: '16px',
  },
});
```

## Темизация и контраст:
- [ ] Создать тему с высоконтрастными цветами (для детей):
  ```ts
  const theme = {
    colors: {
      primary: '#4CAF50',             // зелёный (успех)
      error: '#f44336',               // красный (ошибка)
      success: '#8bc34a',             // светло-зелёный (хваление котика)
      background: '#fafafa',          // светлый фон
      text: '#212121',                // тёмный текст
    },
    fontSizes: {
      small: '16px',                  // для детей — крупно!
      medium: '20px',
      large: '24px',
    },
  };
  ```

## Адаптивность:
- [ ] Мобильная версия: крупные интерактивные элементы, минимум текста
- [ ] Визуальные подсказки на всех устройствах (hover, focus)
- [ ] Десктопная версия с теми же стилями через медиа-запросы

## Критерии готовности:
- Все UI компоненты стилизованы через Emotion
- Игра работает офлайн (стили кэшируются)
- Адаптивная верстка под мобильные и десктоп