import React, { useState } from 'react';
import { ExamGenerationParams, Question } from '../../services/examsService';
import { Input, Label } from '../../styles/inputs';
import { Card, FormGroup } from '../../pages/Exam/styles';
import { FaLock } from 'react-icons/fa';
import QuestionManager from './QuestionManager/QuestionManager';
import Modal from '../modals/Modal';

interface ExamSpecificProps {
  examParams: ExamGenerationParams;
  isLoading: boolean;
  pass: string;
  questions: Question[];
  selectedQuestionIds: string[];
  setSelectedQuestionIds: (ids: string[]) => void;
  generateSpecificExam: (title: string, password?: string) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

const ExamSpecific: React.FC<ExamSpecificProps> = ({
  examParams,
  isLoading,
  pass,
  questions,
  selectedQuestionIds,
  setSelectedQuestionIds,
  generateSpecificExam,
  onClose,
  isOpen
}) => {
  const [title, setTitle] = useState<string>(examParams.title || '');
  const [password, setPassword] = useState<string>(pass || '');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      title: 'Informações da Prova',
      content: (
        <>
          <FormGroup>
            <Label>Título da Prova</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Prova de Matemática - 1º Bimestre"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaLock size={12} />
              Senha de Proteção (opcional)
            </Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Deixe em branco para não usar senha"
            />
          </FormGroup>
        </>
      ),
      validation: () => title.trim().length > 0
    },
    {
      title: 'Seleção de Questões',
      content: (
        <QuestionManager
          questions={questions}
          selectedIds={selectedQuestionIds}
          onSelectionChange={setSelectedQuestionIds}
          readOnly={false}
          initialTopics={[]}
          onTopicsChange={() => { }}
        />
      ),
      validation: () => selectedQuestionIds.length > 0
    }
  ];

  const handleSubmit = async () => {
    if (isLoading) return;

    try {
      await generateSpecificExam(title, password || undefined);
      onClose();
    } catch (error) {
      console.error('Erro ao gerar prova:', error);
      // Aqui você pode adicionar feedback visual para o usuário
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Criar Prova com Questões Específicas"
      onClose={onClose}
      onSubmit={handleSubmit}
      size='sm'>
      <Card>
        {steps[currentStep].content}

        {currentStep === 1 && (
          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <strong>{selectedQuestionIds.length}</strong> questão{selectedQuestionIds.length !== 1 ? 's' : ''} selecionada{selectedQuestionIds.length !== 1 ? 's' : ''}
          </div>
        )}
      </Card>
    </Modal>
  );
};

export default ExamSpecific;