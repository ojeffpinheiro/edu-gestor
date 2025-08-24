import React from 'react'
import { MetricCard, MetricsContainer } from './Features/styles/QuestionViewStyles';

interface MetricsDisplayProps {
  metrics: Array<{ label: string; value: number | string; icon?: React.ReactNode }>;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ metrics }) => (
  <MetricsContainer>
    {metrics.map((metric, index) => (
      <MetricCard key={index}>
        {metric.icon && <span>{metric.icon}</span>}
        <span>{metric.label}:</span>
        <span>{metric.value}</span>
      </MetricCard>
    ))}
  </MetricsContainer>
);

export default MetricsDisplay;