import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface OfflinePlaceholderProps {
  isVisible: boolean;
}

const Container = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(76, 175, 80, 0.9);
  z-index: 9999;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media (max-width: 600px) {
    background-color: rgba(76, 175, 80, 0.85);
  }

  &.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`;

const Content = styled.div`
  text-align: center;
  color: white;
  padding: 24px;
  max-width: 500px;
  width: 90%;

  @media (max-width: 600px) {
    padding: 16px;
    font-size: 18px;
    line-height: 1.4;
  }

  h2 {
    margin-top: 0;
    font-size: 28px;
    font-weight: bold;
    color: #ffffff;

    @media (max-width: 600px) {
      font-size: 24px;
    }
  }

  p {
    margin-bottom: 16px;
    font-size: 18px;

    @media (max-width: 600px) {
      font-size: 16px;
    }
  }

  .emoji-icon {
    font-size: 64px;
    margin-bottom: 24px;

    @media (max-width: 600px) {
      font-size: 56px;
      margin-bottom: 16px;
    }
  }
`;

export const OfflinePlaceholder = ({ isVisible }: OfflinePlaceholderProps) => {
  if (!isVisible) return null;

  return (
    <Container className={isVisible ? 'visible' : 'hidden'}>
      <Content>
        <div className="emoji-icon">📱</div>
        <h2>Нет интернета</h2>
        <p>
          Игра сохранена в кэше и работает офлайн! Откройте её через 
          «Добавить на главный экран», чтобы играть без сети.
        </p>
      </Content>
    </Container>
  );
};

export const useIsOffline = (): boolean => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Проверка подключения к интернету
    if (navigator.onLine) {
      setIsOffline(false);
    } else {
      setIsOffline(true);
    }

    window.addEventListener('offline', () => setIsOffline(true));
    window.addEventListener('online', () => setIsOffline(false));

    return () => {
      window.removeEventListener('offline', () => setIsOffline(true));
      window.removeEventListener('online', () => setIsOffline(false));
    };
  }, []);

  return isOffline;
};