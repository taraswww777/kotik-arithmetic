import styled from '@emotion/styled';

export const TextField = styled.input({
  padding: '16px',
  fontSize: '20px',
  borderRadius: '12px',
  border: '3px solid #4CAF50',
  backgroundColor: '#ffffff',
  color: '#212121',
  outline: 'none',
  transition: 'border-color 0.3s ease',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  '@media (max-width: 600px)': {
    padding: '12px',
    fontSize: '18px',
  },
  '&::placeholder': {
    color: '#9e9e9e',
  },
  '&:focus': {
    borderColor: '#45a049',
    boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)',
  },
  '&:invalid': {
    borderColor: '#f44336',
  },
  '&:valid': {
    borderColor: '#8bc34a',
  },
});

export const TextArea = styled.textarea({
  padding: '16px',
  fontSize: '20px',
  borderRadius: '12px',
  border: '3px solid #4CAF50',
  backgroundColor: '#ffffff',
  color: '#212121',
  outline: 'none',
  transition: 'border-color 0.3s ease',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  resize: 'vertical',
  minHeight: '100px',
  '@media (max-width: 600px)': {
    padding: '12px',
    fontSize: '18px',
  },
  '&::placeholder': {
    color: '#9e9e9e',
  },
  '&:focus': {
    borderColor: '#45a049',
    boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)',
  },
});

export const ErrorText = styled.span({
  color: '#f44336',
  fontSize: '16px',
  marginTop: '4px',
  display: 'block',
});