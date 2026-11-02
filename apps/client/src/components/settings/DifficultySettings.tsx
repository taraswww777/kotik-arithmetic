import styled from '@emotion/styled';

const Container = styled.div({
  padding: '16px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  marginBottom: '16px',
});

const h3 = styled.h3({
  color: '#4CAF50',
  fontSize: '18px',
  margin: '0 0 12px 0',
});

const DifficultySelector = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  justifyContent: 'center',
});

const Button = styled.button(({ active }) => ({
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  backgroundColor: active ? '#4CAF50' : '#ddd',
  color: active ? 'white' : '#333',
  fontWeight: active ? 'bold' : 'normal',
  transition: 'all 0.2s ease',
}));

export interface DifficultySettingsProps {
  level: number;
  onChange: (level: number) => void;
}

export const DifficultySettings = ({ level, onChange }: DifficultySettingsProps) => {
  const difficultyOptions = [
    { label: 'До 10', value: 10 },
    { label: 'До 20', value: 20 },
    { label: 'До 30', value: 30 },
    { label: 'До 50', value: 50 },
  ];

  return (
    <Container>
      <h3>📐 Сложность:</h3>
      <DifficultySelector>
        {difficultyOptions.map((option) => (
          <Button
            key={option.value}
            active={level === option.value}
            onClick={() => onChange(option.value)}
          >
            🎯 До {option.value}
          </Button>
        ))}
      </DifficultySelector>
    </Container>
  );
};