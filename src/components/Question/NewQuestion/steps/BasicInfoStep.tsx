import React from 'react';
import { FaHeading, FaTag, FaBook, FaQuestionCircle, FaChartBar } from 'react-icons/fa';
import { QuestionFormData } from '../../../../utils/types/Question';
import {
  Content,
  FormGroup,
  FormInput, FormLabel,
  FormSection,
  FormSectionTitle,
  TwoColumnGrid,
} from '../../QuestionForm.styles';
import { Select } from '../../../../styles/inputs';
import { FORM_CONFIG, QUESTION_TYPE_CONFIG } from '../../../../utils/questionsTypesRender';

interface BasicInfoStepProps {
  data: QuestionFormData;
  updateData: (field: keyof QuestionFormData, value: any) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, updateData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateData(e.target.name as keyof QuestionFormData, e.target.value);
  };

  return (
    <Content>
      <FormSection>
        <FormSectionTitle>Informações Básicas</FormSectionTitle>
        <TwoColumnGrid>
          <FormGroup>
            <FormLabel>
              <FaHeading style={{ marginRight: '8px' }} />
              Título da Questão*
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
              Tags
            </FormLabel>
            <FormInput
              type="text"
              name="tags"
              value={data.tags?.join(', ') || ''}
              onChange={(e) => updateData('tags', e.target.value.split(',').map(tag => tag.trim()))}
              placeholder="Algebra, equações, 9º ano"
            />
          </FormGroup>
        </TwoColumnGrid>
      </FormSection>

      {/* Seção de Classificação */}
      <FormSection>
        <FormSectionTitle>Classificação</FormSectionTitle>
        <TwoColumnGrid>
          <FormGroup>
            <FormLabel>
              <FaQuestionCircle style={{ marginRight: '8px' }} />
              Tipo de Questão*
            </FormLabel>
            <Select
              name="type" value={data.type} onChange={handleChange}>
              {Object.entries(QUESTION_TYPE_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              <FaChartBar style={{ marginRight: '8px' }} />
              Dificuldade*
            </FormLabel>
            <Select
              name="difficultyLevel"
              value={data.difficulty}
              onChange={handleChange}
            >
              {Object.values(FORM_CONFIG.difficulty).map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              <FaBook style={{ marginRight: '8px' }} />
              Categoria*
            </FormLabel>
            <Select name="category" value={data.category} onChange={handleChange}>
              <option value="">Selecione a categoria</option>
              <option value="math">Matemática</option>
              <option value="science">Ciências</option>
              <option value="history">História</option>
            </Select>
          </FormGroup>
        </TwoColumnGrid>
      </FormSection>
    </Content>
  );
};