// types.ts - Definições de tipos para o dashboard
import { ReactNode } from 'react';

/**
 * Tipo para um cartão de acesso rápido
 */
export interface AccessCard {
  id: string;
  title: string;
  description?: string;
  link: string;
  color: string;
  icon: React.ReactElement<{ 'aria-hidden'?: boolean }>;
}

/**
 * Tipo para uma notificação
 */
export interface NotificationType {
  id: number;
  mensagem: string;
  data: string;
  lida?: boolean;
  tipo?: 'info' | 'warning' | 'error';
}

/**
 * Tipo para uma atividade agendada
 */
export interface ActivityType {
  id: number;
  titulo: string;
  data: string;
  horario: string;
  local?: string;
  descricao?: string;
}

/**
 * Tipo base para itens de planejamento
 */
export interface BasePlanningItemType {
  completo: number;
  pendente: number;
  parcial?: number;
}

/**
 * Tipo para planejamento por série
 */
export interface SeriesPlanningItemType extends BasePlanningItemType {
  serie: string;
}

/**
 * Tipo para planejamento por turma
 */
export interface ClassPlanningItemType extends BasePlanningItemType {
  turma: string;
}

/**
 * Tipo união para qualquer tipo de item de planejamento
 */
export type PlanningItemType = SeriesPlanningItemType | ClassPlanningItemType;

/**
 * Tipo para resumo de disciplina
 */
export interface SubjectSummaryType {
  subject: string;
  classesTaught: number;
  classesPlanned: number;
  evaluations: number;
  progress: string;
}

/**
 * Tipo para resumo de turma
 */
export interface ClassSummaryType {
  className: string;
  students: number;
  averageAttendance: string;
  averagePerformance: string;
  pendingEvaluations: number;
}


/**
 * Props para o componente de Loading
 */
export interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullScreen?: boolean;
}

/**
 * Props para o componente de Erro
 */
export interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Props para o componente ErrorBoundary
 */
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

/**
 * Estado do componente ErrorBoundary
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface Notification {
  id: number;
  mensagem: string;
  data: string;
}

export interface Activity {
  id: number;
  titulo: string;
  data: string;
  horario: string;
}

export interface PlanningData {
  title: string;
  completo: number;
  pendente: number;
  parcial?: number;
}