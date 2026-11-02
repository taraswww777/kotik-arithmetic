import styled, { keyframes } from '@emotion/styled';
import { useState, useEffect, useCallback } from 'react';
import { mascotMessages, type MascotMessage } from '@kotik-arithmetic/config/mascot';

// Типизация сообщений по типу
type SuccessMessage = MascotMessage & { type: 'success' };
type HintMessage = MascotMessage & { type: 'hint' };
type ErrorMessage = MascotMessage & { type: 'error' };

// Анимации
const bounce = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-10px)' },
});

const sitAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '25%': { transform: 'rotate(5deg)' },
  '75%': { transform: 'rotate(-5deg)' },
  '100%': { transform: 'rotate(0deg)' },
});

const lieAnimation = keyframes({
  '0%': { transform: 'rotate(0deg) scaleX(1)' },
  '50%': { transform: 'rotate(-5deg) scaleX(0.95)' },
  '100%': { transform: 'rotate(0deg) scaleX(1)' },
});

const standAnimation = keyframes({
  '0%': { transform: 'scaleY(1)' },
  '50%': { transform: 'scaleY(1.05)' },
  '100%': { transform: 'scaleY(1)' },
});

// Кнопка скрытия/показа маскота
const ToggleButton = styled.button({
  position: 'absolute',
  top: '-40px',
  left: '10px',
  background: '#333',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '6px 12px',
  fontSize: '12px',
  cursor: 'pointer',
  opacity: 0.7,
  transition: 'opacity 0.3s',
});

const MascotContainer = styled.div<{
  position: 'sit' | 'lie' | 'stand';
  isVisible: boolean;
}>(({ position, isVisible }) => ({
  position: 'fixed',
  bottom: position === 'sit' ? '20px' : position === 'lie' ? '15px' : '30px',
  right: position === 'sit' ? '20px' : position === 'lie' ? '15px' : '25px',
  zIndex: 100,
  cursor: 'pointer',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: isVisible ? 1 : 0,
  pointerEvents: isVisible ? 'auto' : 'none',
}));

const MascotBody = styled.div<{ position: 'sit' | 'lie' | 'stand' }>(({ position }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: position === 'sit' ? '100px' : position === 'lie' ? '90px' : '85px',
  lineHeight: 1,
}));

const MascotBubble = styled.div<{ isVisible: boolean }>({
  position: 'absolute',
  bottom: position => `${position + 60}px`, // зависит от позиции котика
  right: 0,
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '12px 16px',
  borderRadius: '12px',
  fontSize: '14px',
  maxWidth: '220px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease',
});

const Mascot = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Состояние котика: sit (сидит), lie (лёг), stand (стоит)
  const [position, setPosition] = useState<'sit' | 'lie' | 'stand'>('sit');
  
  // Текущее сообщение
  const [currentMessage, setCurrentMessage] = useState<MascotMessage | null>(null);
  
  // Таймер показа сообщений
  const [messageTimeout, setMessageTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Анимация появления сообщения
  const [isAnimating, setIsAnimating] = useState(false);

  // Выбор случайного сообщения по типу
  const getRandomMessageByType = useCallback(
    (type: 'success' | 'hint' | 'error') => {
      const typeMessages = mascotMessages.filter(m => m.type === type);
      return typeMessages[Math.floor(Math.random() * typeMessages.length)];
    },
    []
  );

  // Показать сообщение
  const show_message = useCallback(
    (message: MascotMessage) => {
      setCurrentMessage(message);
      
      if (isAnimating) return;
      setIsAnimating(true);

      // Сброс анимации после завершения показа
      const animationDuration = 4000; // 4 секунды показ
      const fadeOutDuration = 500; // 0.5 секунды исчезновения

      const timer = setTimeout(() => {
        setIsAnimating(false);
        setCurrentMessage(null);
      }, animationDuration + fadeOutDuration);

      return timer;
    },
    [isAnimating]
  );

  // Обработка правильного ответа
  const handleCorrectAnswer = useCallback(() => {
    const message = getRandomMessageByType('success');
    show_message(message);
  }, [getRandomMessageByType, show_message]);

  // Обработка ошибки
  const handleError = useCallback(() => {
    const message = getRandomMessageByType('error');
    show_message(message);
  }, [getRandomMessageByType, show_message]);

  // Подсказка при застревании
  const handleStuck = useCallback(() => {
    const message = getRandomMessageByType('hint');
    show_message(message);
  }, [getRandomMessageByType, show_message]);

  // Смена позы котика (циклически: сидит -> лежит -> стоит)
  useEffect(() => {
    if (!isVisible) return;

    const changePositionInterval = setInterval(() => {
      setPosition(prev => {
        const positions: ('sit' | 'lie' | 'stand')[] = ['sit', 'lie', 'stand'];
        const currentIndex = positions.indexOf(prev);
        const nextIndex = (currentIndex + 1) % positions.length;
        return positions[nextIndex];
      });
    }, 15000); // Меняем позу каждые 15 секунд

    return () => clearInterval(changePositionInterval);
  }, [isVisible]);

  // Кнопка скрытия/показа
  const toggleButton = (
    <ToggleButton onClick={() => setIsVisible(!isVisible)}>
      {isVisible ? '✕' : '🐱'}
    </ToggleButton>
  );

  return (
    <MascotContainer 
      isVisible={isVisible} 
      position={position === 'sit' ? 'sit' : position === 'lie' ? 'lie' : 'stand'} 
    >
      {toggleButton}
      
      <MascotBody position={position}>
        {/* Котик с атрибутом (шляпа) */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div 
            style={{ 
              fontSize: position === 'sit' ? '100px' : position === 'lie' ? '90px' : '85px',
              lineHeight: 1,
              position: 'relative',
              transform: `rotate(${position === 'sit' ? (Date.now() % 1000 > 500 ? 2 : -2) : position === 'lie' ? 3 : 0}deg)`
            }}
          >
            🐱
          </div>
          {/* Шляпа учителя */}
          <div style={{
            position: 'absolute',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '60px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
          }}>🎓</div>
        </div>

        {/* Полупрозрачная тень */}
        <div 
          style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%) scaleX(' + (position === 'sit' ? 1 : position === 'lie' ? 1.2 : 0.8) + ')',
            width: '80px',
            height: '8px',
            background: 'rgba(0,0,0,0.15)',
            borderRadius: '4px',
          }} 
        />

        {/* Сообщения */}
        {currentMessage && (
          <MascotBubble isVisible={!!currentMessage}>
            {currentMessage.text}
          </MascotBubble>
        )}
      </MascotBody>
    </MascotContainer>
  );
};

export default Mascot;