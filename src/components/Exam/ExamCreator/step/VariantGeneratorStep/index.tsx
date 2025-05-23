import React from 'react';
import { FiArrowLeft, FiArrowRight, FiShuffle } from 'react-icons/fi';

import { Exam } from '../../../../../utils/types/Exam';

import {
  VariantGeneratorContainer,
  VariantGeneratorHeader,
  VariantToggleContainer,
  VariantToggleLabel,
  VariantSettingsSection,
  VariantCountInput,
  VariantMethodGrid,
  VariantMethodCard,
  VariantOption,
  GenerateVariantButton,
} from './styles';
import { ButtonGroup } from '../QuestionSelectionStep/styles';

interface VariantGeneratorStepProps {
  examData: Exam;
  setExamData: (data: Partial<Exam>) => void;
  onBack: () => void;
  onNext: () => void;
  onGenerateVariants: () => void;
}

const VariantGeneratorStep: React.FC<VariantGeneratorStepProps> = ({
  examData,
  setExamData,
  onBack,
  onNext,
  onGenerateVariants,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setExamData({ 
      ...examData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setExamData({ ...examData, [name]: numValue });
    }
  };

  return (
    <VariantGeneratorContainer>
      <VariantGeneratorHeader>
        <h2>Variantes da Prova</h2>
        <p>Configure diferentes versões da prova para aumentar a segurança</p>
      </VariantGeneratorHeader>

      <VariantToggleContainer>
        <VariantToggleLabel>
          <input
            type="checkbox"
            name="variantsEnabled"
            checked={examData.variantsEnabled || false}
            onChange={handleChange}
          />
          Habilitar variantes da prova
        </VariantToggleLabel>
      </VariantToggleContainer>

      {examData.variantsEnabled && (
        <>
          <VariantSettingsSection>
            <h3>Método de Geração</h3>
            <VariantMethodGrid>
              <VariantMethodCard
                active={examData.variantsGenerationMethod === 'shuffle'}
                onClick={() => setExamData({ ...examData, variantsGenerationMethod: 'shuffle' })}
              >
                <strong>Embaralhar</strong>
                <span>Gera variantes embaralhando questões e alternativas</span>
              </VariantMethodCard>
              
              <VariantMethodCard
                active={examData.variantsGenerationMethod === 'questionBank'}
                onClick={() => setExamData({ ...examData, variantsGenerationMethod: 'questionBank' })}
              >
                <strong>Banco de Questões</strong>
                <span>Seleciona questões diferentes do banco para cada variante</span>
              </VariantMethodCard>
            </VariantMethodGrid>
          </VariantSettingsSection>

          <VariantSettingsSection>
            <h3>Configurações</h3>
            <VariantCountInput>
              <label htmlFor="variantsCount">Número de variantes:</label>
              <input
                id="variantsCount"
                name="variantsCount"
                type="number"
                min="1"
                max="10"
                value={examData.variantsCount || 1}
                onChange={handleNumberChange}
              />
            </VariantCountInput>

            <VariantOption>
              <label>
                <input
                  type="checkbox"
                  name="shuffleQuestions"
                  checked={examData.shuffleQuestions || false}
                  onChange={handleChange}
                />
                Embaralhar ordem das questões em cada variante
              </label>
            </VariantOption>

            <VariantOption>
              <label>
                <input
                  type="checkbox"
                  name="shuffleAlternatives"
                  checked={examData.shuffleAlternatives || false}
                  onChange={handleChange}
                />
                Embaralhar ordem das alternativas em cada questão
              </label>
            </VariantOption>

            <GenerateVariantButton onClick={onGenerateVariants}>
              <FiShuffle /> Gerar Variantes
            </GenerateVariantButton>
          </VariantSettingsSection>
        </>
      )}

      <ButtonGroup>
        <button type="button" onClick={onBack} className="secondary">
          <FiArrowLeft /> Voltar
        </button>
        <button type="button" onClick={onNext} className="primary">
          Visualizar Variantes <FiArrowRight />
        </button>
      </ButtonGroup>
    </VariantGeneratorContainer>
  );
};

export default VariantGeneratorStep;