import * as jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string; // enum: USER_ROLE_CHILD, USER_ROLE_PARENT
  externalId?: string;
}

interface TokenOptions {
  secret?: string;
  expiresIn?: number; // в секундах
  additionalData?: Record<string, unknown>;
}

/**
 * Создать JWT токен для пользователя
 */
export function createJwtToken(payload: JwtPayload, options: TokenOptions = {}): string {
  const { secret, expiresIn, additionalData = {} } = options;
  
  const token = jwt.sign(
    {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      externalId: payload.externalId,
      ...additionalData,
    },
    secret || 'dev-secret-change-in-prod',
    { expiresIn: expiresIn || 86400 } // 24 часа по умолчанию
  );
  
  return token;
}

/**
 * Проверить токен и вернуть payload
 */
export function verifyJwtToken(token: string, secret?: string): JwtPayload | null {
  try {
    const payload = jwt.verify(token, secret || 'dev-secret-change-in-prod');
    
    if (!payload.userId) {
      return null;
    }

    return payload as JwtPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Извлечь userId из токена (для использования в decorator)
 */
export function getUserIdFromToken(token: string, secret?: string): string | null {
  const payload = verifyJwtToken(token, secret);
  return payload?.userId || null;
}