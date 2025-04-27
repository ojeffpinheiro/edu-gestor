import styled from "styled-components";
import { constants } from "../utils/consts";

interface TextProps {
  size?: keyof typeof constants.fontSize;
  weight?: string | number;
  color?: keyof typeof constants.colors | string;
  align?: "left" | "center" | "right" | "justify";
  transform?: "uppercase" | "lowercase" | "capitalize" | "none";
  lineHeight?: string | number;
}

export const Text = styled.p<TextProps>`
  font-size: ${props => props.size ? constants.fontSize[props.size] : constants.fontSize.md};
  font-weight: ${props => props.weight || "normal"};
  color: ${props => props.color ? (constants.colors[props.color as keyof typeof constants.colors] || props.color) : constants.colors.text};
  text-align: ${props => props.align || "left"};
  text-transform: ${props => props.transform || "none"};
  line-height: ${props => props.lineHeight || 1.5};
  margin: 0;
`;

export const TextSecondary = styled.span`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

export const Heading = styled(Text).attrs({ as: "h1" })<TextProps>`
  font-weight: ${props => props.weight || "600"};
  line-height: ${props => props.lineHeight || 1.2};
`;

export const Title = styled(Heading)`
  font-size: ${constants.fontSize.xl};
  font-weight: 700;
  margin-bottom: var(--space-md);
  color: ${constants.colors.primary};
  
  @media (max-width: ${constants.breakpoints.sm}) {
    font-size: ${constants.fontSize.lg};
  }
`;

export const Subtitle = styled(Heading).attrs({ as: "h2" })`
  font-size: ${constants.fontSize.lg};
  color: var(--color-title-card);
  margin-bottom: var(--space-md);
  
  @media (max-width: ${constants.breakpoints.sm}) {
    font-size: ${constants.fontSize.md};
  }
`;

export const Caption = styled(Text)`
  font-size: ${constants.fontSize.sm};
  color: ${constants.colors.text.secondary};
`;