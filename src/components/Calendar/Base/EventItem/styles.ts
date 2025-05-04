import styled from "styled-components";
import { mixins } from "../../../../styles/mixins";
import { constants } from "../../../../utils/consts";

export const EventContainer = styled.div<{ eventType?: string; eventColor?: string; size?: string }>`
  padding: var(--space-xs) var(--space-xs);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  margin-top: var(--space-xs);
  width: 100%;
  
  max-width: 13vw;

  ${({ size }) => {
    switch (size) {
      case "xs":
        return `
          max-width: 13vw;
        `;
      case "sm":
        return `
          max-width: 20vw;
        `;
      case "md":
        return `max-width: 30vw;
        `;
      case "lg":
        return `max-width: 95vw;`;
      case "xl":
        return `max-width: 13vw;`;
      default:
        return ``;
    }
  }}
  
  ${({ eventType, eventColor }) => {
    // Se uma cor personalizada foi fornecida, use-a
    if (eventColor) {
      return `
          background-color: ${eventColor}20;
          color: ${eventColor};
          border-left: 2px solid ${eventColor};
        `;
    }

    // Cores padrão para tipos de eventos usando as variáveis do tema
    const typeStyles = {
      class: `
          background-color: var(--color-success)20;
          color: var(--color-success);
          border-left: 2px solid var(--color-success);
        `,
      meeting: `
          background-color: var(--color-info)20;
          color: var(--color-info);
          border-left: 2px solid var(--color-info);
        `,
      deadline: `
          background-color: var(--color-error)20;
          color: var(--color-error);
          border-left: 2px solid var(--color-error);
        `,
      holiday: `
          background-color: var(--color-primary)20;
          color: var(--color-primary);
          border-left: 2px solid var(--color-primary);
        `,
      personal: `
          background-color: var(--color-warning)20;
          color: var(--color-warning);
          border-left: 2px solid var(--color-warning);
        `,
      default: `
          background-color: var(--color-info)20;
          color: var(--color-info);
          border-left: 2px solid var(--color-info);
        `
    };

    // @ts-ignore - Acessando propriedade dinâmica
    return typeStyles[eventType] || typeStyles.default;
  }}
  
  ${props => mixins.getEventStyles(props.eventType, props.eventColor)}
  cursor: pointer;
  transition: filter ${constants.transitions.fast};
    
    &:hover {
      filter: brightness(0.95);
    }
`;

export const TimeLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  margin-right: 0.5rem;
`;

export const EventTitle = styled.span`
  font-weight: 500;
`;