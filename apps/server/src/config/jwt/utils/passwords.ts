/**
 * Генерация внутреннего userId из email (для разработчика)
 */
export function generateMockUserId(email: string): string {
  const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  return `mock_${username}`;
}

/**
 * Утилита для хэширования пароля (пока используется bcrypt)
 */
import * as bcrypt from 'bcrypt';

export const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}