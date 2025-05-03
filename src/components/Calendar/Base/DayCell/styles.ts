import styled from "styled-components";
import { mixins } from "../../../../styles/mixins";
import { constants } from "../../../../utils/consts";

export const Content = styled.div<{ isCurrentMonth?: boolean; hasEvent?: boolean }>`
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-sm);
  padding: var(--space-xs);
  min-height: 3.5rem;
  background-color: ${props => props.isCurrentMonth ? 'var(--color-background-third)' : 'var(--color-background-secondary)'};
  color: ${props => props.isCurrentMonth ? 'var(--color-text)' : 'var(--color-text-third)'};
  ${props => props.hasEvent && 'box-shadow: 0 0 0 1px var(--color-info);'}
`;

export const DayNumber = styled.div<{ isToday: boolean }>`
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-weight: ${props => props.isToday ? 'bold' : 'normal'};
  border-radius: var(--border-radius-full);
  background-color: ${props => props.isToday ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.isToday ? 'var(--color-text-on-primary)' : 'inherit'};
  margin-bottom: var(--space-xs);
`;

export const EventsContainer = styled.div`
  max-height: calc(100% - 30px);
`;

export const EventItem = styled.div<{ eventType?: string; eventColor?: string }>`
  font-size: var(--font-size-xs);
  padding: var(--space-xs) var(--space-xs);
  border-radius: var(--border-radius-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: var(--space-xs);
  width: 10vw;
  
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

export const MoreEventsLabel = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  cursor: pointer;
  text-align: center;
  margin-top: var(--space-xs);
  
  &:hover {
    text-decoration: underline;
  }
`;
