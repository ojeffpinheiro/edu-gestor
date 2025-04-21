import styled from "styled-components";

import { Input } from '../../styles/inputs';

const TreeContainer = styled.div`
    margin - top: var(--space - lg);
`
    ;
const TopicItem = styled.div<{ level: number; isExpanded: boolean }>`
    padding: var(--space - md);
    margin - left: ${({ level }) => `${level * 1.5}rem`};
    border-radius: var(--border-radius-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-background-secondary);

    margin-bottom: var(--space-xs);
    transition: all 0.2s;
    cursor: pointer;
    
    &:hover { background-color: var(--color-background-third) };

    ${({ isExpanded }) => isExpanded && (`
        border-left: 3px solid var(--color - primary);
        font - weight: 500;
    `)};
`

const TopicName = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space - sm);
    flex: 1;
`;

const TopicActions = styled.div`
    display: flex;
    gap: var(--space - sm);
`

const DisciplineTag = styled.span<{ discipline: 'Física' | 'Matemática' }>`
    display: inline - flex;
    align - items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border - radius - sm);
    font-size: var(--font - size - xs);
    font-weight: 500;
    background-color: ${({ discipline }) =>
        discipline === 'Física' ? 'rgba(52, 152, 219, 0.2)' : 'rgba(46, 204, 113, 0.2)'
    };
    color: ${({ discipline }) =>
        discipline === 'Física' ? '#3498db' : '#27ae60'};
`;

const AreaTag = styled.span`
    display: inline - flex;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border - radius - sm);
    font-size: var(--font - size - xs);
    background-color: var(--color - background - third);
    color: var(--color - text - secondary);
    margin-left: var(--space - sm);
`

const FilterContainer = styled.div`
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  
  svg {
    position: absolute;
    left: var(--space-md);
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-third);
  }
`;

const SearchInput = styled(Input)`
  padding-left: 2.5rem;
  width: 100%;
`;

export const TopicTreeStyles = { TreeContainer, TopicItem, TopicName, TopicActions, DisciplineTag, AreaTag };

export const TopicFilterStyles = { FilterContainer, SearchContainer, SearchInput };