import React from 'react'
import styled from 'styled-components';

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const Content = styled.input.attrs({ type: 'range' })`
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

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = [...value] as [number, number];
    newValue[index] = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <Content>
      <input
        type="range"
        min={min}
        max={max}
        value={value[0]}
        onChange={(e) => handleChange(e, 0)}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={(e) => handleChange(e, 1)}
      />
    </Content>
  );
};

export default RangeSlider;