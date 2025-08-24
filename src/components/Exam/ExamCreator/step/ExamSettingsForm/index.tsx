import React from 'react';
import { FiArrowRight, FiGrid, FiList, FiMinimize2, FiSettings, FiType } from 'react-icons/fi';
import { Exam } from '../../../../../types/evaluation/Exam';

import {
  ActionButtons,
  FormContainer,
  FormSection,
  InputGroup,
  NextButton,
  RadioGroup,
  RadioOption,
  ResponsiveWrapper,
  SectionTitle,
} from './styles'

interface ExamSettingsFormProps {
  examData: Exam;
  onDataChange: (data: Partial<Exam>) => void;
  onNext: () => void;
  isFormValid: boolean;
}

const ExamSettingsForm: React.FC<ExamSettingsFormProps> = ({
  examData,
  isFormValid,
  onDataChange,
  onNext,
}) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    onDataChange({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <FormContainer>
      <h2>Configurações da Prova</h2>
      <p>Preencha as informações básicas para configurar sua prova</p>

      <SectionTitle>
        <FiSettings />
        <h3>Informações Básicas</h3>
      </SectionTitle>

      <ResponsiveWrapper>
        <InputGroup>
          <label htmlFor="title">Nome da Prova *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={examData.title}
            onChange={handleInputChange}
            placeholder="Ex: Prova de Matemática - 1º Bimestre"
            required
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="exam-discipline">Disciplina *</label>
          <select
            id="discipline"
            name="discipline"
            value={examData.discipline}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione uma disciplina</option>
            <option value="math">Matemática</option>
            <option value="portuguese">Português</option>
            <option value="science">Ciências</option>
            <option value="physics">Física</option>
            <option value="chemistry">Química</option>
            <option value="biology">Biologia</option>
            <option value="history">História</option>
            <option value="geography">Geografia</option>
            <option value="english">Inglês</option>
            <option value="arts">Artes</option>
            <option value="philosophy">Filosofia</option>
            <option value="sociology">Sociologia</option>
          </select>
        </InputGroup>
      </ResponsiveWrapper>

      <ResponsiveWrapper>
        <InputGroup>
          <label htmlFor="document-type">Tipo de Documento</label>
          <select
            id="documentType"
            name="documentType"
            value={examData.documentType}
            onChange={handleInputChange}
          >
            <option value="exam">Prova</option>
            <option value="simulation">Simulado</option>
            <option value="worksheet">Lista de Exercícios</option>
            <option value="assignment">Trabalho</option>
          </select>
        </InputGroup>

        <InputGroup>
          <label htmlFor="teacher-name">Nome do Professor</label>
          <input
            id="teacher-name"
            type="text"
            value={examData.createdBy || ''}
            onChange={handleInputChange}
            placeholder="Nome do professor"
          />
        </InputGroup>
      </ResponsiveWrapper>

      <FormSection>
        <h3>Layout da Prova</h3>
        <p>Configure como as questões serão organizadas no documento</p>

        <InputGroup>
          <label>Layout das Questões</label>
          <RadioGroup>
            <RadioOption>
              <input
                type="radio"
                id="layout-list"
                name="questionLayout"
                value="list"
                checked={examData.questionLayout === "list"}
                onChange={handleInputChange}
              />
              <label htmlFor="layout-list">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiList size={20} />
                  <div>
                    <strong>Lista Vertical</strong>
                    <span>Questões em uma única coluna</span>
                  </div>
                </div>
              </label>
            </RadioOption>

            <RadioOption>
              <input
                type="radio"
                id="layout-grid"
                name="questionLayout"
                value="grid"
                checked={examData.questionLayout === "grid"}
                onChange={handleInputChange}
              />
              <label htmlFor="layout-grid">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiGrid size={20} />
                  <div>
                    <strong>Grade</strong>
                    <span>Questões distribuídas em colunas</span>
                  </div>
                </div>
              </label>
            </RadioOption>
          </RadioGroup>
        </InputGroup>

        <ResponsiveWrapper>
          <InputGroup>
            <label htmlFor="compactMode">Modo Compacto</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="compactMode"
                name="compactMode"
                checked={examData.compactMode}
                onChange={handleInputChange}
              />
              <FiMinimize2 size={16} />
              Reduzir espaçamento entre questões
            </label>
          </InputGroup>

          <InputGroup>
            <label htmlFor="showQuestionNumber">Mostrar números das questões</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="showQuestionNumber"
                name="showQuestionNumber"
                checked={examData.showQuestionNumber}
                onChange={handleInputChange}
              />
              <FiType size={16} />
              Exibir numeração automática
            </label>
          </InputGroup>
        </ResponsiveWrapper>
      </FormSection>

      <ActionButtons>
        <NextButton
          type="button"
          onClick={onNext}
          disabled={!isFormValid}
          title={!isFormValid ? "Preencha todos os campos obrigatórios" : ""}
        >
          Próximo <FiArrowRight />
        </NextButton>
      </ActionButtons>
    </FormContainer>
  );
};

export default ExamSettingsForm;