import styled from '@emotion/styled';

const Container = styled.div(({ inverted }) => ({
  position: 'absolute' as const,
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: inverted ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 200,
}));

const EmojiResult = styled.div({
  fontSize: '80px',
  marginBottom: '16px',
});

const Title = styled.h2({
  color: '#4CAF50',
  fontSize: '36px',
  margin: '0 0 24px 0',
  fontWeight: 'bold',
});

const StatsGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
  maxWidth: '500px',
  width: '90%',
  marginBottom: '24px',
});

const StatCard = styled.div(({ icon }) => ({
  padding: '16px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  border: '2px solid #e0e0e0',
  textAlign: 'center' as const,
}));

const Label = styled.span({
  fontSize: '14px',
  color: '#757575',
  display: 'block',
  marginBottom: '8px',
});

const Value = styled.span({
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#333',
});

const ActionButtons = styled.div(({ inverted }) => ({
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '12px',
}));

const Button = styled.button(({ primary, inverted }) => ({
  padding: '16px 32px',
  fontSize: '20px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold' as const,
  backgroundColor: primary ? '#4CAF50' : '#e0e0e0',
  color: inverted ? 'white' : '#333',
  transition: 'background-color 0.2s ease',
}));

export interface ResultsScreenProps {
  solvedCount: number;
  totalSolved: number;
  timeSpent: number;
  mistakes: number;
  difficultyLevel: 'basic' | 'advanced';
  onContinue: () => void;
  onSaveResult?: () => void;
  inverted?: boolean;
}

export const ResultsScreen = ({ 
  solvedCount,
  totalSolved,
  timeSpent,
  mistakes,
  difficultyLevel,
  onContinue,
  onSaveResult,
  inverted = false
}: ResultsScreenProps) => {
  
  // Кнопки действий
  const handleStartNewGame = () => {
    onContinue();
  };

  const handleSaveToHistory = () => {
    if (onSaveResult) {
      onSaveResult();
    }
  };

  const displayDifficulty = difficultyLevel === 'basic' ? 'Базовый' : 'Продвинутый';

  return (
    <Container inverted={inverted}>
      <EmojiResult>🎉</EmojiResult>
      
      <Title>{solvedCount === totalSolved ? 'Отлично! Все верно!' : 'Время вышло!</Title></h2>
      <p style={{ fontSize: '24px', marginBottom: '16px', color: inverted ? '#fff' : '#333' }}>
        {solvedCount === totalSolved 
          ? `Вы решили все ${totalSolved} примеров! Молодец!` 
          : `Вы решили ${solvedCount} из ${totalSolved} примеров`}
      </p>

      <StatsGrid>
        <StatCard icon="✅">
          <Label>Правильно</Label>
          <Value>{solvedCount}</Value>
        </StatCard>
        
        <StatCard icon="⏱️">
          <Label>Время</Label>
          <Value>{Math.floor(timeSpent / 60)}:{String(timeSpent % 60).padStart(2, '0')}</Value>
        </StatCard>
        
        {mistakes > 0 && (
          <StatCard icon="❌">
            <Label>Ошибки</Label>
            <Value>{mistakes}</Value>
          </StatCard>
        )}
        
        <StatCard icon="📊">
          <Label>Уровень</Label>
          <Value>{displayDifficulty}</Value>
        </StatCard>
      </StatsGrid>
      
      <ActionButtons inverted={inverted}>
        <Button 
          primary 
          onClick={handleStartNewGame}
          style={{ backgroundColor: '#4CAF50', color: 'white' }}
        >
          Новый кроссворд 🔄
        </Button>
        
        {solvedCount > 0 && (
          <Button 
            primary={false}
            onClick={handleSaveToHistory}
            style={{ backgroundColor: '#2196F3', color: 'white' }}
          >
            Сохранить в историю 💾
          </Button>
        )}
      </ActionButtons>
    </Container>
  );
};

// Типы для экспорта
export interface GameStats {
  solvedCount: number;
  totalSolved: number;
  timeSpent: number;
  mistakes: number;
  difficultyLevel: 'basic' | 'advanced';
}