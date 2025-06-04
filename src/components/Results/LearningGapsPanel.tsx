import React from 'react';
import styled from 'styled-components';
import { FiAlertTriangle, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { LearningGap } from '../../hooks/useStrategicData';

const GapCard = styled.div<{ severity: 'critical' | 'high' | 'medium' | 'low' }>`
  padding: var(--space-md);
  margin-bottom: var(--space-sm);
  border-radius: var(--border-radius-md);
  background: ${({ severity }) => 
    severity === 'critical' ? 'rgba(var(--color-error-rgb), 0.1)' :
    severity === 'high' ? 'rgba(var(--color-warning-rgb), 0.1)' :
    'var(--color-background-secondary)'};
  border-left: 4px solid ${({ severity }) => 
    severity === 'critical' ? 'var(--color-error)' :
    severity === 'high' ? 'var(--color-warning)' :
    'var(--color-border)'};
`;

const GapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xs);
`;

const GapTitle = styled.h4`
  margin: 0;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

const GapPercentage = styled.span<{ severity: string }>`
  font-weight: bold;
  color: ${({ severity }) => 
    severity === 'critical' ? 'var(--color-error)' :
    severity === 'high' ? 'var(--color-warning)' :
    'var(--color-text-secondary)'};
`;

interface LearningGapsPanelProps {
  gaps: LearningGap[];
  onSelectSkill?: (skill: string) => void;
}

export const LearningGapsPanel: React.FC<LearningGapsPanelProps> = ({ gaps, onSelectSkill }) => {
  const getIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <FiAlertTriangle />;
      case 'high': return <FiAlertCircle />;
      default: return <FiInfo />;
    }
  };

  return (
    <div>
      {gaps.slice(0, 5).map(gap => (
        <GapCard 
          key={gap.skill}
          severity={gap.priority}
          onClick={() => onSelectSkill?.(gap.skill)}
        >
          <GapHeader>
            <GapTitle>
              {getIcon(gap.priority)}
              {gap.skill} ({gap.category})
            </GapTitle>
            <GapPercentage severity={gap.priority}>
              {gap.gapPercentage.toFixed(1)}% gap
            </GapPercentage>
          </GapHeader>
          <p>Alunos afetados: {gap.affectedStudents} ({gap.affectedClasses} turmas)</p>
          <p>Média: {gap.averageScore.toFixed(1)}%</p>
          <div>
            <strong>Recomendações:</strong>
            <ul>
              {gap.recommendations.slice(0, 3).map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </GapCard>
      ))}
    </div>
  );
};