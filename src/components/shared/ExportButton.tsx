import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

// Types for props
interface ExportButtonProps {
  data: any[];
  filename: string;
  onExport: (format: 'pdf' | 'csv' | 'excel') => void;
}

// Styled components
const ExportContainer = styled.div`
  display: flex;
  gap: var(--space-sm);
`;

const ExportOptionsContainer = styled.div`
  position: relative;
`;

const OptionsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  z-index: 10;
  min-width: 120px;
  overflow: hidden;
`;

const OptionItem = styled.button`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--color-background-third);
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border-light);
  }
`;

const ExportButton: React.FC<ExportButtonProps> = ({ data, filename, onExport }) => {
  const [showOptions, setShowOptions] = useState(false);
  
  const handleExportClick = () => {
    setShowOptions(!showOptions);
  };
  
  const handleOptionClick = (format: 'pdf' | 'csv' | 'excel') => {
    setShowOptions(false);
    onExport(format);
  };
  
  // Don't show export if no data
  if (!data || data.length === 0) {
    return null;
  }
  
  return (
    <ExportContainer>
      <ExportOptionsContainer>
        <Button onClick={handleExportClick} variant="secondary">
          <span>Exportar</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </Button>
        
        {showOptions && (
          <OptionsDropdown>
            <OptionItem onClick={() => handleOptionClick('pdf')}>
              PDF
            </OptionItem>
            <OptionItem onClick={() => handleOptionClick('csv')}>
              CSV
            </OptionItem>
            <OptionItem onClick={() => handleOptionClick('excel')}>
              Excel
            </OptionItem>
          </OptionsDropdown>
        )}
      </ExportOptionsContainer>
    </ExportContainer>
  );
};

export default ExportButton;