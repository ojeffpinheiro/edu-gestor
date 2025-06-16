import styled from 'styled-components';

export const DropZone = styled.div<{ isOver?: boolean }>`
  border: 2px dashed ${({ isOver, theme }) => 
    isOver ? theme.colors.primary : theme.colors.border};
  padding: 1rem;
  border-radius: 8px;
  min-height: 200px;
  background-color: ${({ isOver }) => isOver ? 'rgba(0,0,0,0.05)' : 'transparent'};
  transition: all 0.2s ease;
`;

export const LessonCard = styled.div.attrs({
  ref: (ref: any) => ref,
})`
  background: white;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  cursor: move;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  }
`;