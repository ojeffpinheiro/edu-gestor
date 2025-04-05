import styled from "styled-components";
import { fadeIn, slideIn } from '../../../styles/animations';
import { flexRow, flexColumn, spaceBetween, gap } from '../../../styles/layoutUtils';
import { BaseCard, BaseInput } from '../../../styles/baseComponents';

// Styled components for ExamVariantGenerator
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-lg);
  animation: ${fadeIn} 0.4s ease-out;
`;

export const Title = styled.h2`
  margin-bottom: var(--space-lg);
  color: var(--color-text);
`;

export const FormContainer = styled(BaseCard)`
  ${flexColumn}
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border-light);
  margin-bottom: var(--space-xl);
  padding: var(--space-lg);
  animation: ${slideIn} 0.4s ease-out;
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  ${flexColumn}
  margin-bottom: var(--space-md);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xs);
  transition: color 0.2s ease;
`;

export const TextInput = styled(BaseInput)`
  font-size: var(--font-size-md);
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover:not(:disabled):not(:focus) {
    border-color: var(--color-input-border-dark, var(--color-primary-hover));
  }
  
  &:focus {
    transform: translateY(-1px);
  }
`;

export const NumberInput = styled(TextInput).attrs({ type: 'number' })`
  width: 100%;
`;

export const SwitchContainer = styled.div`
  ${flexRow}
  ${gap('sm')}
`;

export const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 26px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-border);
    transition: .4s;
    border-radius: 34px;
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: var(--color-primary);
    
    &:before {
      transform: translateX(26px);
    }
  }
  
  input:focus + span {
    box-shadow: var(--shadow-focus);
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border-light);
  margin: var(--space-lg) 0;
`;

export const Alert = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' }>`
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-lg);
  animation: ${fadeIn} 0.4s ease-out;
  background-color: ${({ type }) => {
    switch (type) {
      case 'success': return 'rgba(82, 196, 26, 0.1)';
      case 'error': return 'rgba(245, 34, 45, 0.1)';
      case 'warning': return 'rgba(250, 173, 20, 0.1)';
      case 'info': return 'rgba(24, 144, 255, 0.1)';
      default: return 'rgba(24, 144, 255, 0.1)';
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case 'success': return 'var(--color-success)';
      case 'error': return 'var(--color-error)';
      case 'warning': return 'var(--color-warning)';
      case 'info': return 'var(--color-info)';
      default: return 'var(--color-info)';
    }
  }};
  border-left: 4px solid ${({ type }) => {
    switch (type) {
      case 'success': return 'var(--color-success)';
      case 'error': return 'var(--color-error)';
      case 'warning': return 'var(--color-warning)';
      case 'info': return 'var(--color-info)';
      default: return 'var(--color-info)';
    }
  }};
`;

export const ButtonGroup = styled.div`
  ${flexRow}
  ${gap('md')}
  margin-bottom: var(--space-lg);
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const VariantCard = styled(BaseCard)`
  margin-bottom: var(--space-md);
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 4px solid var(--color-primary);
  animation: ${slideIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
`;

export const VariantHeader = styled.div`
  ${flexRow}
  ${spaceBetween}
  margin-bottom: var(--space-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md);
  }
`;

export const VariantTitle = styled.h3`
  margin: 0;
  color: var(--color-title-card);
`;

export const VariantActions = styled.div`
  ${flexRow}
  ${gap('sm')}
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const VariantDetails = styled.div`
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-sm);
  padding: var(--space-md);
  
  p {
    margin-bottom: var(--space-sm);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Tag = styled.span<{ color: string }>`
  display: inline-block;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 500;
  margin-left: var(--space-sm);
  background-color: ${({ color }) => {
    switch (color) {
      case 'blue': return 'rgba(24, 144, 255, 0.1)';
      case 'green': return 'rgba(82, 196, 26, 0.1)';
      case 'red': return 'rgba(245, 34, 45, 0.1)';
      case 'yellow': return 'rgba(250, 173, 20, 0.1)';
      default: return 'rgba(24, 144, 255, 0.1)';
    }
  }};
  color: ${({ color }) => {
    switch (color) {
      case 'blue': return 'var(--color-info)';
      case 'green': return 'var(--color-success)';
      case 'red': return 'var(--color-error)';
      case 'yellow': return 'var(--color-warning)';
      default: return 'var(--color-info)';
    }
  }};
`;