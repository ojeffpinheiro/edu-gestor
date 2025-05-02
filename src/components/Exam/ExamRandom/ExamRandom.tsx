// src/components/Exam/ExamRandom.tsx
import React, { useState, useEffect } from 'react';
import { ExamGenerationParams } from '../../../services/examsService';
import { FaLock } from 'react-icons/fa';
import { useExam } from '../../../contexts/ExamContext';
import { Input, Label, Select } from '../../../styles/inputs';
import { StepContent, CheckboxGroup, DifficultySlider, DifficultySliders, FormGroup, Summary, TotalQuestions } from './styles';
import { Checkbox } from '../../Events/EventCreationStyle';
import StepFormModal from '../../modals/StepFormModal';

interface ExamRandomProps {
  examParams: ExamGenerationParams;
  setExamParams: (params: Partial<ExamGenerationParams>) => void;
  generateRandomExams: () => Promise<void>;
  isLoading: boolean;
  onClose: () => void;
}

const ExamRandom: React.FC<ExamRandomProps> = ({
  examParams,
  setExamParams,
  generateRandomExams,
  isLoading,
  onClose
}) => {
  const { questions } = useExam();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);

  useEffect(() => {
    // Extrair tópicos únicos das questões
    const topics = [...new Set(questions.map(q => q.topic))];
    setAvailableTopics(topics);
  }, [questions]);

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setExamParams({ ...examParams, topics: selectedOptions });
  };

  const handleDifficultyDistributionChange = (difficulty: 'easy' | 'medium' | 'hard', value: number) => {
    if (!examParams.difficultyDistribution) return;

    const newDistribution = {
      ...examParams.difficultyDistribution,
      [difficulty]: value
    };

    setExamParams({
      ...examParams,
      difficultyDistribution: newDistribution,
      questionsPerExam: newDistribution.easy + newDistribution.medium + newDistribution.hard
    });
  };

  const steps = [
    {
      stepTitle: 'Informações Básicas',
      stepContent: (
        <StepContent>
          <FormGroup>
            <Label>Título da Prova</Label>
            <Input
              type="text"
              value={examParams.title}
              onChange={(e) => setExamParams({ ...examParams, title: e.target.value })}
              placeholder="Ex: Prova de Matemática - 1º Bimestre"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Prefixo do Título (para múltiplas provas)</Label>
            <Input
              type="text"
              value={examParams.titlePrefix || ''}
              onChange={(e) => setExamParams({ ...examParams, titlePrefix: e.target.value })}
              placeholder="Ex: Turma A -"
            />
          </FormGroup>

          <FormGroup>
            <Label>Número de Provas</Label>
            <Input
              type="number"
              min="1"
              max="10"
              value={examParams.numberOfExams}
              onChange={(e) => setExamParams({ ...examParams, numberOfExams: parseInt(e.target.value) })}
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
              value={examParams.password || ''}
              onChange={(e) => setExamParams({ ...examParams, password: e.target.value })}
              placeholder="Deixe em branco para não usar senha"
            />
          </FormGroup>
        </StepContent>
      ),
      validationHandler: () =>
        examParams.title.trim().length > 0 &&
        examParams.numberOfExams > 0
    },
    {
      stepTitle: 'Configuração de Questões',
      stepContent: (
        <StepContent>
          <FormGroup>
            <Label>Tópicos</Label>
            <Select
              multiple
              value={examParams.topics}
              onChange={handleTopicChange}
              style={{ height: '150px' }}
            >
              {availableTopics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </Select>
            <small>Mantenha vazio para incluir todos os tópicos</small>
          </FormGroup>

          <FormGroup>
            <Label>Distribuição de Dificuldade</Label>
            <DifficultySliders>
              <DifficultySlider>
                <Label>Fácil: {examParams.difficultyDistribution?.easy || 0}</Label>
                <Input
                  type="range"
                  min="0"
                  max="20"
                  value={examParams.difficultyDistribution?.easy || 0}
                  onChange={(e) => handleDifficultyDistributionChange('easy', parseInt(e.target.value))}
                />
              </DifficultySlider>

              <DifficultySlider>
                <Label>Média: {examParams.difficultyDistribution?.medium || 0}</Label>
                <Input
                  type="range"
                  min="0"
                  max="20"
                  value={examParams.difficultyDistribution?.medium || 0}
                  onChange={(e) => handleDifficultyDistributionChange('medium', parseInt(e.target.value))}
                />
              </DifficultySlider>

              <DifficultySlider>
                <Label>Difícil: {examParams.difficultyDistribution?.hard || 0}</Label>
                <Input
                  type="range"
                  min="0"
                  max="20"
                  value={examParams.difficultyDistribution?.hard || 0}
                  onChange={(e) => handleDifficultyDistributionChange('hard', parseInt(e.target.value))}
                />
              </DifficultySlider>
            </DifficultySliders>
            <TotalQuestions>
              Total de questões por prova: <strong>{examParams.questionsPerExam}</strong>
            </TotalQuestions>
          </FormGroup>
        </StepContent>
      ),
      validation: () => {
        const totalQuestions = (examParams.difficultyDistribution?.easy || 0) +
          (examParams.difficultyDistribution?.medium || 0) +
          (examParams.difficultyDistribution?.hard || 0);
        return totalQuestions > 0;
      }
    },
    {
      stepTitle: 'Opções Adicionais',
      stepContent: (
        <StepContent>
          <CheckboxGroup>
            <Label>
              <Checkbox
                type="checkbox"
                checked={examParams.shuffleQuestions || false}
                onChange={(e) => setExamParams({ ...examParams, shuffleQuestions: e.target.checked })}
              />
              Embaralhar questões
            </Label>
          </CheckboxGroup>

          <CheckboxGroup>
            <Label>
              <Checkbox
                type="checkbox"
                checked={examParams.shuffleOptions || false}
                onChange={(e) => setExamParams({ ...examParams, shuffleOptions: e.target.checked })}
              />
              Embaralhar alternativas
            </Label>
          </CheckboxGroup>

          <Summary>
            <h3>Resumo</h3>
            <p><strong>Provas:</strong> {examParams.numberOfExams}</p>
            <p><strong>Questões por prova:</strong> {examParams.questionsPerExam}</p>
            <p><strong>Tópicos:</strong> {examParams.topics?.length ? examParams.topics.join(', ') : 'Todos'}</p>
            <p><strong>Dificuldade:</strong> Fácil ({examParams.difficultyDistribution?.easy || 0}),
              Média ({examParams.difficultyDistribution?.medium || 0}),
              Difícil ({examParams.difficultyDistribution?.hard || 0})</p>
          </Summary>
        </StepContent>
      ),
      validation: () => true
    }
  ];

  const handleStepChange = (step: number) => {
    setCurrentStep(step + 1);
  }

  const handleSubmit = async () => {
    if (isLoading) return;

    try {
      await generateRandomExams();
      onClose();
    } catch (error) {
      console.error('Erro ao gerar provas:', error);
    }
  };

  return (
    <StepFormModal
      modalTitle='Gerar Provas Aleatórias'
      isModalOpen={!!examParams}
      steps={steps}
      currentActiveStep={currentStep}
      isSubmitDisabled={isLoading || currentStep === 3 ? !(steps[currentStep].validation?.() ?? true) : false}
      modalSize='md'
      shouldHideNavigation={currentStep === 1 ? false : true}
      onStepChange={handleStepChange}
      onModalClose={onClose}
      onSubmitHandler={handleSubmit}
      submitButtonText={isLoading ? 'Gerando...' : 'Gerar Provas'}
    />
  );
};

export default ExamRandom;