import styled from "styled-components";

export const SectionContainer = styled.div`
    margin-bottom: var(--space-md);
    border: 1px solid var(--color-border, #e2e8f0);
    border-radius: var(--border-radius-sm, 0.25rem);
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    box-shadow: var(--shadow-sm);
    
    &:hover {
        box-shadow: var(--shadow-md);
    }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background-third, #f7f9fc);
  padding: var(--space-sm) var(--space-md);
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: var(--color-background-hover, #e5e7eb);
  }
`;

export const IconWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(0)" : "rotate(-180deg)")};
  width: 24px;
  height: 24px;
  border-radius: var(--border-radius-full);
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
`;

export const SectionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.4s ease-in-out, padding 0.3s;
  padding: ${({ isOpen }) => (isOpen ? "var(--space-md)" : "0")};
  background-color: var(--color-card);
`;