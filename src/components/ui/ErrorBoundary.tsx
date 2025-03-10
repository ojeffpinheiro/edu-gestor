import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Componente ErrorBoundary para capturar erros em componentes filhos
 * e exibir uma UI alternativa em caso de falha
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Atualiza o estado para que a próxima renderização mostre a UI alternativa
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Poderia registrar o erro em um serviço de monitoramento
    console.error('Error Boundary capturou um erro:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Renderiza o fallback em caso de erro
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary