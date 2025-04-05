import React from 'react';
import { AssessmentProvider } from '../../contexts/AssessmentContext';
import ExamManagerContent from './ExamManagerContent';

/**
 * Componente principal que encapsula o gerenciador de exames com o provedor de contexto
 */
const ExamManager: React.FC = () => {
  return (
    <AssessmentProvider>
      <ExamManagerContent />
    </AssessmentProvider>
  );
};

export default ExamManager;