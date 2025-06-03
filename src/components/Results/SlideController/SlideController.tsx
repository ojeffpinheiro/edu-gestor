// components/SlideController/SlideController.tsx
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styled from 'styled-components';

interface SlideControllerProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
}

export const SlideControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.textSecondary};
`;

export const SlideButton = styled.button`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primary};
    color: white;
    border-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SlideController: React.FC<SlideControllerProps> = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
}) => {
  if (totalSlides <= 1) return null;

  return (
    <SlideControls>
      <SlideButton onClick={onPrev} disabled={currentSlide === 0}>
        <FiChevronLeft />
      </SlideButton>
      <span>
        {currentSlide + 1} / {totalSlides}
      </span>
      <SlideButton onClick={onNext} disabled={currentSlide === totalSlides - 1}>
        <FiChevronRight />
      </SlideButton>
    </SlideControls>
  );
};

export default SlideController;