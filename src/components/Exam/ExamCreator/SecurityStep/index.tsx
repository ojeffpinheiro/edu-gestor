import React from 'react';
import { FiArrowLeft, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import styled from 'styled-components';
import { Exam } from '../../../../utils/types/Exam';
import { ButtonGroup } from '../../../../pages/Exam/Subpages/ExamGenerator/styles';
import AccessCodeGenerator from '../AccessCodeGenerator';

interface SecurityStepProps {
  examData: Exam;
  setExamData: (data: Partial<Exam>) => void;
  onBack: () => void;
  onNext: () => void;
  regenerateAccessCode?: () => string;
  validateAccessCode?: (code: string) => { valid: boolean; message: string };
}

const SecurityStep: React.FC<SecurityStepProps> = ({
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

  const handleClick = () => {
    onNext();
    console.log(examData);
  }
  return (
    <SecurityContainer>
      <h2>Segurança e Acesso</h2>
      <p>Configure as opções de segurança e acesso para sua prova</p>

      <Section>
        <h3>Visibilidade</h3>
        <FormControl>
          <label>
            <input
              type="checkbox"
              name="isPublic"
              checked={examData.isPublic}
              onChange={handleChange}
            />
            Tornar esta prova pública (visível para todos os professores da instituição)
          </label>
        </FormControl>
      </Section>

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
        <AccessCodeGenerator
          accessCode={examData.accessCode}
          onRegenerate={regenerateAccessCode}
          onValidate={validateAccessCode}
          onChange={handleAccessCodeChange}
        />
      </Section>

      <Section>
        <h3>Identificação por Código de Barras</h3>
        <FormControl>
          <label>
            <input
              type="checkbox"
              name="useBarCode"
              checked={examData.useBarCode}
              onChange={handleChange}
            />
            Incluir código de barras para identificação da folha de resposta
          </label>
          <HelpText>
            Códigos de barras facilitam a identificação automática de folhas durante a correção
          </HelpText>
        </FormControl>
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

// Estilos
const SecurityContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaeaea;

  &:last-child {
    border-bottom: none;
  }

  h3 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 1rem;
  }
`;

const FormControl = styled.div`
  margin-bottom: 1rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const HelpText = styled.p`
  margin-top: 0.5rem;
  margin-left: 1.8rem;
  font-size: 0.9rem;
  color: #666;
`;

const PasswordContainer = styled.div`
  margin-top: 1rem;
  margin-left: 1.8rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  input {
    flex: 1;
    padding: 0.7rem 2.5rem 0.7rem 1rem;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #777;
  padding: 0.5rem;
  
  &:hover {
    color: #333;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  input[type="radio"] {
    margin-top: 0.3rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  label {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    cursor: pointer;
    
    strong {
      font-weight: 500;
    }
    
    span {
      font-size: 0.9rem;
      color: #666;
    }
  }
`;

const SecurityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const SecurityOption = styled.div`
  label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
    
    input[type="checkbox"] {
      margin-top: 0.3rem;
      width: 18px;
      height: 18px;
    }
    
    div {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      
      strong {
        font-weight: 500;
      }
      
      span {
        font-size: 0.9rem;
        color: #666;
      }
    }
  }
`;

export default SecurityStep;