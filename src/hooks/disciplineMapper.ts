import { useMemo } from "react";
import { CategoryWithId } from "../components/Question/QuestionForm/type";

interface DisciplineMap {
  [discipline: string]: string[]; // Mapeia disciplina para IDs de categorias
}

export const createDisciplineMap = (categories: CategoryWithId[]): DisciplineMap => {
  return categories.reduce((map, category) => {
    // Assumindo que cada categoria tem uma propriedade 'discipline'
    const discipline = (category as any).discipline || 'Geral';
    if (!map[discipline]) {
      map[discipline] = [];
    }
    map[discipline].push(category.id);
    return map;
  }, {} as DisciplineMap);
};

// Hook para usar o mapeamento
export const useDisciplineFilter = (categories: CategoryWithId[]) => {
  const disciplineMap = useMemo(() => createDisciplineMap(categories), [categories]);
  
  const getCategoriesByDiscipline = (discipline: string): string[] => {
    return disciplineMap[discipline] || [];
  };

  return { getCategoriesByDiscipline };
};