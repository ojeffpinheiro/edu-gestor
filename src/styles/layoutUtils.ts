import styled, { css } from "styled-components";

export const flexRow = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const spaceBetween = css`
  justify-content: space-between;
`;

export const gap = (size: string) => css`
  gap: var(--space-${size});
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-md);
  
  @media (max-width: var(--breakpoint-sm)) {
    padding: 0 var(--space-sm);
  }
`;

export const Section = styled.section`
  padding: var(--space-xl) 0;
`;

export const Flex = styled.div<{
  direction?: 'row' | 'column';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'space-between';
  align?: 'start' | 'end' | 'center' | 'stretch';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.direction === 'column' ? 'column' : 'row'};
  
  ${props => {
    switch (props.justify) {
      case 'start': return 'justify-content: flex-start;';
      case 'end': return 'justify-content: flex-end;';
      case 'center': return 'justify-content: center;';
      case 'between': return 'justify-content: space-between;';
      case 'around': return 'justify-content: space-around;';
      default: return '';
    }
  }}
  
  ${props => {
    switch (props.align) {
      case 'start': return 'align-items: flex-start;';
      case 'end': return 'align-items: flex-end;';
      case 'center': return 'align-items: center;';
      case 'stretch': return 'align-items: stretch;';
      default: return '';
    }
  }}
  
  ${props => props.gap && `gap: var(--space-${props.gap});`}
  ${props => props.wrap && 'flex-wrap: wrap;'}
`;

export const Grid = styled.div<{
  columns?: number;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 12}, 1fr);
  ${props => props.gap && `gap: var(--space-${props.gap});`}
`;

export const Card = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-md);
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid var(--color-border);
  margin: var(--space-lg) 0;
`;