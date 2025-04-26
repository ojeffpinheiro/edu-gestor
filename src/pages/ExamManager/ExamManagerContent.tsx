import React from 'react';
import { FaPlus } from 'react-icons/fa';

import useExamManager from '../../hooks/useExamManager';
import ExamCardComponent from '../../components/Exam/ExamCard';
import ExamEmptyState from '../../components/Exam/ExamEmptyState';
import ExamModals from '../../components/modals/ExamModals';

import { Button } from '../../styles/buttons';
import {
  ExamManagerContainer,
  Header,
  Title,
  ActionsContainer,
  ExamsGrid
} from './styles';
import { ErrorBoundary } from '../../components/ui/ErrorBoundary';
import LoadingIndicator from '../../components/shared/LoadingIndicator';

/**
 * Conteúdo principal do gerenciador de exames
 */
const ExamManagerContent: React.FC = () => {
  const {
    activeModalType,
    selectedExam,
    examList,
    isLoading,
    errorMessage,
    modalManager,
    handleExamCreation,
    handleExamUpdate,
    handleVariantGeneration,
    handleDataReset
  } = useExamManager();

  // Renderização condicional para estados de carregamento e erro
  if (isLoading) {
    return <LoadingIndicator message="Carregando exames..." />;
  }

  if (errorMessage) {
    return (
      <div className="error-container">
        <h2>Erro</h2>
        <p>{errorMessage}</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Algo deu errado. Por favor, recarregue a página.</div>}>
      <ExamManagerContainer>
        <Header>
          <Title>Gerenciamento de Exames</Title>
          <ActionsContainer>
            <Button
              variant="secondary"
              onClick={handleDataReset}
              aria-label="Resetar todos os dados"
              data-testid="reset-data-button"
            >
              Resetar Dados
            </Button>

            <Button
              variant="primary"
              onClick={() => modalManager.open('create')}
              aria-label="Criar um novo exame"
              data-testid="create-exam-button"
            >
              <FaPlus /> Criar Exame
            </Button>
          </ActionsContainer>
        </Header>

        {examList.length > 0 ? (
          <ExamsGrid data-testid="exams-grid">
            {examList.map((exam) => (
              <ExamCardComponent
                key={exam.id}
                exam={exam}
                onOpenSecuritySettings={() => modalManager.open('security', exam)}
                onOpenVariantGenerator={() => modalManager.open('variants', exam)}
              />
            ))}
          </ExamsGrid>
        ) : (
          <ExamEmptyState onCreateExam={() => modalManager.open('create')} />
        )}

        <ExamModals
          modalType={activeModalType}
          onExamCreated={handleExamCreation}
          selectedExam={selectedExam}
          onClose={modalManager.close}
          onExamUpdated={handleExamUpdate}
          onVariantsGenerated={handleVariantGeneration}
        />
      </ExamManagerContainer>
    </ErrorBoundary>
  );
};

export default ExamManagerContent;