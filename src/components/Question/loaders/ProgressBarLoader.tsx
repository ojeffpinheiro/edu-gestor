import styled from 'styled-components';

export const ProgressBarLoader = styled.div`
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