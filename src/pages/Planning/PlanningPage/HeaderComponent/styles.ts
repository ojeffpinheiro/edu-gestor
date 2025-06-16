import styled from "styled-components";

export const Header = styled.header`
  background: linear-gradient(
    135deg,
    rgba(var(--glass-background-rgb), 0.85) 0%,
    rgba(var(--glass-background-rgb), 0.5) 100%
  );
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  color: var(--color-text-on-primary);
  padding: var(--space-lg) var(--space-md);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(
      135deg,
      rgba(var(--glass-background-rgb), 0.9) 0%,
      rgba(var(--glass-background-rgb), 0.6) 100%
    );
  }
`;

export const HeaderContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--color-text-on-primary);
  letter-spacing: -0.02em;
  margin: 0;
  background: linear-gradient(135deg, white, rgba(255,255,255,0.9));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
  opacity: 0.9;
`;