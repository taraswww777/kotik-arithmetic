import { useState, useEffect, useCallback } from 'react';

export interface UseGameTimerOptions {
  initialTime?: number;      // в секундах (по умолчанию 5 минут)
  onComplete: () => void;    // коллбэк при завершении таймера
  
  // Опциональные
  warningIntervalSeconds?: number; // время уведомления о конце игры (30 сек по умолчанию)
}

export const useGameTimer = ({ 
  initialTime = 5 * 60,      // в секундах (по умолчанию 5 минут)
  onComplete,
  warningIntervalSeconds = 30,
}: UseGameTimerOptions) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [warningTimeLeft, setWarningTimeLeft] = useState(warningIntervalSeconds);

  // Основная таймер-функция
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          onComplete();       // завершить игру
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime, onComplete]);

  // Таймер обратного отсчёта до конца игры
  useEffect(() => {
    if (timeLeft <= warningIntervalSeconds) {
      const countdown = setInterval(() => {
        setWarningTimeLeft(prev => {
          if (prev <= 0) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(countdown);
    }
  }, [timeLeft, warningIntervalSeconds]);

  // Уведомление о конце игры
  const secondsUntilEnd = Math.max(0, warningIntervalSeconds - timeLeft);
  
  const isWarningPhase = secondsUntilEnd <= 10; // последние 10 секунд
  
  return { 
    timeLeft, 
    secondsUntilEnd,
    isWarningPhase,
    remainingTime: `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`
  };
};

// Публичные типы
export type UseGameTimerResult = ReturnType<typeof useGameTimer>;