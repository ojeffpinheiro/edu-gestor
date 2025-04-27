import styled, { css } from "styled-components";
import { constants } from "../utils/consts";

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

export const center = css`
  justify-content: center;
  align-items: center;
`;

export const alignCenter = css`
  align-items: center;
`;

export const gap = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => css`
  gap: var(--space-${size});
`;


export const marginTop = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => css`
  margin-top: var(--space-${size});
`;

export const marginBottom = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => css`
  margin-bottom: var(--space-${size});
`;

export const padding = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => css`
  padding: var(--space-${size});
`;

// Grid utilities
export const grid = (columns: number, gap: string) => css`
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  gap: var(--space-${gap});
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Media queries
export const mobile = (content: any) => css`
  @media (max-width: 768px) {
    ${content}
  }
`;

export const tablet = (content: any) => css`
  @media (max-width: 1024px) and (min-width: 769px) {
    ${content}
  }
`;

export const responsiveBreakpoint = css`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

export const Typography = {
  heading: css`
    margin: 0;
    color: var(--color-text, #2d3748);
    font-weight: 600;
  `,

  headingLarge: css`
    font-size: var(--font-size-xl, 1.5rem);
  `,

  headingMedium: css`
    font-size: var(--font-size-lg, 1.25rem);
  `,

  headingSmall: css`
    font-size: var(--font-size-md, 1rem);
  `,

  body: css`
    color: var(--color-text, #2d3748);
    font-size: var(--font-size-md, 1rem);
    line-height: 1.5;
  `,

  caption: css`
    color: var(--color-text-secondary, #4a5568);
    font-size: var(--font-size-sm, 0.875rem);
  `,

  label: css`
    display: block;
    margin-bottom: var(--space-xs, 0.25rem);
    color: var(--color-text-secondary, #4a5568);
    font-size: var(--font-size-sm, 0.875rem);
    font-weight: 500;
  `
};

export const Container = styled.div<{
  maxWidth?: string;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}>`
  width: 100%;
  max-width: ${props => props.maxWidth || '95vw'};
  margin: 0 auto;
  padding: ${props => props.padding ? `var(--space-${props.padding})` : 'var(--space-lg)'};

  @media (max-width: var(--breakpoint-sm)) {
    padding: 0 var(--space-sm);
  }
`;

export const Section = styled.section`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-lg);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${constants.spacing.md};
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
  mobileColumns?: string;
  rowGap?: keyof typeof constants.spacing | string;
  columnGap?: keyof typeof constants.spacing | string;
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 12}, 1fr);
  gap: ${props => props.gap ? `var(--space-${props.gap})` : 'var(--space-md)'};
  row-gap: ${props => props.rowGap 
    ? (constants.spacing[props.rowGap as keyof typeof constants.spacing] || props.rowGap) 
    : undefined};
  column-gap: ${props => props.columnGap 
    ? (constants.spacing[props.columnGap as keyof typeof constants.spacing] || props.columnGap) 
    : undefined};
  
  @media (max-width: 768px) {
    grid-template-columns: ${props => props.mobileColumns || '1fr'};
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--space-lg) 0;
`;

export const CircleDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  margin: var(--space-md) 0;
  text-align: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    border-top: 1px solid var(--color-border-light);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  span {
    background-color: var(--color-background-secondary);
    padding: 0 var(--space-sm);
    z-index: 1;
    color: var(--color-text-secondary);
  }
`;

export const EquationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: var(--space-xl);
`