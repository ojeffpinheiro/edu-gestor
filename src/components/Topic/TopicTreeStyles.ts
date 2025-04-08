import styled from "styled-components";

export const TreeContainer = styled.div`
    margin - top: var(--space - lg);
`
    ;
export const TopicItem = styled.div<{ level: number; isExpanded: boolean }>`
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

export const TopicName = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space - sm);
    flex: 1;
`;

export const TopicActions = styled.div`
    display: flex;
    gap: var(--space - sm);
`

export const DisciplineTag = styled.span<{ discipline: 'Física' | 'Matemática' }>`
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

export const AreaTag = styled.span`
    display: inline - flex;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border - radius - sm);
    font-size: var(--font - size - xs);
    background-color: var(--color - background - third);
    color: var(--color - text - secondary);
    margin-left: var(--space - sm);
`