import React from 'react';
import { FiArrowRight, FiSettings } from 'react-icons/fi';
import { Exam } from '../../../../utils/types/Exam';

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

  const handleSelectionModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({
      selectionMode: e.target.value as 'manual' | 'random'
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
        <h3>Modo de Seleção de Questões</h3>
        <p>Escolha como deseja selecionar as questões para esta prova</p>

        <ResponsiveWrapper>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={examData.shuffleQuestions}
                onChange={handleInputChange}
              />
              Embaralhar questões
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={examData.shuffleAlternatives}
                onChange={handleInputChange}
              />
              Embaralhar alternativas
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={examData.showAnswerGrid}
                onChange={handleInputChange}
              />
              Incluir grade de respostas
            </label>
          </div>
        </ResponsiveWrapper>

        <RadioGroup>
          <RadioOption>
            <input
              type="radio"
              id="selection-manual"
              name="selectionMode"
              value="manual"
              checked={examData.selectionMode === "manual"}
              onChange={handleSelectionModeChange}
            />
            <label htmlFor="selection-manual">
              <strong>Seleção Manual</strong>
              <span>Você escolherá cada questão individualmente</span>
            </label>
          </RadioOption>

          <RadioOption>
            <input
              type="radio"
              id="selection-random"
              name="selectionMode"
              value="random"
              checked={examData.selectionMode === "random"}
              onChange={handleSelectionModeChange}
            />
            <label htmlFor="selection-random">
              <strong>Seleção Aleatória</strong>
              <span>O sistema selecionará questões aleatoriamente baseadas nos seus critérios</span>
            </label>
          </RadioOption>
        </RadioGroup>
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