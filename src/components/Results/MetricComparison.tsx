import React from 'react';
import ProgressBadge from './ProgressBadge';

interface MetricComparisonProps {
  label: string;
  value: number;
  difference: number;
  isPercentage: boolean;
}

const MetricComparison: React.FC<MetricComparisonProps> = ({ 
  label, 
  value, 
  difference,
  isPercentage 
}) => {
  return (
    <div className="metric-comparison">
      <span className="comparison-label">{label}:</span>
      <span className="comparison-value">{value.toFixed(1)}{isPercentage ? '%' : ''}</span>
      <ProgressBadge 
        value={difference} 
        isPercentage={isPercentage}
        threshold={0.5}
      />
    </div>
  );
};

export default MetricComparison;