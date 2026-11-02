// Экспорт всех конфигурационных модулей
export * from './difficulty';
export * from './operations';
export * from './settings';
export * from './mascot';

// Валидационные схемы для использования в сервисе
export { 
  statsRequestSchema, 
  gameResultSchema,
} from '../validation/stats';
export type { StatsRequestInput, GameResultInput } from '../validation/stats';