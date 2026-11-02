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

const RadioGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'center',
});

const Radio = styled.label(({ selected }) => ({
  padding: '12px 24px',
  fontSize: '16px',
  border: '2px solid #ccc',
  borderRadius: '8px',
  cursor: 'pointer',
  backgroundColor: selected ? '#e8f5e9' : 'white',
  color: selected ? '#2e7d32' : '#333',
  fontWeight: selected ? 'bold' : 'normal',
}));

export interface OperatorsDisplaySettingsProps {
  multiplicationSymbol: '×' | '*';
  divisionSymbol: '÷' | ':';
  onChange: (symbols: { multiplicationSymbol: '×' | '*'; divisionSymbol: '÷' | ':' }) => void;
}

export const OperatorsDisplaySettings = ({ 
  multiplicationSymbol, 
  divisionSymbol,
  onChange 
}: OperatorsDisplaySettingsProps) => {
  return (
    <Container>
      <h3>🔤 Символы операций:</h3>
      <RadioGroup>
        <Radio selected={multiplicationSymbol === '×'}>
          Умножение: ×
          <input
            type="radio"
            name="mult-symbol"
            value="×"
            checked={multiplicationSymbol === '×'}
            onChange={(e) => onChange({ ...onChange(), multiplicationSymbol: e.target.value as '×' | '*' })}
            style={{ display: 'none' }}
          />
        </Radio>

        <Radio selected={multiplicationSymbol === '*'}>
          Умножение: *
          <input
            type="radio"
            name="mult-symbol"
            value="*"
            checked={multiplicationSymbol === '*'}
            onChange={(e) => onChange({ ...onChange(), multiplicationSymbol: e.target.value as '×' | '*' })}
            style={{ display: 'none' }}
          />
        </Radio>

        <Radio selected={divisionSymbol === '÷'}>
          Деление: ÷
          <input
            type="radio"
            name="div-symbol"
            value="÷"
            checked={divisionSymbol === '÷'}
            onChange={(e) => onChange({ ...onChange(), divisionSymbol: e.target.value as '÷' | ':' })}
            style={{ display: 'none' }}
          />
        </Radio>

        <Radio selected={divisionSymbol === ':'}>
          Деление: :
          <input
            type="radio"
            name="div-symbol"
            value=":"
            checked={divisionSymbol === ':'}
            onChange={(e) => onChange({ ...onChange(), divisionSymbol: e.target.value as '÷' | ':' })}
            style={{ display: 'none' }}
          />
        </Radio>
      </RadioGroup>
    </Container>
  );
};