import styled from "styled-components";
import { fadeIn, slideIn } from "./animations";
import { modalSizes } from "./modalAnimation";

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: var(--space-md);
    backdrop-filter: blur(3px);
    transition: all 0.3s ease;
`;

export const ModalContent = styled.div<{ size: 'sm' | 'md' | 'lg' | 'xl' | 'full' }>`
    background: var(--color-card, #ffffff);
    border-radius: var(--border-radius-lg, 0.75rem);
    width: ${props => modalSizes[props.size || 'md'].width};
    max-height: ${props => props.size === 'full' ? '90vh' : '90vh'};
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-xl, 0 8px 30px rgba(0, 0, 0, 0.25));
    animation: ${fadeIn} 0.3s ease-out;
    overflow: auto;
    border: 1px solid var(--color-border-light);
    
    /* Tamanhos específicos baseados na propriedade size */
    ${props => {
      const sizeConfig = modalSizes[props.size || 'md'];
      return `
        width: ${sizeConfig.width};
        max-width: ${sizeConfig.width};
      `;
    }}
  
    @media (max-width: 576px) {
        max-height: 95vh;
        max-width: 100%;
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md, 1rem) var(--space-lg, 1.5rem);
    border-bottom: 1px solid var(--color-border-light);
    background-color: var(--color-background-third, #f7f9fc);
    border-radius: var(--border-radius-lg, 0.75rem) var(--border-radius-lg, 0.75rem) 0 0;

    h3 {
        margin: 0;
        font-size: var(--font-size-xl, 1.25rem);
        color: var(--color-text, #2d3748);
        font-weight: 600;
    }
`;

export const ModalBody = styled.div`
    overflow-y: auto;
    flex: 1;
    animation: ${slideIn} 0.3s ease-out;
    position: relative;
    padding: var(--space-md);
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: var(--color-background-secondary);
        border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: var(--color-border);
        border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: var(--color-text-third);
    }
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md, 1rem);
    padding: var(--space-md, 1rem) var(--space-lg, 1.5rem);
    border-top: 1px solid var(--color-border-light);
    background-color: var(--color-background-secondary, #ffffff);
    
    .navigation-buttons {
        display: flex;
        gap: var(--space-md);
        margin-left: auto;
    }
`;

export const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: var(--color-text-on-primary);
    
    h3 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
    }
`;
export const Grid2Columns = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

export const StyledInputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
`;

export const InfoBox = styled.div`
  background-color: var(--color-info);
  color: var(--color-text-on-primary);
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-md);
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  
  svg {
    margin-top: 3px;
  }
`;