import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
});

export const registerSchema = z.object({
  email: z.string().email('Некорректный email').min(1, 'Email обязателен'),
  password: z.string().min(8, 'Пароль должен быть >= 8 символов'),
});

/**
 * Схема для обновления пользователя через внешний ID (OAuth)
 */
export const updateByExternalIdSchema = z.object({
  email: z.string().email('Некорректный email').optional(),
  role: z.enum(['USER_ROLE_CHILD', 'USER_ROLE_PARENT']).optional(),
  externalId: z.string().min(1, 'Внешний ID обязателен для OAuth провайдеров'),
});

/**
 * Схема для проверки роли пользователя
 */
export const roleSchema = z.object({
  email: z.string().email('Некорректный email'),
});

/**
 * Схема для валидации токена
 */
export const validateTokenSchema = z.object({
  token: z.string().min(1, 'Токен обязателен'),
});