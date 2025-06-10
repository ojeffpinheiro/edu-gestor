import styled from "styled-components";

export const EmptyContentMessage = styled.div`
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  
  p {
    font-size: var(--font-size-md);
    max-width: 500px;
  }
`;