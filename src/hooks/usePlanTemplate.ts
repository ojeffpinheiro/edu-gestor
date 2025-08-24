import { useCallback } from "react";
import { LessonPlan } from "../types/academic/DidacticSequence";
import { usePlanningContext } from "../contexts/PlanningContext";

interface UsePlanTemplateReturn {
  generatePlanPreview: (templateId: string) => LessonPlan;
  getTeamPlans: (teamId: number) => LessonPlan[];
  saveLessonPlan: (plan: LessonPlan) => void;
}

export function usePlanTemplate(teamId: number): UsePlanTemplateReturn {
  const { state, dispatch } = usePlanningContext();

  const generatePlanPreview = useCallback((templateId: string): LessonPlan => {
    const team = state.teams.find(t => t.id === teamId);
    return {
      id: `preview-${Date.now()}`,
      sequenceId: templateId,
      title: "Pré-visualização de Plano",
      description: "",
      duration: 50,
      discipline: 'Matemática',
      applicationWeek: new Date().toISOString(),
      status: 'Em planejamento',
      classGroup: team?.name || '',
      type: 'Aula',
      objectives: [],
      skills: [],
      bnccCodes: [],
      developedSkills: [],
      learningObjectives: [],
      methodologies: [],
      knowledgeObjects: [],
      necessaryResources: [],
      contentExplanation: "",
      solvedExercises: [],
      evaluation: {
        type: "",
        criteria: [],
        weight: 0,
        registrationText: ""
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }, [state.teams, teamId]);

  const getTeamPlans = useCallback((teamId: number): LessonPlan[] => {
    const team = state.teams.find(t => t.id === teamId);
    if (!team) return [];
    return state.lessonPlans.filter(plan => plan.classGroup === team.name);
  }, [state.teams, state.lessonPlans]);

  const saveLessonPlan = useCallback((plan: LessonPlan) => {
    dispatch({ type: 'ADD_LESSON_PLAN', payload: plan });
  }, [dispatch]);

  return {
    generatePlanPreview,
    getTeamPlans,
    saveLessonPlan
  };
}