import styled from "styled-components";
import { Button } from "../../../../../styles/buttons";

export const ScheduleHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const AddButton = styled(Button)`
  background: var(--gradient-primary);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  margin: 1rem 0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;