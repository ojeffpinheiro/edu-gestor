import styled from "styled-components";
import { ActionButton, LinkButton } from "../../../styles/buttons";
import { flexColumn, flexRow, spaceBetween } from "../../../styles/layoutUtils";
import { fadeIn, pulse, slideIn } from "../../../styles/animations";
import { BaseCard } from "../../../styles/baseComponents";

// Styled Components
export const SecurityCard = styled(BaseCard)`
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.4s ease-out;
  transition: all 0.3s ease;
`;

export const CardHeader = styled.div`
  ${flexRow}
  ${spaceBetween}
  margin-bottom: var(--space-md);
  
  h2 {
    ${flexRow}
    font-size: var(--font-size-xl);
    color: var(--color-title-card);
    
    svg {
      margin-right: var(--space-sm);
      color: var(--color-primary);
    }
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: var(--color-border-light);
  margin: var(--space-md) 0 var(--space-lg) 0;
`;

export const SectionTitle = styled.h3`
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
  font-weight: 500;
`;

export const SwitchRow = styled.div`
  ${flexRow}
  margin-bottom: var(--space-md);
  animation: ${slideIn} 0.3s ease-out;
  
  label {
    margin-left: var(--space-sm);
    cursor: pointer;
    user-select: none;
  }
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

export const Section = styled.div`
  ${flexColumn}
  margin-bottom: var(--space-xl);
`;

export const StyledTextField = styled.input`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-input);
  color: var(--color-text);
  transition: all 0.2s ease-in-out;
  font-size: var(--font-size-md);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-focus);
  }
`;

export const InputField = styled.div`
  position: relative;
  margin-bottom: var(--space-md);
  width: 100%;
  
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: var(--space-sm);
    color: var(--color-text-third);
  }
  
  input {
    padding-left: 2.5rem;
  }
`;

export const DatePickerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-left: var(--space-lg);
  margin-bottom: var(--space-md);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TimeLimitContainer = styled.div`
  margin-left: var(--space-lg);
  max-width: 200px;
  position: relative;
  
  small {
    color: var(--color-text-secondary);
    font-size: var(--font-size-xs);
    margin-top: var(--space-xs);
    display: block;
  }
`;

export const ErrorMessage = styled.div`
  ${flexRow}
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: var(--space-xs);
  margin-left: var(--space-lg);
  animation: ${pulse} 1s ease-in-out;
  
  svg {
    margin-right: var(--space-xs);
  }
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
  margin-bottom: var(--space-md);
  
  svg.icon-start {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: var(--space-sm);
    color: var(--color-text-third);
  }
  
  input {
    padding-left: 2.5rem;
    padding-right: 3rem;
  }
  
  button.toggle-visibility {
    position: absolute;
    right: var(--space-xs);
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: var(--space-xs);
    color: var(--color-text-secondary);
    
    &:hover {
      color: var(--color-primary);
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-lg);
`;

export const GeneratePasswordButton = styled(LinkButton)`
  ${flexRow}
  color: var(--color-primary);
  padding: var(--space-xs) var(--space-sm);
  transition: all 0.2s ease;
  margin-bottom: var(--space-md);
  
  svg {
    margin-right: var(--space-xs);
  }
  
  &:hover {
    transform: translateY(-1px);
  }
`;

export const SaveButton = styled(ActionButton)`
  background: var(--color-primary);
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: var(--color-primary-hover);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: var(--color-button-disabled);
    cursor: not-allowed;
  }
`;