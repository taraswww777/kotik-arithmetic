import { useState, useCallback } from 'react';
import { mascotMessages } from '@kotik-arithmetic/config/mascot';

/**
 * Хук для работы с маскотом-котиком
 * Позволяет интегрировать реакции на действия пользователя
 */
export const useMascot = () => {
  // Текущее состояние показа маскота
  const [isVisible, setIsVisible] = useState(true);
  
  // Сообщения для разных типов событий
  const showSuccessMessage = useCallback(() => {
    const successMessages = mascotMessages.filter(m => m.type === 'success');
    const randomMessage = 
      successMessages[Math.floor(Math.random() * successMessages.length)];
    
    alert(randomMessage.text);
    return randomMessage;
  }, []);

  const showError = useCallback(() => {
    const errorMessages = mascotMessages.filter(m => m.type === 'error');
    const randomMessage = 
      errorMessages[Math.floor(Math.random() * errorMessages.length)];
    
    alert(randomMessage.text);
    return randomMessage;
  }, []);

  const showHint = useCallback(() => {
    const hintMessages = mascotMessages.filter(m => m.type === 'hint');
    const randomMessage = 
      hintMessages[Math.floor(Math.random() * hintMessages.length)];
    
    alert(randomMessage.text);
    return randomMessage;
  }, []);

  // Открытие/закрытие маскота
  const toggleVisibility = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  // Скрыть маскот
  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Показать маскот
  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Автоматическое скрытие при фокусе на поле ввода
  const handleFocus = useCallback((autoHide: boolean) => {
    if (autoHide && isVisible) {
      hide();
    }
  }, [isVisible, hide]);

  return {
    isVisible,
    showSuccessMessage,
    showError,
    showHint,
    toggleVisibility,
    hide,
    show,
    handleFocus,
  };
};