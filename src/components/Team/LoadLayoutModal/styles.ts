import styled from "styled-components";

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  gap: 1rem;
`;

export const LayoutList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const LayoutItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const LayoutInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  strong {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  span {
    font-size: 0.875rem;
    color: #666;
  }
`;

export const LayoutActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const DeleteButton = styled.button`
  background: #ffebee;
  color: #c62828;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #ffcdd2;
  }
`;