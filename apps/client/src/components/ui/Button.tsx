import styled from '@emotion/styled';

export const Button = styled.button({
  padding: '16px 32px',
  fontSize: '20px',
  borderRadius: '12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontWeight: 'bold',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  '@media (max-width: 600px)': {
    padding: '12px 24px',
    fontSize: '18px',
  },
  '&:hover': {
    backgroundColor: '#45a049',
  },
  '&:active': {
    backgroundColor: '#3d8b40',
  },
});

export const ButtonSecondary = styled.button({
  padding: '16px 32px',
  fontSize: '20px',
  borderRadius: '12px',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontWeight: 'bold',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  '@media (max-width: 600px)': {
    padding: '12px 24px',
    fontSize: '18px',
  },
  '&:hover': {
    backgroundColor: '#1e88e5',
  },
});

export const ButtonDanger = styled.button({
  padding: '16px 32px',
  fontSize: '20px',
  borderRadius: '12px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontWeight: 'bold',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  '@media (max-width: 600px)': {
    padding: '12px 24px',
    fontSize: '18px',
  },
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});