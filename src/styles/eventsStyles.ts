import styled from "styled-components";
import { Button } from "./buttons";

export const HeaderEvent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const AddButton = styled(Button)`
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

export const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
`;

export const ComponentWrapper = styled.div`
  margin-bottom: 3rem;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: var(--color-background);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
`;
