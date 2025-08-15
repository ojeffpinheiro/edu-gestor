import React, { useState } from 'react';
import { FaHeading, FaTag, FaBook, FaQuestionCircle, FaChartBar } from 'react-icons/fa';
import { DifficultyLevel, QuestionFormData, QuestionTypeConst, OptionsLayout } from '../../../../utils/types/Question';
import {
  ConditionalField,
  FormActions, FormButton, FormGroup,
  FormInput, FormLabel,
  FormStepContainer, FormTitle
} from '../../QuestionForm.styles';
import { Select } from '../../../../styles/inputs';


interface BasicInfoStepProps {
  data: QuestionFormData;
  updateData: (field: keyof QuestionFormData, value: any) => void;
  onNext: () => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, updateData, onNext }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateData(e.target.name as keyof QuestionFormData, e.target.value);
  };

  return (
    <FormStepContainer>
      <FormTitle>
        <FaQuestionCircle style={{ marginRight: '8px' }} />
        Informações Básicas
      </FormTitle>

      <FormGroup>
        <FormLabel>
          <FaHeading style={{ marginRight: '8px' }} />
          Título
        </FormLabel>
        <FormInput
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          required
          minLength={5}
          placeholder="Digite o título da questão"
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          <FaTag style={{ marginRight: '8px' }} />
          Tópico
        </FormLabel>
        <FormInput
          type="text"
          name="topic"
          value={data.topic}
          onChange={handleChange}
          required
          placeholder="Ex: Álgebra Linear"
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          <FaBook style={{ marginRight: '8px' }} />
          Conteúdo
        </FormLabel>
        <FormInput
          type="text"
          name="content"
          value={data.content}
          onChange={handleChange}
          required
          placeholder="Ex: Matrizes e Determinantes"
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          <FaQuestionCircle style={{ marginRight: '8px' }} />
          Tipo de Questão
        </FormLabel>
        <Select name="type" value={data.type} onChange={handleChange}>
          {Object.values(QuestionTypeConst).map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <FormLabel>
          <FaChartBar style={{ marginRight: '8px' }} />
          Dificuldade
        </FormLabel>
        <Select name="difficulty" value={data.difficulty} onChange={handleChange}>
          {Object.values(DifficultyLevel).map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormButton
        type="button"
        $variant="outline"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? 'Ocultar opções avançadas' : 'Mostrar opções avançadas'}
      </FormButton>

      <ConditionalField isVisible={showAdvanced}>
        <FormGroup>
          <FormLabel>Layout das Alternativas</FormLabel>
          <Select
            name="optionsLayout"
            value={data.optionsLayout}
            onChange={handleChange}
          >
            {Object.values(OptionsLayout).map(layout => (
              <option key={layout} value={layout}>
                {layout}
              </option>
            ))}
          </Select>
        </FormGroup>
      </ConditionalField>

      <FormActions>
        <FormButton $variant="primary" onClick={onNext} $isLoading={false}>
          Próximo
        </FormButton>
      </FormActions>
    </FormStepContainer>
  );
};