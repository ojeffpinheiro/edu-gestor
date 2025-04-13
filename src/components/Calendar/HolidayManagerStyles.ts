import styled from "styled-components";
import { fadeIn, slideUp } from "../../styles/animations";
import { ActionButton, Button } from "../../styles/buttons";
import { BaseCard } from "../../styles/baseComponents";

export const HolidayManagerContainer = styled(BaseCard)`
  width: 100%;
  margin-bottom: var(--space-lg);
  animation: ${fadeIn} 0.3s ease-in-out;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
`;

export const HolidayManagerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg);
  border-bottom: 1px solid var(--color-border-light);
  background-color: var(--color-background-third);
`;

export const HolidayTitle = styled.h2`
  color: var(--color-title-card);
  font-size: var(--font-size-xl);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

export const AddHolidayButton = styled(Button)`
  background-color: var(--color-success);
  
  &:hover:not(:disabled) {
    background-color: var(--color-success-hover);
  }
`;

export const HolidayList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-lg);
  max-height: 500px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-background-third);
    border-radius: var(--border-radius-sm);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: var(--border-radius-sm);
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-third);
  }
`;

export const MonthSection = styled.div`
  margin-bottom: var(--space-lg);
`;

export const MonthTitle = styled.h3`
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
  margin-bottom: var(--space-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  padding-bottom: var(--space-xs);
  border-bottom: 1px solid var(--color-border-light);
`;

export const HolidayItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  border-left: 4px solid var(--color-primary);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  animation: ${slideUp} 0.3s ease-out;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, var(--color-primary)10 0%, transparent 5%);
    opacity: 0.1;
    z-index: 0;
  }
`;

export const HolidayInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

export const HolidayName = styled.h3`
  margin: 0;
  color: var(--color-text);
  font-size: var(--font-size-md);
  font-weight: 600;
`;

export const HolidayDate = styled.p`
  margin: var(--space-xs) 0 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
`;

export const HolidayActions = styled.div`
  display: flex;
  gap: var(--space-sm);
  position: relative;
  z-index: 1;
`;

export const RecurringBadge = styled.span`
  font-size: var(--font-size-xs);
  background-color: var(--color-info)20;
  color: var(--color-info);
  padding: 0 var(--space-xs);
  border-radius: var(--border-radius-full);
  margin-left: var(--space-xs);
  display: inline-flex;
  align-items: center;
  gap: 2px;
`;

export const HolidayFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-lg);
  border-top: 1px solid var(--color-border-light);
  background-color: var(--color-background-secondary);
  animation: ${slideUp} 0.3s ease-out;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-md);
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

export const Checkbox = styled.input`
  cursor: pointer;
  width: 18px;
  height: 18px;
`;

export const SaveButton = styled(ActionButton)`
  background-color: var(--color-success);
  
  &:hover:not(:disabled) {
    background-color: var(--color-success-hover);
  }
`;

export const DeleteButton = styled(ActionButton)`
  background-color: var(--color-error);
  
  &:hover:not(:disabled) {
    background-color: var(--color-error-hover);
  }
`;

export const ConfirmationDialog = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-background-secondary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-md);
  z-index: 2;
  animation: ${fadeIn} 0.2s ease-out;
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  
  p {
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }
  
  div {
    display: flex;
    gap: var(--space-sm);
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-xl);
  color: var(--color-text-secondary);
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  &:before {
    content: '';
    width: 20px;
    height: 20px;
    margin-right: var(--space-sm);
    border: 2px solid var(--color-text-third);
    border-radius: 50%;
    border-top-color: var(--color-primary);
    animation: spin 1s linear infinite;
    display: inline-block;
  }
`;

export const ErrorAlert = styled.div`
  padding: var(--space-md);
  background-color: var(--color-error)20;
  color: var(--color-error);
  border-radius: var(--border-radius-md);
  margin: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  
  details {
    margin-top: var(--space-sm);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
`;

export const NoHolidaysMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  color: var(--color-text-secondary);
  text-align: center;
  
  svg {
    margin-bottom: var(--space-md);
    color: var(--color-text-third);
  }
`;

export const ErrorMessage = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: var(--space-xs);
`;
