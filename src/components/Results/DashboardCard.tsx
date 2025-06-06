import React from 'react';
import styled from 'styled-components';

interface DashboardCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const StyledCard = styled.div<{ $fullWidth?: boolean }>`
  background: var(--color-card);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: all var(--transition-fast);
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border-light);
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

const CardHeader = styled.div`
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--color-border-light);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: var(--color-background-secondary);
`;

const CardTitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-title-card);
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: var(--space-xs) 0 0;
`;

const CardContent = styled.div`
  padding: var(--space-lg);
  flex: 1;
`;

const CardIcon = styled.div`
  color: var(--color-primary);
  font-size: var(--font-size-xl);
  display: flex;
`;

/**
 * Componente de cartão reutilizável para o dashboard com cabeçalho e conteúdo.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.title - Título do cartão (obrigatório)
 * @param {string} [props.description] - Descrição opcional do cartão
 * @param {React.ReactNode} props.children - Conteúdo principal do cartão
 * @param {boolean} [props.fullWidth=false] - Se o cartão deve ocupar 100% da largura
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {React.ReactNode} [props.icon] - Ícone opcional para o cabeçalho
 * @param {Function} [props.onClick] - Callback para clique no cartão
 * @returns {JSX.Element} Componente de cartão estilizado para dashboard
 * 
 * @example
 * <DashboardCard
 *   title="Desempenho da Turma"
 *   description="Média geral e evolução"
 *   icon={<FiBarChart2 />}
 * >
 *   <PerformanceChart data={data} />
 * </DashboardCard>
 */
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  children,
  fullWidth = false,
  className = '',
  icon,
  onClick
}) => {
  return (
    <StyledCard 
      className={`${className} theme-transition`} 
      $fullWidth={fullWidth}
      onClick={onClick}
      tabIndex={onClick ? 0 : -1}
    >
      <CardHeader>
        {icon && <CardIcon>{icon}</CardIcon>}
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </StyledCard>
  );
};

export default DashboardCard;