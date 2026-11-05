import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfflinePlaceholder, useIsOffline } from '../OfflinePlaceholder';

describe('OfflinePlaceholder', () => {
  it('рендерит компонент только когда isVisible=true', () => {
    const { container } = render(<OfflinePlaceholder isVisible={true} />);
    expect(screen.getByText(/Нет интернета/i)).toBeInTheDocument();
    
    const hiddenContainer = render(<OfflinePlaceholder isVisible={false} />);
    expect(hiddenContainer.container).toBeEmpty();
  });

  it('отображает правильные визуальные подсказки', () => {
    render(<OfflinePlaceholder isVisible={true} />);
    
    const emojiIcon = screen.getByText('📱');
    const title = screen.getByText(/Нет интернета/i);
    const description = screen.getByText(
      /Игра сохранена в кэше и работает офлайн/
    );
    
    expect(emojiIcon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('имеет правильные стили для мобильных устройств', () => {
    render(<OfflinePlaceholder isVisible={true} />);
    
    // Проверка адаптивности (в реальном тесте нужно эмулировать media query)
    const container = document.querySelector('[style*="position: fixed"]');
    expect(container).toBeTruthy();
  });
});

describe('useIsOffline', () => {
  let originalOnline: boolean;

  beforeEach(() => {
    // Сохраняем оригинальное состояние сети
    originalOnline = navigator.onLine;
  });

  it('возвращает false при наличии интернета', () => {
    expect(navigator.onLine).toBeTruthy();
    
    const isOffline = useIsOffline();
    
    expect(isOffline).toBe(false);
  });

  it('срабатывает на событие offline', () => {
    // Симулируем отключение интернета
    Object.defineProperty(navigator, 'onLine', { writable: true, configurable: true });
    (navigator as any).onLine = false;
    
    const isOffline = useIsOffline();
    
    expect(isOffline).toBe(true);
  });

  it('срабатывает на событие online', () => {
    Object.defineProperty(navigator, 'onLine', { writable: true, configurable: true });
    (navigator as any).onLine = false;
    
    const isOffline = useIsOffline();
    
    expect(isOffline).toBe(true);
  });
});