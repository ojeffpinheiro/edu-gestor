// components/ProgressBadge.tsx
import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface ProgressBadgeProps {
  value: number;
  isPercentage: boolean;
  threshold?: number;
}

const ProgressBadge: React.FC<ProgressBadgeProps> = ({ value, isPercentage, threshold = 0 }) => {
  const isPositive = value > threshold;
  const isNeutral = value === 0 || (Math.abs(value) <= (threshold || 0));
  
  return (
    <span className={`progress-badge ${isPositive ? 'positive' : isNeutral ? 'neutral' : 'negative'}`}>
      {!isNeutral && (
        isPositive ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />
      )}
      {value > 0 ? '+' : ''}
      {value.toFixed(1)}
      {isPercentage ? '%' : ''}
    </span>
  );
};

export default ProgressBadge;