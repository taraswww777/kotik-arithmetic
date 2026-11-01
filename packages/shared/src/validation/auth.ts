import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
});

export const registerSchema = z.object({
  email: z.string().email('Некорректный email').min(1, 'Email обязателен'),
  password: z.string().min(8, 'Пароль должен быть >= 8 символов'),
});