import React from 'react';
import styled from 'styled-components';
import Spinner from '../ui/Spinner';
import { Modal } from '../Modal';
import { Text } from '../../styles/typography';

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
  size?: 'small' | 'medium' | 'large'; // Alterado para corresponder ao SpinnerSize
  variant?: 'spinner' | 'dots' | 'bar';
  overlay?: boolean;
  fullScreen?: boolean;
}

const DotsAnimation = styled.div<{ size: number }>`
  display: flex;
  gap: 0.5rem;

  div {
    width: ${props => props.size / 3}px;
    height: ${props => props.size / 3}px;
    border-radius: 50%;
    background-color: currentColor;
    animation: pulse 1.5s ease-in-out infinite;

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.5; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.1); }
  }
`;

const ProgressBar = styled.div`
  width: 12rem;
  height: 0.25rem;
  background-color: var(--color-border);
  border-radius: 0.125rem;
  overflow: hidden;

  div {
    height: 100%;
    background-color: var(--color-primary);
    animation: progress 2s ease-in-out infinite;
  }

  @keyframes progress {
    0% { transform: translateX(-100%) scaleX(0); }
    50% { transform: translateX(50%) scaleX(0.5); }
    100% { transform: translateX(100%) scaleX(1); }
  }
`;

const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  message = 'Carregando...',
  size = 'medium',
  variant = 'spinner',
  overlay = true,
  fullScreen = false,
}) => {
  const spinnerSizeMap = {
    small: 24,
    medium: 32,
    large: 48,
  };

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return <DotsAnimation size={spinnerSizeMap[size]} />;
      case 'bar':
        return <ProgressBar><div /></ProgressBar>;
      default:
        return <Spinner size={size} />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      showCloseButton={false}
      className={fullScreen ? 'fixed inset-0' : ''}
      title=""
    >
      <div className={`flex flex-col items-center justify-center p-6 ${fullScreen ? 'h-screen' : ''}`}>
        {renderLoader()}
        {message && (
          <Text className="mt-4 text-center">
            {message}
          </Text>
        )}
      </div>
    </Modal>
  );
};

export default LoadingModal;