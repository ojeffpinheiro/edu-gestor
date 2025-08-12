import React from 'react'
import styled from 'styled-components';

interface DotsLoaderProps {
  size?: number;
  color?: string;
}

export const DotsLoader: React.FC<DotsLoaderProps> = ({ 
  size = 32,
  color = 'currentColor'
}) => (
  <DotsContainer size={size} color={color}>
    <div />
    <div />
    <div />
  </DotsContainer>
);

const DotsContainer = styled.div<{ size: number; color: string }>`
  display: flex;
  gap: 0.5rem;

  div {
    width: ${props => props.size / 3}px;
    height: ${props => props.size / 3}px;
    border-radius: 50%;
    background-color: ${props => props.color};
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