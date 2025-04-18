import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

// Styled components for error display
const ErrorContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  color: #b71c1c;
`;

const ErrorTitle = styled.h4`
  margin-top: 0;
  font-size: 1rem;
  font-weight: 500;
`;

const ErrorMessage = styled.p`
  margin-bottom: 0.5rem;
`;

const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ef5350;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    background-color: #e53935;
  }
`;

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors in its child component tree and displays a fallback UI
 * instead of crashing the whole application.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <ErrorContainer role="alert">
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            {this.state.error?.message || 'An unexpected error occurred'}
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            Try Again
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}