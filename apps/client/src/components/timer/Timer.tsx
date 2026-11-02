import styled from '@emotion/styled';

const Container = styled.div({
  position: 'absolute' as const,
  top: '10px',
  right: '10px',
  backgroundColor: '#fff3cd',
  padding: '8px 16px',
  borderRadius: '8px',
  border: '2px solid #ffc107',
  zIndex: 100,
});

const TimeDisplay = styled.div({
  fontFamily: 'monospace',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
});

const ProgressBarContainer = styled.div(({ inverted }) => ({
  width: '100%',
  height: '8px',
  backgroundColor: inverted ? '#ffc107' : '#e0e0e0',
  borderRadius: '4px',
  marginTop: '8px',
}));

const ProgressBar = styled.div(({ current, max }: { current: number; max: number }) => ({
  width: `${(current / max) * 100}%`,
  height: '100%',
  backgroundColor: '#4CAF50',
  borderRadius: '2px',
  transition: 'width 1s linear',
}));

export interface TimerProps {
  timeLeft: number;
  initialTime: number;
  onComplete: () => void;
  inverted?: boolean;
}

export const Timer = ({ timeLeft, onComplete, initialTime, inverted }: TimerProps) => {
  const seconds = Math.floor((timeLeft % 60));
  const minutes = Math.floor(timeLeft / 60);

  const handleProgressBarClick = () => {
    // Можно добавить логику для быстрого завершения игры
    // onComplete(); 
  };

  return (
    <Container>
      <TimeDisplay>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </TimeDisplay>
      <ProgressBarContainer inverted={inverted}>
        <ProgressBar current={timeLeft} max={initialTime} />
      </ProgressBarContainer>
    </Container>
  );
};

// Публичный тип для внешнего использования
export const InitialTime = 5 * 60; // 5 минут по умолчанию