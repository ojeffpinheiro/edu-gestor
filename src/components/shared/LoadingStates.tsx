import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingStatesProps {
  type?: 'spinner' | 'dots' | 'progress' | 'skeleton';
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  progress?: number; // For progress type (0-100)
  fullScreen?: boolean;
  className?: string;
}

const LoadingStates: React.FC<LoadingStatesProps> = ({
  type = 'spinner',
  size = 'medium',
  color,
  text,
  progress = 0,
  fullScreen = false,
  className,
}) => {
  // Determine which loading indicator to render
  const renderLoadingIndicator = () => {
    switch (type) {
      case 'spinner':
        return <Spinner size={size} color={color} />;
      case 'dots':
        return <DotLoader size={size} color={color} />;
      case 'progress':
        return <ProgressBar progress={progress} color={color} />;
      case 'skeleton':
        return <SkeletonLoader />;
      default:
        return <Spinner size={size} color={color} />;
    }
  };

  // If fullScreen, render in a fullscreen container
  if (fullScreen) {
    return (
      <FullScreenContainer className={className}>
        <LoadingContainer>
          {renderLoadingIndicator()}
          {text && <LoadingText>{text}</LoadingText>}
        </LoadingContainer>
      </FullScreenContainer>
    );
  }

  // Regular render
  return (
    <LoadingContainer className={className}>
      {renderLoadingIndicator()}
      {text && <LoadingText>{text}</LoadingText>}
    </LoadingContainer>
  );
};

// Spinner Animation
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div<{ size: string; color?: string }>`
  width: ${props => 
    props.size === 'small' ? '1.25rem' : 
    props.size === 'large' ? '3rem' : '2rem'
  };
  height: ${props => 
    props.size === 'small' ? '1.25rem' : 
    props.size === 'large' ? '3rem' : '2rem'
  };
  border: 2px solid var(--color-background-third);
  border-top: 2px solid ${props => props.color || 'var(--color-primary)'};
  border-radius: 50%;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

// Dots Animation
const dotPulse = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
    opacity: 0;
  }
  40% { 
    transform: scale(1);
    opacity: 1;
  }
`;

const DotLoader = styled.div<{ size: string; color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &::before,
  &::after,
  & {
    content: '';
    width: ${props => 
      props.size === 'small' ? '0.5rem' : 
      props.size === 'large' ? '1rem' : '0.75rem'
    };
    height: ${props => 
      props.size === 'small' ? '0.5rem' : 
      props.size === 'large' ? '1rem' : '0.75rem'
    };
    background-color: ${props => props.color || 'var(--color-primary)'};
    border-radius: 50%;
    animation: ${dotPulse} 1.4s infinite ease-in-out;
  }

  &::before {
    content: '';
    animation-delay: -0.32s;
  }

  & {
    animation-delay: -0.16s;
  }
`;

// Progress Bar
const ProgressBar = styled.div<{ progress: number; color?: string }>`
  width: 100%;
  height: 0.5rem;
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-full);
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => `${props.progress}%`};
    background-color: ${props => props.color || 'var(--color-primary)'};
    border-radius: var(--border-radius-full);
    transition: width var(--transition-normal);
  }
`;

// Skeleton Animation
const skeletonLoading = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonLoader = styled.div`
  width: 100%;
  height: 1.5rem;
  border-radius: var(--border-radius-sm);
  background: linear-gradient(
    90deg,
    var(--color-background-third) 25%,
    var(--color-background-secondary) 50%,
    var(--color-background-third) 75%
  );
  background-size: 200px 100%;
  animation: ${skeletonLoading} 1.5s infinite linear;
  margin-bottom: 0.5rem;
`;

// Container styles
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-md);
`;

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--z-index-modal);
  backdrop-filter: blur(2px);
`;

const LoadingText = styled.p`
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
  text-align: center;
  margin: 0;
`;

export { LoadingStates };