import React, { useState } from 'react';
import { FormulaInput, FormulaOptions, FormulaPreview, ModalContainer } from './styles';

interface FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formula: string) => void;
  currentFormula: string;
}

const FormulaModal: React.FC<FormulaModalProps> = ({ isOpen, onClose, onSave, currentFormula }) => {
  const [formula, setFormula] = useState(currentFormula);
  const [variables] = useState(['NOTA1', 'NOTA2', 'NOTA3', 'RECUPERACAO', 'MEDIA']);
  const [operators] = useState(['+', '-', '*', '/', 'MAX', 'MIN']);

  const handleInsertVariable = (variable: string) => {
    setFormula(prev => `${prev} ${variable}`.trim());
  };

  const handleInsertOperator = (operator: string) => {
    setFormula(prev => `${prev} ${operator}`.trim());
  };

  return (
    <ModalContainer $isOpen={isOpen}>
      <div className="modal-content">
        <h2>Configurar Fórmula Personalizada</h2>
        
        <FormulaPreview>
          <strong>Fórmula atual:</strong> {formula || '(Padrão: Média simples)'}
        </FormulaPreview>
        
        <FormulaInput
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          placeholder="Ex: (NOTA1 + NOTA2 + NOTA3) / 3"
        />
        
        <FormulaOptions>
          <div className="variables">
            <h4>Variáveis:</h4>
            {variables.map(v => (
              <button key={v} onClick={() => handleInsertVariable(v)}>{v}</button>
            ))}
          </div>
          
          <div className="operators">
            <h4>Operadores:</h4>
            {operators.map(op => (
              <button key={op} onClick={() => handleInsertOperator(op)}>{op}</button>
            ))}
          </div>
        </FormulaOptions>
        
        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={() => onSave(formula)}>Salvar</button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default FormulaModal;