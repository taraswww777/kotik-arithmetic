import styled from '@emotion/styled';

export const FilledCell = ({ value }: { value: string }) => (
  <Container>
    <Text>{value}</Text>
  </Container>
);

const Container = styled.div({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '24px',
  boxShadow: '0 4px 6px rgba(76, 175, 80, 0.3)',
  '@media (max-width: 600px)': {
    width: '32px',
    height: '32px',
    fontSize: '20px',
  },
});

const Text = styled.span({
  userSelect: 'none' as const,
});