import React from 'react';
import styled from 'styled-components';

interface MetricComparisonProps {
  label: string;
  currentValue: number;
  targetValue?: number;
  isPercentage?: boolean;
  difference?: number;
}

const ComparisonItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Value = styled.span<{ isBetter?: boolean }>`
  color: ${({ isBetter }) => isBetter ? 'var(--color-success)' : 'var(--color-error)'};
`;

const MetricComparison: React.FC<MetricComparisonProps> = ({
  label,
  currentValue,
  targetValue,
  isPercentage = false,
}) => {
  const difference = targetValue !== undefined ? currentValue - targetValue : undefined;
  const isBetter = difference !== undefined ? difference >= 0 : undefined;

  return (
    <ComparisonItem>
      <span>{label}:</span>
      <div>
        <span>{currentValue.toFixed(1)}{isPercentage ? '%' : ''}</span>
        {difference !== undefined && (
          <Value isBetter={isBetter}>
            {' '}({difference > 0 ? '+' : ''}{difference.toFixed(1)})
          </Value>
        )}
      </div>
    </ComparisonItem>
  );
};

export default MetricComparison;