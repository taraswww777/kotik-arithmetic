import styled from '@emotion/styled';
import { useState } from 'react';

const MascotContainer = styled.div({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 100,
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
});

const MascotBubble = styled.div({
  position: 'absolute',
  bottom: '60px',
  right: 0,
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '12px 16px',
  borderRadius: '12px',
  fontSize: '16px',
  maxWidth: '250px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
});

export const Mascot = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isBouncing, setIsBouncing] = useState(false);

  return (
    <MascotContainer>
      <div style={{ fontSize: '100px', lineHeight: 1 }}>🐱</div>
      {isVisible && <MascotBubble>Правильно! Молодец!</MascotBubble>}
    </MascotContainer>
  );
};