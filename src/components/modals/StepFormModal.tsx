// components/modals/StepFormModal.tsx
import React, { ReactNode, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import { ModalOverlay } from '../../styles/baseComponents';
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from '../../styles/modals';
import { CloseButton } from '../../styles/buttons';

interface StepFormModalProps {
  isModalOpen: boolean;
  modalTitle: string;
  steps: {
    stepTitle: string;
    stepContent: ReactNode;
    validationHandler?: () => boolean;
  }[];
  currentActiveStep: number;
  closeOnClickOutside?: boolean;
  modalSize?: 'sm' | 'md' | 'lg';
  submitButtonText: string;
  isSubmitDisabled?: boolean;
  shouldHideNavigation?: boolean;
  onStepChange: (step: number) => void;
  onModalClose: () => void;
  onSubmitHandler: () => void;
}

/**
 * A multi-step modal component with progress tracking and validation
 */
const StepFormModal: React.FC<StepFormModalProps> = ({
  modalTitle,
  isModalOpen,
  closeOnClickOutside = true,
  steps,
  currentActiveStep,
  submitButtonText,
  isSubmitDisabled = false,
  modalSize = 'md',
  shouldHideNavigation = false,
  onStepChange,
  onModalClose,
  onSubmitHandler,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Manipula a tecla ESC para fechar o modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isModalOpen && event.key === 'Escape') {
        onModalClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    // Bloqueia o scroll quando o modal está aberto
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, onModalClose]);

  // Se o modal não estiver aberto, não renderiza nada
  if (!isModalOpen) return null;

  /**
   * Manipula o clique fora do modal para fechá-lo
   */
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnClickOutside && event.target === event.currentTarget) {
      onModalClose();
    }
  };

  const completionPercentage = ((currentActiveStep + 1) / steps.length) * 100;
  const isFinalStep = currentActiveStep === steps.length - 1;

  /**
   * Handles navigation to the next step with validation
   */
  const handleNextStep = () => {
    const currentStepValidation = steps[currentActiveStep].validationHandler;

    if (currentStepValidation && !currentStepValidation()) {
      return; // Prevent navigation if validation fails
    }

    if (currentActiveStep < steps.length - 1) {
      onStepChange(currentActiveStep + 1);
    }
  };

  /**
   * Handles navigation to the previous step
   */
  const handlePreviousStep = () => {
    if (currentActiveStep > 0) {
      onStepChange(currentActiveStep - 1);
    }
  };

  /**
   * Handles form submission with validation
   */
  const handleFormSubmission = () => {
    const currentStepValidation = steps[currentActiveStep].validationHandler;
  
    if (currentStepValidation && !currentStepValidation()) {
      return;
    }
  
    onSubmitHandler();
    onModalClose();
  };

  return (
    <ModalOverlay
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="modal-backdrop">
      <ModalContent
        size={modalSize}
        ref={modalRef}
        className="modal"
        role="document"
        aria-describedby="modal-content">
        <ModalHeader>
          <h3 id="modal-title">{modalTitle}</h3>
          <CloseButton onClick={onModalClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ProgressBar value={completionPercentage} max={100} />

        <ModalBody>
          <StepsIndicator>
            {steps.map((step, index) => (
              <React.Fragment key={`step-${index}`}>
                <Step
                  $isActive={index === currentActiveStep}
                  $isCompleted={index < currentActiveStep}
                  onClick={() => index < currentActiveStep && onStepChange(index)}
                  $isClickable={index < currentActiveStep}
                >
                  {index + 1}
                  <StepLabel>{step.stepTitle}</StepLabel>
                </Step>
                {index < steps.length - 1 && (
                  <StepDivider $isActive={index + 1 < currentActiveStep} />
                )}
              </React.Fragment>
            ))}
          </StepsIndicator>

          <StepContent>
            {steps[currentActiveStep].stepContent}
          </StepContent>
        </ModalBody>

        {!shouldHideNavigation && (
          <ModalFooter>
            {currentActiveStep > 0 && (
              <NavigationButton $variant="secondary"
                onClick={handlePreviousStep}
                aria-label="Voltar para etapa anterior"
                data-testid="previous-step-button">
                Voltar
              </NavigationButton>
            )}
            {!isFinalStep ? (
              <NavigationButton onClick={handleNextStep}>
                Próximo
              </NavigationButton>
            ) : (
              <NavigationButton
                onClick={handleFormSubmission}
                disabled={isSubmitDisabled}
              >
                {submitButtonText}
              </NavigationButton>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

const ProgressBar = styled.progress`
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-progress-bar {
    background-color: #e9ecef;
  }

  &::-webkit-progress-value {
    background-color: #007bff;
    transition: width 0.3s ease;
  }

  &::-moz-progress-bar {
    background-color: #007bff;
    transition: width 0.3s ease;
  }
`;

const StepsIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 2.5rem;
`;

interface StepProps {
  $isActive: boolean;
  $isCompleted: boolean;
  $isClickable: boolean;
}

const Step = styled.div<StepProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  background-color: ${props =>
    props.$isCompleted ? '#28a745' :
      props.$isActive ? '#007bff' : '#e9ecef'};
  color: ${props =>
    (props.$isActive || props.$isCompleted) ? 'white' : '#6c757d'};
  transition: all 0.3s ease;
  position: relative;
  cursor: ${props => props.$isClickable ? 'pointer' : 'default'};

  &:hover {
    background-color: ${props =>
    props.$isClickable ?
      (props.$isCompleted ? '#218838' : '#0069d9') :
      (props.$isCompleted ? '#28a745' :
        props.$isActive ? '#007bff' : '#e9ecef')};
  }
`;

const StepLabel = styled.span`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  white-space: nowrap;
  margin-top: 0.25rem;
  color: #6c757d;
`;

interface StepDividerProps {
  $isActive: boolean;
}

const StepDivider = styled.div<StepDividerProps>`
  height: 2px;
  width: 40px;
  background-color: ${props => props.$isActive ? '#28a745' : '#e9ecef'};
  transition: all 0.3s ease;
`;

const StepContent = styled.div`
  min-height: 200px;
`;

interface NavigationButtonProps {
  $variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const NavigationButton = styled.button<NavigationButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  border: 1px solid;
  
  background-color: ${props => {
    if (props.disabled) return '#e9ecef';
    return props.$variant === 'secondary' ? 'white' : '#007bff';
  }};
  
  color: ${props => {
    if (props.disabled) return '#6c757d';
    return props.$variant === 'secondary' ? '#6c757d' : 'white';
  }};
  
  border-color: ${props => {
    if (props.disabled) return '#ced4da';
    return props.$variant === 'secondary' ? '#ced4da' : '#007bff';
  }};
  
  opacity: ${props => props.disabled ? 0.65 : 1};

  &:hover {
    background-color: ${props => {
    if (props.disabled) return '#e9ecef';
    return props.$variant === 'secondary' ? '#f8f9fa' : '#0069d9';
  }};
    
    border-color: ${props => {
    if (props.disabled) return '#ced4da';
    return props.$variant === 'secondary' ? '#cbd3da' : '#0062cc';
  }};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(1px)'};
  }
`;

export default StepFormModal;