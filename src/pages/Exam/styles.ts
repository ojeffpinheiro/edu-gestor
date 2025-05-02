import styled, { css } from "styled-components";
import { BaseButton, BaseCard, BaseInput, buttonBaseCss } from "../../styles/baseComponents";
import { constants } from "../../utils/consts";
import { Subtitle } from "../../styles/typography";

type ButtonSize = 'xs' | "sm" | "md" | "lg";

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'link';
  size?: ButtonSize;
  fullWidth?: boolean;
  active?: boolean;
  disabled?: boolean;
}

const buttonSizes = {
  xs: css`
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-xs);
  `,
  sm: css`
    padding: var(--space-xs) var(--space-md);
    font-size: var(--font-size-sm);
  `,
  md: css`
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-md);
  `,
  lg: css`
    padding: var(--space-md) var(--space-lg);
    font-size: var(--font-size-lg);
  `,
};

export const Button = styled(BaseButton)<ButtonProps>`
  ${({ size = 'md' }) => buttonSizes[size]}
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  
  ${({ variant = 'primary' }) => {
    switch(variant) {
      case 'primary':
        return css`
          background-color: var(--color-primary);
          color: var(--color-text-on-primary);
          
          &:hover:not(:disabled) {
            background-color: var(--color-primary-hover);
          }
        `;
      case 'secondary':
        return css`
          background-color: var(--color-secondary);
          color: var(--color-text-on-primary);
          
          &:hover:not(:disabled) {
            background-color: var(--color-secondary-hover);
          }
        `;
      case 'success':
        return css`
          background-color: var(--color-success);
          color: white;
          
          &:hover:not(:disabled) {
            background-color: var(--color-success-hover);
          }
        `;
      case 'error':
        return css`
          background-color: var(--color-error);
          color: white;
          
          &:hover:not(:disabled) {
            background-color: var(--color-error-hover);
          }
        `;
      case 'warning':
        return css`
          background-color: var(--color-warning);
          color: white;
          
          &:hover:not(:disabled) {
            background-color: var(--color-warning-hover);
          }
        `;
      case 'info':
        return css`
          background-color: var(--color-info);
          color: white;
          
          &:hover:not(:disabled) {
            background-color: var(--color-info-hover);
          }
        `;
      case 'link':
        return css`
          background-color: transparent;
          color: var(--color-primary);
          padding: 0;
          
          &:hover:not(:disabled) {
            text-decoration: underline;
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const IconButton = styled(Button)`
  width: ${props => props.size === 'lg' ? '48px' : props.size === 'sm' ? '32px' : '40px'};
  height: ${props => props.size === 'lg' ? '48px' : props.size === 'sm' ? '32px' : '40px'};
  padding: var(--space-xs);
  background-color: transparent;
  color: var(--color-text);
  
  &:hover {
    background-color: var(--color-button);
  }
`;

export const LinkButton = styled.button`
  ${buttonBaseCss}
  background: transparent;
  color: var(--color-primary);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const CloseButton = styled.button`
  ${buttonBaseCss}
  width: 2.7rem;
  height: 2.7rem;
  border-radius: var(--border-radius-full);
  background-color: transparent;
  
  &:hover {
    transform: rotate(90deg);
  }
`;

export const ActionButton = styled(BaseButton)`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  
  &:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }
`;

export const CancelButton = styled(ActionButton)`
  background-color: var(--color-secondary);
  color: var(--color-text-button);
  
  &:hover:not(:disabled) {
    background-color: var(--color-secondary-hover);
  }
`;

export const PrimaryActionButton = styled(ActionButton)`
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  box-shadow: var(--shadow-sm);
  
  &:hover:not(:disabled) {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: var(--color-secondary);
  color: var(--color-text-on-primary);
  border: 1px solid var(--color-border);
  
  &:hover:not(:disabled) {
    background-color: var(--color-background-secondary);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

export const LoadingButton = styled(Button)`
  position: relative;
  
  &.loading {
    color: transparent;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin: -10px 0 0 -10px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
    }
  }
`;

export const TabButton = styled.button<{ active?: boolean }>`
  ${buttonBaseCss}
  background-color: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-text)'};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? 'var(--color-primary-hover)' : 'var(--color-background-third)'};
  }
`;

export const ViewToggleButton = styled.button<{ active: boolean }>`
  ${buttonBaseCss}
  background-color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-background-third)'};
  color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)'};
  border: 1px solid ${props => props.active ? 'var(--color-primary)' : 'var(--color-border)'};
  
  &:hover {
    background-color: ${props => props.active ? 'var(--color-primary-hover)' : 'var(--color-border-light)'};
  }
`;

export const FilterButton = styled(Button)<{ active?: boolean }>`
  background-color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-background-third)'};
  color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)'};
  border: 1px solid ${props => props.active ? 'var(--color-primary)' : 'var(--color-border-light)'};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-background-secondary)'};
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--color-background);
`;

export const Header = styled.header`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
`;

export const HeaderTitle = styled.h1`
  font-size: var(--font-size-2xl);
  font-weight: 600;
`;

export const Nav = styled.nav`
  background-color: var(--color-card);
  border-bottom: 1px solid var(--color-border);
`;

export const NavList = styled.div`
  display: flex;
`;

export const NavButton = styled(BaseButton)<{ active: boolean }>`
  padding: var(--space-sm) var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  border-bottom: 2px solid ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  background: none;
  border: none;
  
  &:hover {
    color: var(--color-primary);
    background-color: var(--color-background);
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: var(--space-lg);
  overflow: auto;
`;

export const Card = styled(BaseCard)`
  margin-bottom: var(--space-lg);
`;

export const CardTitle = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--space-md);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  
  @media (min-width: ${constants.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: var(--space-md);
`;

export const Label = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-sm);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

export const Input = styled(BaseInput)`
  width: 100%;
  
  &:focus {
    box-shadow: var(--shadow-focus);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-input-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-sm) center;
  background-size: 16px 12px;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-focus);
  }
`;

export const TopicsContainer = styled.div`
  max-height: 10rem;
  overflow-y: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--space-sm);
`;

export const TopicItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--space-xs);
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ExamsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
  
  @media (min-width: var(--breakpoint-md)) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: var(--breakpoint-lg)) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ExamCard = styled(BaseCard)<{ active: boolean }>`
  border: 1px solid ${props => props.active ? 'var(--color-primary)' : 'var(--color-border)'};
  cursor: pointer;
  background-color: ${props => props.active ? 'var(--color-background)' : 'var(--color-card)'};
  
  &:hover {
    border-color: var(--color-primary);
  }
`;

export const ExamTitle = styled(Subtitle)`
  font-size: var(--font-size-md);
`;

export const ExamInfo = styled.p`
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-sm);
`;

export const PasswordBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--font-size-xs);
  background-color: var(--color-warning-light);
  color: var(--color-warning-dark);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 9999px;
`;

export const ExamViewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
`;

export const ExamViewTitle = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: 600;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: var(--space-sm);
`;