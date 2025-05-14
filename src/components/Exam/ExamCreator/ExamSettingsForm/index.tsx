import React from 'react';
import { FiArrowRight, FiSettings } from 'react-icons/fi';
import {
  ExamForm,
  FormSection,
  SectionTitle,
  InputGroup,
  ResponsiveWrapper
} from './styles';
import { Exam } from '../../../../utils/types/Exam';
import { ButtonGroup } from '../../../../pages/Exam/Subpages/ExamGenerator/styles';
import { Label, Switch, SwitchRow } from '../../../../styles/inputs';

interface ExamSettingsFormProps {
  examData: Exam;
  onDataChange: (data: Exam) => void;
  onTotalQuestionsChange: (value: number) => void;
  onNext: () => void;
  isFormValid: boolean;
}

const ExamSettingsForm: React.FC<ExamSettingsFormProps> = ({
  examData,
  onDataChange,
  onTotalQuestionsChange,
  onNext,
  isFormValid
}) => {

  const handleInputChange = (field: keyof Exam, value: string | Date | boolean | File) => {
    onDataChange({ ...examData, [field]: value });
  };

  return (
    <ExamForm>
      <FormSection>
        <SectionTitle>
          <FiSettings />
          <h3>Informações Básicas</h3>
        </SectionTitle>

        <ResponsiveWrapper>
          <InputGroup>
            <label htmlFor="exam-title">Nome da Prova</label>
            <input
              id="exam-title"
              type="text"
              value={examData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ex: Prova de Matemática - 1º Bimestre"
              required
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="exam-discipline">Disciplina</label>
            <select
              id="exam-discipline"
              value={examData.discipline}
              onChange={(e) => handleInputChange('discipline', e.target.value)}
              required
            >
              <option value="">Selecione uma disciplina</option>
              <option value="math">Matemática</option>
              <option value="portuguese">Português</option>
              <option value="science">Ciências</option>
              <option value="history">História</option>
            </select>
          </InputGroup>
        </ResponsiveWrapper>

        <ResponsiveWrapper>
          <InputGroup>
            <label htmlFor="teacher-name">Nome do Professor</label>
            <input
              id="teacher-name"
              type="text"
              value={examData.createdBy || ''}
              onChange={(e) => handleInputChange('createdBy', e.target.value)}
              placeholder="Nome do professor"
            />
          </InputGroup>
        </ResponsiveWrapper>

        <ResponsiveWrapper>
          <SwitchRow>
            <Switch>
              <input
                id="show-answerGrid"
                type="checkbox"
                checked={examData.showAnswerGrid}
                onChange={(e) => handleInputChange('showAnswerGrid', e.target.checked)}
              />
              <span></span>
            </Switch>
            <Label>Incluir grade de respostas</Label>
          </SwitchRow>
        </ResponsiveWrapper>

        <ResponsiveWrapper>
          <InputGroup>
            <label htmlFor="exam-description">Descrição</label>
            <textarea
              id="exam-description"
              value={examData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descreva o propósito ou conteúdo da prova"
              rows={3}
            />
          </InputGroup>
        </ResponsiveWrapper>

        <InputGroup>
          <Label>Layout das questões</Label>
          <SwitchRow>
            <Switch>
              <input
                id="question-layout"
                type="checkbox"
                name="questionLayout"
                value="list"
                checked={examData.questionLayout === 'list'}
                onChange={() => handleInputChange('questionLayout', 'list')}
              />
              <span></span>
            </Switch>
            <Label>Lista (uma coluna)</Label>

            <Switch>
              <input
                id="question-layout"
                type="checkbox"
                name="questionLayout"
                value="grid"
                checked={examData.questionLayout === 'grid'}
                onChange={() => handleInputChange('questionLayout', 'grid')}
              />
              <span></span>
            </Switch>
            <Label>Grade (duas colunas)</Label>
          </SwitchRow>
        </InputGroup>

        <ResponsiveWrapper>
          <InputGroup>
            <label htmlFor="exam-questions">Total de Questões</label>
            <input
              id="exam-questions"
              type="number"
              value={examData.totalQuestions}
              onChange={(e) => onTotalQuestionsChange(parseInt(e.target.value) || 0)}
              min="1"
              required
            />
          </InputGroup>
        </ResponsiveWrapper>
      </FormSection>

      <ButtonGroup>
        <button
          type="button"
          onClick={onNext}
          disabled={!isFormValid}
          aria-label="Próxima etapa"
          title={!isFormValid ? "Preencha o título e a disciplina para continuar" : ""}
        >
          Próximo <FiArrowRight />
        </button>
      </ButtonGroup>
    </ExamForm>
  );
};

export default ExamSettingsForm;