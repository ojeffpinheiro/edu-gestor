import React from 'react';
import styled from 'styled-components';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { PerformancePrediction } from '../../hooks/assessment/useStrategicData';

const PredictionCard = styled.div<{ riskLevel: string }>`
  padding: var(--space-md);
  margin-bottom: var(--space-sm);
  border-radius: var(--border-radius-md);
  background: ${({ riskLevel }) => 
    riskLevel === 'critical' ? 'rgba(var(--color-error-rgb), 0.1)' :
    riskLevel === 'high' ? 'rgba(var(--color-warning-rgb), 0.1)' :
    'var(--color-background-secondary)'};
  border-left: 4px solid ${({ riskLevel }) => 
    riskLevel === 'critical' ? 'var(--color-error)' :
    riskLevel === 'high' ? 'var(--color-warning)' :
    'var(--color-border)'};
`;

const StudentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-xs);
`;

const PredictionTrend = styled.div<{ isImproving: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ isImproving }) => isImproving ? 'var(--color-success)' : 'var(--color-error)'};
`;

interface PredictionsPanelProps {
  predictions: PerformancePrediction[];
  onSelectStudent?: (studentId: string) => void;
}

export const PredictionsPanel: React.FC<PredictionsPanelProps> = ({ 
  predictions, 
  onSelectStudent 
}) => {
  return (
    <div>
      {predictions.slice(0, 5).map(pred => {
        const isImproving = pred.predictedScore > pred.currentScore;
        const diff = pred.predictedScore - pred.currentScore;
        
        return (
          <PredictionCard 
            key={pred.studentId}
            riskLevel={pred.riskLevel}
            onClick={() => onSelectStudent?.(pred.studentId)}
          >
            <StudentInfo>
              <div>
                <strong>{pred.studentName}</strong> ({pred.className})
              </div>
              <PredictionTrend isImproving={isImproving}>
                {isImproving ? <FiTrendingUp /> : <FiTrendingDown />}
                {diff > 0 ? '+' : ''}{diff.toFixed(1)} pts
              </PredictionTrend>
            </StudentInfo>
            <div>Atual: {pred.currentScore.toFixed(1)} → Previsto: {pred.predictedScore.toFixed(1)}</div>
            <div>Confiança: {pred.confidence.toFixed(1)}%</div>
            <div>
              <strong>Fatores:</strong> {pred.keyFactors.slice(0, 2).join(', ')}
            </div>
          </PredictionCard>
        );
      })}
    </div>
  );
};