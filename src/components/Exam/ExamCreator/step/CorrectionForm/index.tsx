import React from 'react';
import { FiArrowLeft, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { Exam } from '../../../../../types/evaluation/Exam';
import { ButtonGroup } from '../../../../../pages/Exam/Subpages/ExamGenerator/styles';
import AccessCodeGenerator from '../../AccessCodeGenerator';

import {
  SecurityContainer,
  Section,
  FormControl,
  PasswordContainer,
  PasswordInputWrapper,
  TogglePasswordButton,
  HelpText,
  RadioGroup,
  RadioOption,
  SecurityGrid,
  SecurityOption,
  ResponsiveWrapper,
} from './styles'

interface CorrectionFormProps {
  examData: Exam;
  setExamData: (data: Partial<Exam>) => void;
  onBack: () => void;
  onNext: () => void;
  regenerateAccessCode?: () => string;
  validateAccessCode?: (code: string) => { valid: boolean; message: string };
}

const CorrectionForm: React.FC<CorrectionFormProps> = ({
  examData,
  setExamData,
  onBack,
  onNext,
  regenerateAccessCode = () => '',
  validateAccessCode = () => ({ valid: true, message: '' })
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setExamData({ 
      ...examData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleAccessCodeChange = (code: string) => {
    setExamData({ ...examData, accessCode: code });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setExamData({ ...examData, [name]: numValue });
    }
  };

  const handleClick = () => {
    onNext();
    console.log(examData);
  }
  return (
    <SecurityContainer>
      <h2>Segurança e Acesso</h2>
      <p>Configure as opções de segurança e acesso para sua prova</p>

      <Section>
        <h3>Proteção de Acesso</h3>
        <FormControl>
          <label>
            <input
              type="checkbox"
              name="requirePassword"
              checked={examData.requirePassword}
              onChange={handleChange}
            />
            Requerer senha para acessar esta prova
          </label>
        </FormControl>

        {examData.requirePassword && (
          <PasswordContainer>
            <label htmlFor="password">Senha de acesso:</label>
            <PasswordInputWrapper>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={examData.password}
                onChange={handleChange}
                placeholder="Digite uma senha"
              />
              <TogglePasswordButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </TogglePasswordButton>
            </PasswordInputWrapper>
          </PasswordContainer>
        )}
      </Section>

      <Section>
        <ResponsiveWrapper>
              <FormControl>
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
                <HelpText>Máximo de 10 variantes</HelpText>
              </FormControl>
            </ResponsiveWrapper>
      </Section>

      <Section>
        <AccessCodeGenerator
          accessCode={examData.accessCode}
          onRegenerate={regenerateAccessCode}
          onValidate={validateAccessCode}
          onChange={handleAccessCodeChange}
        />
      </Section>

      <Section>
        <h3>Método de Identificação</h3>
        <FormControl>
          <RadioGroup>
            <RadioOption>
              <input
                type="radio"
                id="identification-manual"
                name="identificationMethod"
                value="manual"
                checked={examData.identificationMethod === "manual"}
                onChange={handleChange}
              />
              <label htmlFor="identification-manual">
                <strong>Manual</strong>
                <span>Alunos escrevem nome e identificação manualmente</span>
              </label>
            </RadioOption>
            
            <RadioOption>
              <input
                type="radio"
                id="identification-barcode"
                name="identificationMethod"
                value="barcode"
                checked={examData.identificationMethod === "barcode"}
                onChange={handleChange}
              />
              <label htmlFor="identification-barcode">
                <strong>Código de barras</strong>
                <span>Folhas impressas com código de barras único para cada aluno</span>
              </label>
            </RadioOption>
            
            <RadioOption>
              <input
                type="radio"
                id="identification-qrcode"
                name="identificationMethod"
                value="qrcode"
                checked={examData.identificationMethod === "qrcode"}
                onChange={handleChange}
              />
              <label htmlFor="identification-qrcode">
                <strong>QR Code</strong>
                <span>Folhas impressas com QR code único para cada aluno</span>
              </label>
            </RadioOption>
          </RadioGroup>
        </FormControl>
      </Section>

      <Section>
        <h3>Segurança Adicional</h3>
        <SecurityGrid>
          <SecurityOption>
            <label>
              <input
                type="checkbox"
                name="shuffleQuestions"
                checked={examData.shuffleQuestions}
                onChange={handleChange}
              />
              <div>
                <strong>Embaralhar questões</strong>
                <span>Questões aparecem em ordem diferente para cada aluno</span>
              </div>
            </label>
          </SecurityOption>
          
          <SecurityOption>
            <label>
              <input
                type="checkbox"
                name="shuffleAlternatives"
                checked={examData.shuffleAlternatives}
                onChange={handleChange}
              />
              <div>
                <strong>Embaralhar alternativas</strong>
                <span>Alternativas das questões aparecem em ordem diferente</span>
              </div>
            </label>
          </SecurityOption>
          
          <SecurityOption>
            <label>
              <input
                type="checkbox"
                name="preventCopying"
                checked={examData.preventCopying || false}
                onChange={handleChange}
              />
              <div>
                <strong>Prevenir cópia</strong>
                <span>Texto não poderá ser copiado da versão digital</span>
              </div>
            </label>
          </SecurityOption>
        </SecurityGrid>
      </Section>

      <ButtonGroup>
        <button type="button" onClick={onBack} className="secondary">
          <FiArrowLeft /> Voltar
        </button>
        <button type="button" onClick={handleClick}>
          Pré-visualizar <FiArrowRight />
        </button>
      </ButtonGroup>
    </SecurityContainer>
  );
};

export default CorrectionForm;