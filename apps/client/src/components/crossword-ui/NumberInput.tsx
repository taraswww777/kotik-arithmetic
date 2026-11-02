import styled from '@emotion/styled';

const Container = styled.input(({ error }) => ({
  width: '100%',
  height: '100%',
  padding: '8px',
  fontSize: '24px',
  fontFamily: 'monospace',
  textAlign: 'center' as const,
  border: error ? '2px solid #f44336' : '2px solid #ccc',
  borderRadius: '4px',
  outline: 'none',
  backgroundColor: '#fff',
  color: '#333',
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
}));

const ErrorPopup = styled.div({
  position: 'absolute' as const,
  top: '-20px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#f44336',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  whiteSpace: 'nowrap' as const,
});

const EmojiIcon = styled.span({
  marginRight: '8px',
});

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function NumberInput({ 
  inputMode,
  onChange,
  error,
  ...props 
}: NumberInputProps) {
  
  // Обработчик ошибки ввода
  const showError = (message: string): void => {
    console.error(message);
  };

  return (
    <Container error={!!error} value={props.value || ''} onChange={onChange} {...props}>
      <ErrorPopup error={error ? error : undefined}>
        <EmojiIcon>😕</EmojiIcon>
        {error}
      </ErrorPopup>
    </Container>
  );
};

// Экспорт типов для удобства
export type NumberInputComponent = typeof NumberInput;