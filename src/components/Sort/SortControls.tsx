import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import {
  SortContainer,
  SortLabel,
  SortSelect,
  SortButtonGroup,
  SortButton,
  DirectionButton
} from './styles';
import { SortControlsProps } from './types';

export const SortControls = ({
  options,
  value,
  direction = 'asc',
  onChange,
  className,
  variant = 'dropdown'
}: SortControlsProps) => {
  const handleSortChange = (newValue: string) => {
    onChange(newValue, direction);
  };

  const handleDirectionToggle = () => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc';
    onChange(value, newDirection);
  };

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  if (variant === 'buttons') {
    return (
      <SortContainer className={className}>
        <SortLabel>Ordenar por:</SortLabel>
        <SortButtonGroup>
          {options.map((option) => (
            <SortButton
              key={option.value}
              $active={value === option.value}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </SortButton>
          ))}
        </SortButtonGroup>
        
        {selectedOption.direction !== undefined && (
          <DirectionButton
            $active={true}
            onClick={handleDirectionToggle}
            aria-label={`Orden ${direction === 'asc' ? 'ascendente' : 'descendente'}`}
          >
            {direction === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
          </DirectionButton>
        )}
      </SortContainer>
    );
  }

  return (
    <SortContainer className={className}>
      <SortLabel>Ordenar por:</SortLabel>
      <SortSelect
        value={value}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SortSelect>

      {selectedOption.direction !== undefined && (
        <DirectionButton
          $active={true}
          onClick={handleDirectionToggle}
          aria-label={`Orden ${direction === 'asc' ? 'ascendente' : 'descendente'}`}
        >
          {direction === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
        </DirectionButton>
      )}
    </SortContainer>
  );
};