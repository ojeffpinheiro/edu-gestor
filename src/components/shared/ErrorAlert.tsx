// ErrorAlert.tsx - Componente para exibição de erros
import React from 'react';
import { ErrorAlertProps } from '../../utils/types/planningDashboard';
import { Container } from '../../styles/layoutUtils';

/**
 * Componente que exibe uma mensagem de erro com opção de tentar novamente
 * Fornece feedback claro ao usuário quando ocorre um problema
 */
export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onRetry }) => {
  return (
    <Container>
      <div 
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" 
        role="alert"
        aria-live="assertive"
      >
        <p className="font-bold">Erro</p>
        <p>{message}</p>
        
        {onRetry && (
          <button 
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
            onClick={onRetry}
            aria-label="Tentar novamente"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </Container>
  );
};