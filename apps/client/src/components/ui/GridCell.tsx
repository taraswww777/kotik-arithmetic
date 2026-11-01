import styled from '@emotion/styled';

const BASE_STYLES = {
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  fontSize: '32px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  '@media (max-width: 600px)': {
    width: '50px',
    height: '50px',
    fontSize: '28px',
  },
};

export const GridCellEmpty = styled.div(BASE_STYLES, {
  backgroundColor: '#fafafa',
  border: '2px dashed #ccc',
  color: 'transparent',
  '&:hover': {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
});

export const GridCellFilled = styled.div(BASE_STYLES, {
  backgroundColor: '#4CAF50',
  color: 'white',
  boxShadow: '0 4px 6px rgba(76, 175, 80, 0.3)',
  '&:hover': {
    backgroundColor: '#45a049',
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
});

export const GridCellCorrect = styled.div(BASE_STYLES, {
  backgroundColor: '#8bc34a',
  color: 'white',
  boxShadow: '0 4px 6px rgba(139, 195, 74, 0.3)',
});

export const GridCellIncorrect = styled.div(BASE_STYLES, {
  backgroundColor: '#f44336',
  color: 'white',
  boxShadow: '0 4px 6px rgba(244, 67, 54, 0.3)',
});

export const GridCellBorder = styled.div(BASE_STYLES, {
  backgroundColor: '#ffffff',
  border: '2px solid #4CAF50',
  color: '#212121',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

export const Grid = styled.div({
  display: 'grid',
  gap: '4px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  margin: '0 auto',
});