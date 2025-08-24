import { useState, useMemo, useCallback } from 'react';
import { ClassPerformance, Subject } from '../types/academic/Assessment';

interface FilterState {
  period: 'all' | string;
  classId: 'all' | string;
  subject: 'all' | string;
  searchTerm: string;
}

interface UseFiltersReturn {
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  filteredData: ClassPerformance[];
  availableOptions: {
    periods: string[];
    subjects: Subject[];
    allClasses: ClassPerformance[];
  };
}

const initialFilters: FilterState = {
  period: 'all',
  classId: 'all',
  subject: 'all',
  searchTerm: ''
};

/**
 * Hook para filtragem de resultados de turmas
 * @param {ClassPerformance[]} classPerformances - Array completo de desempenhos de turma
 * @returns {UseFiltersReturn} Objeto contendo:
 *   - filters: Estado atual dos filtros
 *   - setFilter: Função para atualizar um filtro específico
 *   - resetFilters: Função para resetar todos os filtros
 *   - filteredData: Dados filtrados
 *   - availableOptions: Opções disponíveis para filtros
 */
export const useFilters = (classPerformances: ClassPerformance[]): UseFiltersReturn => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const availableOptions = useMemo(() => {
    const periods = Array.from(
      new Set(classPerformances
        .map(c => c.academicPeriod || '')
        .filter(Boolean)
      )
    );

    const subjectsMap = new Map<string, Subject>();
    classPerformances.forEach(c => {
      c.subjects?.forEach(subject => {
        if (!subjectsMap.has(subject.name)) {
          subjectsMap.set(subject.name, subject);
        }
      });
    });
    const subjects = Array.from(subjectsMap.values());

    return {
      periods,
      subjects,
      allClasses: classPerformances
    };
  }, [classPerformances]);

  const filteredData = useMemo(() => {
    return classPerformances.filter(classItem => {
      if (filters.period !== 'all' && classItem.academicPeriod !== filters.period) {
        return false;
      }

      if (filters.classId !== 'all' && classItem.classId !== filters.classId) {
        return false;
      }

      if (filters.subject !== 'all') {
        const hasSubject = classItem.subjects?.some(s =>
          typeof s === 'string' ? s === filters.subject : s.name === filters.subject
        );
        if (!hasSubject) return false;
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesName = classItem.className.toLowerCase().includes(searchLower);
        const matchesTeacher = classItem.teacher?.toLowerCase().includes(searchLower);

        if (!matchesName && !matchesTeacher) {
          return false;
        }
      }

      return true;
    });
  }, [classPerformances, filters]);

  const setFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return {
    filters,
    setFilter,
    resetFilters,
    filteredData,
    availableOptions
  };
};