import React from 'react';
import styled from 'styled-components';

interface LoadingIndicatorProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingContainer = styled.div<{ size: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.size === 'small' ? '8px' : 
             props.size === 'medium' ? '16px' : '32px'};
  text-align: center;
`;

const SpinnerContainer = styled.div<{ size: string }>`
  width: ${props => props.size === 'small' ? '24px' : 
                     props.size === 'medium' ? '40px' : '64px'};
  height: ${props => props.size === 'small' ? '24px' : 
                      props.size === 'medium' ? '40px' : '64px'};
  margin-bottom: 16px;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 100%;
  height: 100%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingMessage = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`;

/**
 * Componente de indicador de carregamento reutilizável
 * @param message Mensagem opcional para exibir durante o carregamento
 * @param size Tamanho do indicador de carregamento ('small', 'medium', 'large')
 */
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = 'Carregando...', 
  size = 'medium' 
}) => {
  return (
    <LoadingContainer size={size} role="alert" aria-busy="true">
      <SpinnerContainer size={size}>
        <Spinner />
      </SpinnerContainer>
      {message && <LoadingMessage>{message}</LoadingMessage>}
    </LoadingContainer>
  );
};

export default LoadingIndicator;