import React from 'react';
import styled, { css } from 'styled-components';
import { FiAlertTriangle, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { ClassAlert } from '../../hooks/useStrategicData';

const AlertCard = styled.div<{ severity: 'critical' | 'high' | 'medium' | 'low' }>`
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-sm);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  ${({ severity }) => {
    switch (severity) {
      case 'critical':
        return css`
          background: rgba(var(--color-error-rgb), 0.1);
          border-left: 4px solid var(--color-error);
        `;
      case 'high':
        return css`
          background: rgba(var(--color-warning-rgb), 0.1);
          border-left: 4px solid var(--color-warning);
        `;
      default:
        return css`
          background: var(--color-background-secondary);
          border-left: 4px solid var(--color-border);
        `;
    }
  }}

  &:hover {
    transform: translateX(4px);
  }
`;

const AlertIcon = styled.div<{ severity: string }>`
  font-size: 1.5em;
  color: ${({ severity }) => 
    severity === 'critical' ? 'var(--color-error)' :
    severity === 'high' ? 'var(--color-warning)' :
    'var(--color-text-secondary)'};
`;

interface AlertPanelProps {
  alerts: ClassAlert[];
  onSelectClass?: (classId: string) => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, onSelectClass }) => {
  const getIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <FiAlertTriangle />;
      case 'high': return <FiAlertCircle />;
      default: return <FiInfo />;
    }
  };

  return (
    <div>
      {alerts.slice(0, 5).map(alert => (
        <AlertCard 
          key={alert.id}
          severity={alert.severity}
          onClick={() => onSelectClass?.(alert.classId)}
        >
          <AlertIcon severity={alert.severity}>
            {getIcon(alert.severity)}
          </AlertIcon>
          <div>
            <h4>{alert.className}</h4>
            <p>{alert.message}</p>
            <small>{alert.studentsAffected} aluno(s) afetado(s)</small>
          </div>
        </AlertCard>
      ))}
    </div>
  );
};