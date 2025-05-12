import React from 'react';
import { FiSettings, FiList, FiLock, FiEye } from 'react-icons/fi';

import { ProgressSteps, Step } from './styles'

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, icon: <FiSettings />, label: 'Configurações' },
    { id: 2, icon: <FiList />, label: 'Seleção de Questões' },
    { id: 3, icon: <FiLock />, label: 'Segurança' },
    { id: 4, icon: <FiEye />, label: 'Pré-visualização' }
  ];

  return (
    <ProgressSteps>
      {steps.map(step => (
        <Step
          key={step.id}
          active={currentStep === step.id}
          completed={currentStep > step.id}
        >
          <div className="step-icon">{step.icon}</div>
          <span>{step.label}</span>
        </Step>
      ))}
    </ProgressSteps>
  );
};

export default ProgressIndicator;