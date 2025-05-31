// MetricCard.tsx
import React from 'react';
import DashboardCard from '../DashboardCard';

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  className?: string;
  change?: number;
  subtext?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  className = '',
  change,
  subtext
}) => {
  return (
    <DashboardCard title={title} className={`metric-card ${className}`}>
      <div className="metric-value">
        {value}
        {unit && <span className="metric-unit">{unit}</span>}
        {change !== undefined && (
          <span className="metric-change">
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      {subtext && <div className="metric-subtext">{subtext}</div>}
    </DashboardCard>
  );
};

export default MetricCard;