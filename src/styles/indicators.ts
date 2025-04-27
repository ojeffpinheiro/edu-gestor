import styled from "styled-components";
import { constants } from "../utils/consts";
import { StatusType } from "../utils/types/UIComponent";

type DifficultyLevel = "easy" | "medium" | "hard";
type ContentType = "multiple_choice" | "true_false" | "essay" | "code" | "default";

interface BadgeProps {
  variant?: "success" | "error" | "warning" | 'info' | 'default' ;
  color?: keyof typeof constants.colors | string;
  size?: 'sm' | 'md';
}

const getStatusColor = (status: StatusType) => {
  switch (status) {
    case "draft":
      return { color: "warning", background: "warningBg" };
    case "active":
      return { color: "success", background: "successBg" };
    case "completed":
      return { color: "info", background: "infoBg" };
    case "pending":
      return { color: "info", background: "infoBg" };
    case "canceled":
      return { color: "error", background: "errorBg" };
    default:
      return { color: "textThird", background: "backgroundThird" };
  }
};

const getDifficultyColor = (level: DifficultyLevel) => {
  switch (level) {
    case "easy":
      return { color: "success", background: "successBg" };
    case "medium":
      return { color: "warning", background: "warningBg" };
    case "hard":
      return { color: "error", background: "errorBg" };
    default:
      return { color: "textThird", background: "backgroundThird" };
  }
};

const getTypeColor = (type: ContentType) => {
  switch (type) {
    case "multiple_choice":
      return { color: "info", background: "infoBg" };
    case "true_false":
      return { color: "success", background: "successBg" };
    case "essay":
      return { color: "purple", background: "purpleBg" };
    case "code":
      return { color: "warning", background: "warningBg" };
    default:
      return { color: "textThird", background: "backgroundThird" };
  }
};

// Badge para status ou tags
export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  padding: ${constants.spacing.xs} ${constants.spacing.sm};
  font-size: ${constants.fontSize.xs};
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background-color: var(--color-success);
          color: var(--color-text-on-primary);
        `;
      case 'error':
        return `
          background-color: var(--color-error);
          color: var(--color-text-on-primary);
        `;
      case 'warning':
        return `
          background-color: var(--color-warning);
          color: var(--color-text-on-primary);
        `;
      case 'info':
        return `
          background-color: var(--color-info);
          color: var(--color-text-on-primary);
        `;
      case 'default':
        return `
          background-color: var(--color-background-third);
          color: var(--color-text-secondary);
        `;
      default:
        return `
          background-color: var(--color-primary);
          color: var(--color-text-on-primary);
        `;
    }
  }}
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          padding: var(--space-xs) var(--space-sm);
          font-size: var(--font-size-xs);
        `;
      default:
        return `
          padding: var(--space-sm) var(--space-md);
          font-size: var(--font-size-sm);
        `;
    }
  }}
`;

// Indicador de passo
export const StepIndicator = styled.div<{
  active?: boolean;
  completed?: boolean;
  size?: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  ${props => {
    if (props.completed) {
      return `
        background-color: var(--color-success);
        color: var(--color-text-on-primary);
      `;
    } else if (props.active) {
      return `
        background-color: var(--color-primary);
        color: var(--color-text-on-primary);
      `;
    } else {
      return `
        background-color: var(--color-background-third);
        color: var(--color-text-secondary);
      `;
    }
  }}
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          width: 24px;
          height: 24px;
          font-size: var(--font-size-xs);
        `;
      case 'lg':
        return `
          width: 40px;
          height: 40px;
          font-size: var(--font-size-md);
        `;
      default:
        return `
          width: 32px;
          height: 32px;
          font-size: var(--font-size-sm);
        `;
    }
  }}
  
  font-weight: bold;
  transition: all 0.3s ease;
`;

// Alert/notificação
export const Alert = styled.div<{
  variant: 'success' | 'error' | 'warning' | 'info';
  withIcon?: boolean;
}>`
  padding: ${props => props.withIcon ? 'var(--space-md) var(--space-md) var(--space-md) var(--space-lg)' : 'var(--space-md)'};
  border-radius: var(--border-radius-md);
  position: relative;
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background-color: rgba(82, 196, 26, 0.1);
          border-left: 4px solid var(--color-success);
          color: var(--color-success);
        `;
      case 'error':
        return `
          background-color: rgba(245, 34, 45, 0.1);
          border-left: 4px solid var(--color-error);
          color: var(--color-error);
        `;
      case 'warning':
        return `
          background-color: rgba(250, 173, 20, 0.1);
          border-left: 4px solid var(--color-warning);
          color: var(--color-warning);
        `;
      case 'info':
        return `
          background-color: rgba(24, 144, 255, 0.1);
          border-left: 4px solid var(--color-info);
          color: var(--color-info);
        `;
    }
  }}
`;

export const StatusBadge = styled(Badge).attrs<{ status: StatusType }>(props => ({
  variant: "default",
  ...getStatusColor(props.status)
}))<{ status: StatusType }>``;

export const ActiveBadge = styled(Badge)`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
`;

export const DifficultyBadge = styled(Badge).attrs<{ level: DifficultyLevel }>(props => ({
  variant: "default",
  ...getDifficultyColor(props.level)
}))<{ level: DifficultyLevel }>``;

export const TypeBadge = styled(Badge).attrs<{ type: ContentType }>(props => ({
  variant: "default",
  ...getTypeColor(props.type)
}))<{ type: ContentType }>``;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${constants.spacing.xs};
`;