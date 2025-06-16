import React from 'react';
import Spinner from '../ui/Spinner';
import { ErrorMessage } from '../../styles/feedback';

interface AsyncWrapperProps {
  loading: boolean;
  error: Error | null;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

const AsyncWrapper: React.FC<AsyncWrapperProps> = ({
  loading,
  error,
  children,
  loadingComponent,
  errorComponent
}) => {
  if (loading) {
    return loadingComponent || (
      <div className="async-loading">
        <Spinner size="large" />
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return errorComponent || (
      <ErrorMessage>
        <h3>Erro ao carregar</h3>
        <p>{error.message}</p>
      </ErrorMessage>
    );
  }

  return <>{children}</>;
};

export default AsyncWrapper;