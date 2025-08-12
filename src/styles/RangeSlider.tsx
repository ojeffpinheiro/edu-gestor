import React from 'react'
import styled from 'styled-components';
import { constants } from '../utils/consts';

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const RangeSliderContainer = styled.div`SliderInput 
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
  }
`;

const SliderInput = styled.input.attrs({ type: 'range' })`
  width: 100%;
  
  /* Usando constantes do arquivo consts.ts */
  background: ${constants.colors.background.main};
  
  &::-webkit-slider-thumb {
    background: ${constants.colors.primary};
  }
`;

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, value, onChange }) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), value[1]);
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), value[0]);
    onChange([value[0], newMax]);
  };

  return (
    <RangeSliderContainer>
      <SliderInput
        min={min}
        max={max}
        value={value[0]}
        onChange={handleMinChange}
      />
      <SliderInput
        min={min}
        max={max}
        value={value[1]}
        onChange={handleMaxChange}
      />
      <div>
        {value[0]} - {value[1]}
      </div>
    </RangeSliderContainer>
  );
};

export default RangeSlider;