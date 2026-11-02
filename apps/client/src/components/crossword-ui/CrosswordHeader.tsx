import styled from '@emotion/styled';

const Container = styled.div({
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '16px',
  textAlign: 'center' as const,
  borderRadius: '8px',
  marginBottom: '16px',
  boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
});

const Title = styled.h2({
  fontSize: '24px',
  margin: '0 0 8px 0',
  fontWeight: 'bold' as const,
});

const Subtitle = styled.p({
  fontSize: '16px',
  margin: 0,
  opacity: 0.9,
});

export interface CrosswordHeaderProps {
  title?: string;
  subtitle?: string;
}

export const CrosswordHeader = ({ 
  title = "🐱 Котик в мире арифметики",
  subtitle = "Решайте примеры и заполняйте кроссворд!"
}: CrosswordHeaderProps) => (
  <Container>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </Container>
);