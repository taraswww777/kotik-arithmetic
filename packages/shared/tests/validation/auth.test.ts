import { describe, it, expect } from 'vitest';
import { registerSchema, loginSchema } from '../../src/validation/auth';

describe('loginSchema', () => {
  it('должен принимать валидный email', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com' });
    expect(result.success).toBe(true);
  });

  it('должен отклонять некорректный email', () => {
    const result = loginSchema.safeParse({ email: 'invalid-email' });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('Некорректный email');
  });
});

describe('registerSchema', () => {
  it('должен принимать валидный email и пароль', () => {
    const result = registerSchema.safeParse({ 
      email: 'test@example.com',
      password: 'secure123'
    });
    expect(result.success).toBe(true);
  });

  it('должен отклонять короткий пароль', () => {
    const result = registerSchema.safeParse({ 
      email: 'a@b.ru', 
      password: '12345' 
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('>= 8 символов');
  });

  it('должен требовать обязательный email', () => {
    const result = registerSchema.safeParse({ password: 'secure123' });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('Email обязателен');
  });

  it('должен принимать email без домена для короткого пароля', () => {
    const result = registerSchema.safeParse({ 
      email: 'user@company.com', 
      password: '12345' 
    });
    expect(result.success).toBe(false);
  });
});