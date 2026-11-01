# 02-06. Обобщение: Technical Architecture Checklist

## Фронтенд (Client):
### Стек и настройки:
- [ ] React + TypeScript + Vite + `vite-plugin-pwa`
- [ ] Service Worker (кэширование оболочки, контента кроссвордов)
- [ ] Адаптивная верстка (мобильные + десктоп)
- [ ] **Emotion** для CSS-in-JS стилей (контрастный UI для детей)

### Стилизация:
- [ ] Крупные интерактивные элементы (≥16px шрифт, ≥40px кнопки)
- [ ] Минимум текста, визуальные подсказки
- [ ] Офлайн режим (стили кэшируются через Service Worker)

## Бэкенд (Server):
### Стек и настройки:
- [ ] Node.js + TypeScript + NestJS (модульная архитектура)
- [ ] Prisma ORM с PostgreSQL
- [ ] **Zod** для валидации всех запросов/ответов
- [ ] Базовые миграции (`User`, `GameResult`, `Group`, `Competition`)

### Валидация:
- [ ] Схемы аутентификации (`auth.ts`): email, password
- [ ] Схемы результатов игры (`game.ts`): время, ошибки, операции
- [ ] Схемы статистики (`stats.ts`): запросы агрегированных данных
- [ ] `ValidationPipe` с `transform: true`, `whitelist: true`

## DevOps (Infra):
### VPS + HTTPS:
- [ ] Российский VPS (например, `rdp-onedash.ru`)
- [ ] Домен + HTTPS через certbot (автоматическое продление)
- [ ] PostgreSQL БД с ежедневными бэкапами

### Мониторинг:
- [ ] PM2 для запуска NestJS
- [ ] Сбор логов (`pm2 logs`, `systemd` journalctl)
- [ ] Future: Prometheus + Grafana (архитектурный задел)

## Общие требования:
- [ ] Типобезопасность через shared типы
- [ ] Модульная архитектура с чёткими границами слоёв
- [ ] Логирование и мониторинг (подготовить для production)
- [ ] **Zod** схемы в `/packages/shared/src/validation/` доступны как `import { registerSchema } from 'shared-validation'`
- [ ] **Emotion** темы готовы в `/apps/client/src/theme/`

## Критерии готовности:
- ✅ Фронтенд работает офлайн (PWA + кэширование)
- ✅ Бэкенд валидирует запросы через Zod, API стабилен
- ✅ DevOps: сервер запущен, HTTPS настроен, бэкапы работают
