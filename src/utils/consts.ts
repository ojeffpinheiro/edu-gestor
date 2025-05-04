import { EventType } from "./types/CalendarEvent";

export const constants = {
  colors: {
    primary: 'var(--color-primary, #2196f3)',
    primaryHover: 'var(--color-primary-hover, #1976d2)',
    background: {
      main: 'var(--color-background, #ffffff)',
      secondary: 'var(--color-background-secondary, #fafafa)',
      third: 'var(--color-background-third, #f5f5f5)',
    },
    text: {
      main: 'var(--color-text, #333333)',
      secondary: 'var(--color-text-secondary, #666666)',
      third: 'var(--color-text-third, #757575)',
      onPrimary: 'var(--color-text-on-primary, #ffffff)',
    },
    border: {
      main: 'var(--color-border, #e0e0e0)',
      light: 'var(--color-border-light, #eeeeee)',
    },
    event: {
      class: {
        bg: 'var(--color-success, #c8e6c9)',
        text: 'var(--color-success-text, #2e7d32)',
        border: 'var(--color-success-border, #2e7d32)',
      },
      meeting: {
        bg: 'var(--color-info, #bbdefb)',
        text: 'var(--color-info-text, #0d47a1)',
        border: 'var(--color-info-border, #0d47a1)',
      },
      deadline: {
        bg: 'var(--color-error, #ffccbc)',
        text: 'var(--color-error-text, #bf360c)',
        border: 'var(--color-error-border, #bf360c)',
      },
      holiday: {
        bg: 'var(--color-primary, #d1c4e9)',
        text: 'var(--color-primary-text, #4527a0)',
        border: 'var(--color-primary-border, #4527a0)',
      },
      personal: {
        bg: 'var(--color-warning, #fff9c4)',
        text: 'var(--color-warning-text, #f57c00)',
        border: 'var(--color-warning-border, #f57c00)',
      },
    },
    status: {
      success: 'var(--color-success, #4caf50)',
      successBg: "#e6f7e6",
      error: 'var(--color-error, #f44336)',
      errorBg: "#fff1f0",
      warning: 'var(--color-warning, #ff9800)',
      warningBg: "#fff7e6",
      info: 'var(--color-info, #2196f3)',
      infoBg: "#e6f7ff",
      purple: "#722ed1",
      purpleBg: "#f9f0ff"
    },
  },
  spacing: {
    xs: 'var(--space-xs, 4px)',
    sm: 'var(--space-sm, 8px)',
    md: 'var(--space-md, 16px)',
    lg: 'var(--space-lg, 24px)',
    xl: 'var(--space-xl, 32px)',
  },
  borderRadius: {
    sm: 'var(--border-radius-sm, 4px)',
    md: 'var(--border-radius-md, 8px)',
    lg: 'var(--border-radius-lg, 12px)',
    full: 'var(--border-radius-full, 999px)',
  },
  fontSize: {
    xs: 'var(--font-size-xs, 0.7rem)',
    sm: 'var(--font-size-sm, 0.85rem)',
    md: 'var(--font-size-md, 1rem)',
    lg: 'var(--font-size-lg, 1.25rem)',
    xl: "var(--font-size-xl)",
    "2xl": "var(--font-size-2xl)",
  },
  shadows: {
    sm: 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))',
    md: 'var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1))',
    lg: 'var(--shadow-lg, 0 10px 15px rgba(0,0,0,0.1))',
  },
  transitions: {
    fast: 'var(--transition-fast, 0.2s ease)',
    normal: 'var(--transition-normal, 0.3s ease)',
  },
  zIndex: {
    modal: 'var(--z-index-modal, 1000)',
  },
  breakpoints: {
    xs: "576px",
    sm: "768px",
    md: "992px",
    lg: "1200px",
  },
};

export interface EventTypeConfig {
  id: number;
  type: EventType;
  color: string;
  name: string;
}

export const eventTypeColors: EventTypeConfig[] = [
  { id: 1, type: 'class', color: '#4CAF50', name: 'Aula' },
  { id: 2, type: 'assessment', color: '#F44336', name: 'Avaliação' },
  { id: 3, type: 'holiday', color: '#FF9800', name: 'Feriado' },
  { id: 4, type: 'break', color: '#9E9E9E', name: 'Intervalo' },
  { id: 5, type: 'meeting', color: '#2196F3', name: 'Reunião' },
  { id: 6, type: 'results_delivery', color: '#673AB7', name: 'Entrega de Resultados' },
  { id: 7, type: 'training', color: '#009688', name: 'Treinamento' },
  { id: 8, type: 'important_date', color: '#FF5722', name: 'Data Importante' },
  { id: 9, type: 'external_assessment', color: '#E91E63', name: 'Avaliação Externa' },
  { id: 10, type: 'thematic_week', color: '#3F51B5', name: 'Semana Temática' },
  { id: 11, type: 'asynchronous_class', color: '#00BCD4', name: 'Aula Assíncrona' },
  { id: 12, type: 'participatory_council', color: '#8BC34A', name: 'Conselho Participativo' },
  { id: 13, type: 'deadline', color: '#607D8B', name: 'Prazo' },
  { id: 14, type: 'saturday_class', color: '#795548', name: 'Aula de Sábado' },
  { id: 15, type: 'personal', color: '#9C27B0', name: 'Pessoal' },
  { id: 16, type: 'other', color: '#CDDC39', name: 'Outro' }
] as const;