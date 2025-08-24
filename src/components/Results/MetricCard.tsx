import React from 'react';
import styled from 'styled-components';

const MetricCardContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || '#667eea'};
  }
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const MetricTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const IconContainer = styled.div<{ bgColor?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.bgColor || 'rgba(102, 126, 234, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const MetricUnit = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  margin-left: 0.25rem;
`;

const MetricTrend = styled.div`
  font-size: 0.875rem;
  color: #10b981;
  font-weight: 500;
`;

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  trend?: string;
  change?: string;
}

/**
 * Componente de cartão para exibição de métricas com ícone, valor e tendência.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.title - Título da métrica
 * @param {string | number} props.value - Valor da métrica
 * @param {string} [props.unit] - Unidade de medida (opcional)
 * @param {React.ReactNode} props.icon - Ícone associado à métrica
 * @param {string} props.color - Cor da borda superior (hex, rgb, etc)
 * @param {string} props.bgColor - Cor de fundo do ícone
 * @param {string} [props.trend] - Texto de tendência (opcional)
 * @returns {JSX.Element} Cartão de métrica estilizado
 * 
 * @example
 * <MetricCard
 *   title="Média da Turma"
 *   value={7.5}
 *   unit="pts"
 *   icon={<FiTrendingUp />}
 *   color="#10b981"
 *   bgColor="rgba(16, 185, 129, 0.1)"
 *   trend="↗ 2.3 pts"
 * />
 */
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon,
  color,
  bgColor,
  trend,
  change
}) => (
  <MetricCardContent color={color}>
    <MetricHeader>
      <MetricTitle>{title}</MetricTitle>
      <IconContainer bgColor={bgColor}>
        {icon}
      </IconContainer>
    </MetricHeader>
    <MetricValue>
      {value}
      {unit && <MetricUnit>{unit}</MetricUnit>}
    </MetricValue>
    {trend && <MetricTrend>{trend}</MetricTrend>}
    {change && ( // ✅ Adicione esta linha para exibir o change
      <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
        {change}
      </div>
    )}
  </MetricCardContent>
);

export default MetricCard;