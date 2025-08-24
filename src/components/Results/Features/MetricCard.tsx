import React from 'react';
import { CardContent } from '../../ui/Card';
import {
  HeaderRow,
  IconWrapper,
  MetricContainer,
  Title,
  Trend,
  Value,
} from '../styles/Analytics';
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

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
          {trend === "up" ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
          {change}
        </Trend>
      </CardContent>
    </MetricContainer>
  );
};