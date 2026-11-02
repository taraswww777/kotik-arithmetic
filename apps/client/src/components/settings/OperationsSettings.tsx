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

const CheckboxList = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  justifyContent: 'center',
});

const Checkbox = styled.label(({ checked }) => ({
  padding: '8px 16px',
  fontSize: '14px',
  border: '2px solid #ccc',
  borderRadius: '8px',
  cursor: 'pointer',
  backgroundColor: checked ? '#e8f5e9' : 'white',
  color: checked ? '#2e7d32' : '#333',
  fontWeight: checked ? 'bold' : 'normal',
}));

export interface OperationsSettingsProps {
  operations: ('+' | '-' | '*' | '/')[];
  onChange: (ops: ('+' | '-' | '*' | '/')[]) => void;
}

export const OperationsSettings = ({ operations, onChange }: OperationsSettingsProps) => {
  const operationLabels: Record<string, string> = {
    '+': 'Сложение (+)',
    '-': 'Вычитание (-)',
    '*': 'Умножение (×)',
    '/': 'Деление (÷)',
  };

  return (
    <Container>
      <h3>🔢 Операции:</h3>
      <CheckboxList>
        {['+', '-', '*', '/'].map((op) => (
          <Checkbox 
            key={op}
            checked={operations.includes(op)}
            onChange={(e) => {
              const newValue = operations.includes(op)
                ? operations.filter(o => o !== op)
                : [...operations, op];
              if (newValue.length > 0) onChange(newValue);
            }}
          >
            {operationLabels[op]}
          </Checkbox>
        ))}
      </CheckboxList>
    </Container>
  );
};