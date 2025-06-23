import styled, { css } from 'styled-components';

export const ActionContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

interface ActionButtonProps {
  $active?: boolean;
  disabled?: boolean;
}

export const ActionButton = styled.button<ActionButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #f0f0f0;
  color: #333;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #e0e0e0;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }

  ${({ $active }) => $active && css`
    background-color: #3182ce;
    color: white;
    &:hover {
      background-color: #2c5282;
    }
  `}

  ${({ disabled }) => disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background-color: #f0f0f0;
      transform: none;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
  `}

  svg {
    font-size: 1rem;
    flex-shrink: 0;
  }

  /* Efeito de ripple */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%, -50%);
    transform-origin: 50% 50%;
  }

  &:focus:not(:active)::after {
    animation: ripple 0.6s ease-out;
  }

  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    100% {
      transform: scale(20, 20);
      opacity: 0;
    }
  }
`;

export const ControlGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
`;

export const Content = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const TemplateSelect = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  appearance: none;
  padding-left: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;