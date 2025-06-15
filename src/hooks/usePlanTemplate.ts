import { useCallback, useContext } from "react";
import { LessonPlan } from "../utils/types/DidacticSequence";
import { Team } from "../utils/types/Planning";
import PlanningContext from "../contexts/PlanningContext";

interface UsePlanTemplateReturn {
  generatePlanPreview: (templateId: string) => LessonPlan;
  getTeamPlans: (teamId: number) => LessonPlan[];
  saveLessonPlan: (plan: LessonPlan) => void;
}

export function usePlanTemplate(teamId: number): UsePlanTemplateReturn {
  const context = useContext(PlanningContext);

  if (!context) {
    throw new Error('usePlanTemplate must be used within a PlanningProvider');
  }

  const { state, dispatch } = context;

  const generatePlanPreview = (templateId: string): LessonPlan => {
    const team = state.teams.find((t: Team) => t.id === teamId);

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
  };

  const getTeamPlans = (teamId: number): LessonPlan[] => {
    const team = state.teams.find((t: Team) => t.id === teamId);
    if (!team) return [];

    return state.lessonPlans.filter((plan: LessonPlan) =>
      plan.classGroup === team.name
    );
  };

  const saveLessonPlan = useCallback((plan: LessonPlan) => {
    dispatch({ type: 'ADD_LESSON_PLAN', payload: plan });
  }, [dispatch]);

  return {
    generatePlanPreview,
    getTeamPlans,
    saveLessonPlan
  };
}