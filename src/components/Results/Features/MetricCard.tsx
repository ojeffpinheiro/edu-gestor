// components/MetricCard.tsx
import React from 'react';
import styled from 'styled-components';
import { Card, CardContent } from '../../ui/Card';

const MetricContainer = styled(Card)`
  min-height: 120px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Title = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-muted-foreground);
`;

const IconWrapper = styled.div`
  color: var(--color-muted-foreground);
  font-size: 1rem;
`;

const Value = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-card-foreground);
  margin-bottom: 0.25rem;
`;

const Trend = styled.div<{ $isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: ${({ $isPositive }) => 
    $isPositive ? 'var(--color-accent)' : 'var(--color-destructive)'};
`;

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  trend = 'up'
}) => {
  return (
    <MetricContainer>
      <CardContent>
        <HeaderRow>
          <Title>{title}</Title>
          <IconWrapper>{icon}</IconWrapper>
        </HeaderRow>
        <Value>{value}</Value>
        <Trend $isPositive={trend === 'up'}>
          {trend === 'up' ? '↗' : '↘'} {change}
        </Trend>
      </CardContent>
    </MetricContainer>
  );
};