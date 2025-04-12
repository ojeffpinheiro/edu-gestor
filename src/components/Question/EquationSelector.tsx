import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaTimes } from 'react-icons/fa';

import { Equation } from '../../utils/types/Topic';

import { EmptyState, EquationCard, EquationList, EquationSelectorContainer, EquationTag, SearchContainer, SearchInput, SelectedEquation, SelectedEquationsContainer } from './EquationSelectorStyles';


import { InputGroup, Label } from '../../styles/inputs';
import { IconButton } from '../../styles/buttons';
import { Flex } from '../../styles/layoutUtils';

interface EquationSelectorProps {
  availableEquations: Equation[];
  selectedEquations: Equation[];
  onAddEquation: (equation: Equation) => void;
  onRemoveEquation: (equationId: string) => void;
  onSelect: (equation: Equation) => void;
  onRemove: (equationId: string) => void;
}

const EquationSelector: React.FC<EquationSelectorProps> = ({
  selectedEquations,
  onSelect,
  onRemove,
  availableEquations,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEquations, setFilteredEquations] = useState<Equation[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEquations(availableEquations);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = availableEquations.filter(
        (equation) =>
          equation.name.toLowerCase().includes(query) ||
          equation.latex.toLowerCase().includes(query) ||
          (equation.description && equation.description.toLowerCase().includes(query)) ||
          (equation.tags && equation.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
      setFilteredEquations(filtered);
    }
  }, [searchQuery, availableEquations]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const isEquationSelected = (equationId: string) => {
    return selectedEquations.some((eq) => eq.id === equationId);
  };

  return (
    <EquationSelectorContainer>
      <InputGroup>
        <Label htmlFor="equation-search">Buscar Equações</Label>
        <SearchContainer>
          <FaSearch />
          <SearchInput
            id="equation-search"
            type="text"
            placeholder="Digite para buscar por nome, LaTeX ou tags..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </SearchContainer>
      </InputGroup>

      {/* Selected Equations */}
      <SelectedEquationsContainer>
        <Label>Equações Selecionadas</Label>
        {selectedEquations.length > 0 ? (
          selectedEquations.map((equation) => (
            <SelectedEquation key={equation.id}>
              <div className="equation-info">
                <span className="equation-name">{equation.name}</span>
                <span className="equation-latex">{equation.latex}</span>
              </div>
              <IconButton onClick={() => onRemove(equation.id)}>
                <FaTimes />
              </IconButton>
            </SelectedEquation>
          ))
        ) : (
          <EmptyState>
            <p>Nenhuma equação selecionada. Selecione equações abaixo para adicionar à questão.</p>
          </EmptyState>
        )}
      </SelectedEquationsContainer>

      {/* Available Equations */}
      <InputGroup className="mt-6">
        <Label>Equações Disponíveis</Label>
        {filteredEquations.length > 0 ? (
          <EquationList>
            {filteredEquations.map((equation) => (
              <EquationCard
                key={equation.id}
                onClick={() => !isEquationSelected(equation.id) && onSelect(equation)}
                style={{
                  opacity: isEquationSelected(equation.id) ? 0.6 : 1,
                  cursor: isEquationSelected(equation.id) ? 'default' : 'pointer',
                }}
              >
                <div className="equation-name">{equation.name}</div>
                <div className="equation-latex">{equation.latex}</div>
                {equation.description && (
                  <div className="equation-description">{equation.description}</div>
                )}
                {equation.tags && equation.tags.length > 0 && (
                  <div className="equation-tags">
                    {equation.tags.map((tag, index) => (
                      <EquationTag key={index}>{tag}</EquationTag>
                    ))}
                  </div>
                )}
                <Flex justify="end" style={{ marginTop: 'var(--space-sm)' }}>
                  {!isEquationSelected(equation.id) && (
                    <IconButton title="Adicionar equação">
                      <FaPlus />
                    </IconButton>
                  )}
                </Flex>
              </EquationCard>
            ))}
          </EquationList>
        ) : (
          <EmptyState>
            <p>Nenhuma equação encontrada. Tente ajustar sua busca.</p>
          </EmptyState>
        )}
      </InputGroup>
    </EquationSelectorContainer>
  );
};

export default EquationSelector;