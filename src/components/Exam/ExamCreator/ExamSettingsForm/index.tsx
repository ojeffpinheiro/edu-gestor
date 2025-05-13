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
            <label htmlFor="headerStyle">Tipo de Cabeçalho</label>
            <select
              id="headerStyle"
              value={examData.headerStyle}
              onChange={(e) => handleInputChange('headerStyle', e.target.value)}
              required
            >
              <option value="">Selecione uma tipo</option>
              <option value="standard">Simplificado</option>
              <option value="simplified">Padrão</option>
              <option value="custom">Personalizado</option>
            </select>
          </InputGroup>

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

        {examData.headerStyle === 'custom' && (
          <InputGroup>
            <label htmlFor="school-logo">Logotipo da Escola (Recomendado: 300x100px)</label>
            <input
              id="school-logo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleInputChange('institutionLogo', e.target.files[0]);
                }
              }}
            />
          </InputGroup>
        )}

        <ResponsiveWrapper>
          <InputGroup>
            <label htmlFor="school-name">Nome da Escola</label>
            <input
              id="school-name"
              type="text"
              value={examData.schoolName}
              onChange={(e) => handleInputChange('schoolName', e.target.value)}
              placeholder="Nome da instituição"
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="school-subtitle">Informação Adicional</label>
            <input
              id="school-subtitle"
              type="text"
              value={examData.schoolSubtitle}
              onChange={(e) => handleInputChange('schoolSubtitle', e.target.value)}
              placeholder="Ex: Ensino Médio"
            />
          </InputGroup>
        </ResponsiveWrapper>

        <ResponsiveWrapper>
          <SwitchRow>
            <Switch>
              <input
                id="with-grade-space"
                type="checkbox"
                checked={examData.withGradeSpace}
                onChange={(e) => handleInputChange('withGradeSpace', e.target.checked)}
              />
              <span></span>
            </Switch>
            <Label>Incluir espaço para nota</Label>
          </SwitchRow>
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
            <label htmlFor="exam-date">Data de Aplicação</label>
            <input
              id="exam-date"
              type="date"
              value={examData.applicationDate.toISOString().split('T')[0]}
              onChange={(e) => handleInputChange('applicationDate', new Date(e.target.value))}
              required
            />
          </InputGroup>

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