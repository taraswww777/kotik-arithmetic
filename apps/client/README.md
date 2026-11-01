# Kotik Arithmetic Client

React + TypeScript + Vite + PWA клиентское приложение.

## Стек:
- React 18.2.0
- TypeScript 5.3.3
- Vite 5.0.10
- vite-plugin-pwa (офлайн режим)
- Emotion (CSS-in-JS стилизация)

## Структура:
```
src/
├── components/          # UI компоненты
│   ├── ui/              # Кнопки, поля ввода, GridCell
│   └── mascot/          # Mascot компонент
├── services/            # API, storage, PWA
├── theme/               # Emotion тема
├── types/               # TypeScript типы
└── hooks/               # React хуки
```

## Локальный запуск:
```bash
npm run dev
```

## Build:
```bash
npm run build
```