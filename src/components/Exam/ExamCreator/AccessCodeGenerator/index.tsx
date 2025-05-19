import React, { useState } from 'react';
import { FiRefreshCw, FiCheck, FiX, FiInfo } from 'react-icons/fi';
import styled from 'styled-components';

interface AccessCodeGeneratorProps {
  accessCode: string;
  onRegenerate: () => string;
  onValidate: (code: string) => { valid: boolean; message: string };
  onChange: (code: string) => void;
}

const AccessCodeGenerator: React.FC<AccessCodeGeneratorProps> = ({
  accessCode,
  onRegenerate,
  onValidate,
  onChange
}) => {
  const [customCode, setCustomCode] = useState(accessCode);
  const [isEditing, setIsEditing] = useState(false);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string } | null>(null);

  const handleRegenerate = () => {
    const newCode = onRegenerate();
    setCustomCode(newCode);
    setValidationResult(null);
  };

  const handleCustomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Converte para maiúsculas e limita a 6 caracteres
    const value = e.target.value.toUpperCase().slice(0, 6);
    setCustomCode(value);
    setValidationResult(null);
  };

  const validateCustomCode = () => {
    const result = onValidate(customCode);
    setValidationResult(result);
    
    if (result.valid) {
      onChange(customCode);
      setIsEditing(false);
    }
  };

  const cancelEditing = () => {
    setCustomCode(accessCode);
    setIsEditing(false);
    setValidationResult(null);
  };

  return (
    <AccessCodeContainer>
      <h4>Código de Acesso</h4>
      <p className="info-text">
        <FiInfo size={16} />
        Um código de 6 caracteres será gerado automaticamente para seus alunos acessarem a prova
      </p>
      
      <CodeDisplay>
        {!isEditing ? (
          <>
            <CodeValue>{accessCode}</CodeValue>
            <ButtonGroup>
              <ActionButton 
                onClick={handleRegenerate} 
                title="Gerar um novo código"
                aria-label="Gerar um novo código"
              >
                <FiRefreshCw size={16} />
              </ActionButton>
              <ActionButton 
                onClick={() => setIsEditing(true)} 
                title="Editar código manualmente"
                aria-label="Editar código manualmente"
              >
                Editar
              </ActionButton>
            </ButtonGroup>
          </>
        ) : (
          <>
            <CodeInput
              type="text"
              value={customCode}
              onChange={handleCustomCodeChange}
              placeholder="CÓDIGO"
              maxLength={6}
              autoFocus
            />
            <ButtonGroup>
              <ActionButton 
                onClick={validateCustomCode} 
                title="Confirmar código"
                aria-label="Confirmar código"
                className="confirm"
              >
                <FiCheck size={16} />
              </ActionButton>
              <ActionButton 
                onClick={cancelEditing} 
                title="Cancelar edição"
                aria-label="Cancelar edição"
                className="cancel"
              >
                <FiX size={16} />
              </ActionButton>
            </ButtonGroup>
          </>
        )}
      </CodeDisplay>
      
      {validationResult && (
        <ValidationMessage valid={validationResult.valid}>
          {validationResult.message}
        </ValidationMessage>
      )}
      
      <CodeGuidelines>
        <p>Diretrizes para código de acesso:</p>
        <ul>
          <li>Exatamente 6 caracteres</li>
          <li>Apenas letras maiúsculas e números</li>
          <li>Evitando caracteres ambíguos (como O, 0, I, 1)</li>
        </ul>
      </CodeGuidelines>
    </AccessCodeContainer>
  );
};

// Estilos
const AccessCodeContainer = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;

  h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #333;
  }

  .info-text {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: #666;
    font-size: 0.9rem;
  }
`;

const CodeDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
`;

const CodeValue = styled.span`
  font-family: monospace;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.2rem;
  color: #333;
`;

const CodeInput = styled.input`
  font-family: monospace;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.2rem;
  color: #333;
  border: none;
  outline: none;
  width: 10rem;
  background: transparent;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.3rem;
  background-color: #f0f0f0;
  color: #555;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }

  &.confirm {
    background-color: #e6f7ea;
    color: #2e7d32;
    &:hover {
      background-color: #d4edda;
    }
  }

  &.cancel {
    background-color: #ffeeee;
    color: #d32f2f;
    &:hover {
      background-color: #ffdddd;
    }
  }
`;

const ValidationMessage = styled.div<{ valid: boolean }>`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  background-color: ${props => props.valid ? '#e6f7ea' : '#ffeeee'};
  color: ${props => props.valid ? '#2e7d32' : '#d32f2f'};
`;

const CodeGuidelines = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #ddd;
  font-size: 0.9rem;
  color: #666;

  p {
    margin-bottom: 0.5rem;
  }

  ul {
    margin: 0;
    padding-left: 1.5rem;
  }
`;

export default AccessCodeGenerator;