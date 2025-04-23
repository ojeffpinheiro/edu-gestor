// components/Equation/EnhancedEquationEditor.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Variable } from '../../utils/types/Topic';

import { symbolCategories } from '../../mocks/equation';

import {
  EditorContainer,
  EquationInput,
  ToolbarSection,
  SectionTitle,
  ButtonsRow,
  IconButton,
  TabContainer,
  Tab,
  FormatHelp,
  VariablesList,
  VariableChip
} from './EquationEditorStyles';


interface EnhancedEquationEditorProps {
  initialValue: string;
  variables?: Variable[];
  onChange: (value: string) => void;
}

const EnhancedEquationEditor: React.FC<EnhancedEquationEditorProps> = ({
  initialValue,
  variables = [],
  onChange
}) => {
  const [equation, setEquation] = useState(initialValue);
  const [activeSymbolCategory, setActiveSymbolCategory] = useState('basic');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEquation(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setEquation(newValue);
    onChange(newValue);
  };

  const insertAtCursor = (textToInsert: string, e: React.MouseEvent) => {
    // Previne propagação do evento de clique
    e.preventDefault();
    e.stopPropagation();
    
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const newValue = text.substring(0, start) + textToInsert + text.substring(end);
    setEquation(newValue);
    onChange(newValue);

    // Restore focus and position cursor appropriately
    setTimeout(() => {
      textarea.focus();

      // If there's a placeholder {} in the inserted text, position cursor inside it
      const cursorPosition = textToInsert.includes('{}')
        ? start + textToInsert.indexOf('{}') + 1
        : start + textToInsert.length;

      textarea.selectionStart = cursorPosition;
      textarea.selectionEnd = cursorPosition;
    }, 0);
  };

  const handleSymbolCategoryChange = (category: string, e: React.MouseEvent) => {
    // Previne propagação do evento de clique
    e.preventDefault();
    e.stopPropagation();
    
    setActiveSymbolCategory(category);
  };

  return (
    <EditorContainer onClick={(e) => e.stopPropagation()}>
      {/* Symbol Category Tabs */}
      <TabContainer onClick={(e) => e.stopPropagation()}>
        {symbolCategories.map((category, idx) => (
          <Tab
            key={idx}
            active={activeSymbolCategory === category.id}
            onClick={(e) => handleSymbolCategoryChange(category.id, e)}
          >
            {category.title}
          </Tab>
        ))}
      </TabContainer>

      {/* Display only the active symbol category */}
      {symbolCategories.map((category, idx) => (
        category.id === activeSymbolCategory && (
          <ToolbarSection key={idx} onClick={(e) => e.stopPropagation()}>
            <ButtonsRow onClick={(e) => e.stopPropagation()}>
              {category.symbols.map((symbol, symIdx) => (
                <IconButton
                  key={symIdx}
                  onClick={(e) => insertAtCursor(symbol.insert, e)}
                  title={symbol.tooltip}
                >
                  {symbol.display}
                </IconButton>
              ))}
            </ButtonsRow>
          </ToolbarSection>
        )
      ))}

      {/* Variables List */}
      {variables.length > 0 && (
        <ToolbarSection onClick={(e) => e.stopPropagation()}>
          <SectionTitle>Variables</SectionTitle>
          <VariablesList onClick={(e) => e.stopPropagation()}>
            {variables.map((variable, index) => (
              variable.symbol && (
                <VariableChip
                  key={index}
                  onClick={(e) => insertAtCursor(variable.symbol, e)}
                  title={variable.name || variable.symbol}
                >
                  {variable.symbol}
                </VariableChip>
              )
            ))}
          </VariablesList>
        </ToolbarSection>
      )}

      {/* Equation Input */}
      <EquationInput
        ref={textareaRef}
        value={equation}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        placeholder="Enter equation in LaTeX format (e.g., c \\cdot f^2)"
      />

      {/* Help Text */}
      <FormatHelp onClick={(e) => e.stopPropagation()}>
        Use LaTeX syntax for mathematical expressions. Example: "c \\cdot f^2" displays as "c · f²".
      </FormatHelp>
    </EditorContainer>
  );
};

// Type declaration for TypeScript
declare global {
  interface Window {
    KaTex: {
      render: (
        equation: string,
        container: HTMLElement,
        options?: {
          displayMode?: boolean;
          throwOnError?: boolean;
          trust?: boolean;
          strict?: boolean;
        }
      ) => void;
    };
  }
}

export default EnhancedEquationEditor;