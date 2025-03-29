import { css } from "styled-components";

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