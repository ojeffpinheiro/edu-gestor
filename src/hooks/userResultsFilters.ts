import { useState, useMemo, useCallback } from 'react';
import { ClassPerformance } from '../utils/types/Assessment';

interface FilterState {
  period: string | 'all';
  classId: string | 'all';
  subject: string | 'all';
  searchTerm: string;
}

interface UseFiltersReturn {
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  filteredData: ClassPerformance[];
  availableOptions: {
    periods: string[];
    subjects: string[];
    allClasses: ClassPerformance[];
  };
}

const initialFilters: FilterState = {
  period: 'all',
  classId: 'all',
  subject: 'all',
  searchTerm: ''
};

export const useFilters = (classPerformances: ClassPerformance[]): UseFiltersReturn => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const availableOptions = useMemo(() => {
    const periods = Array.from(
      new Set(classPerformances
        .map(c => c.academicPeriod)
        .filter(Boolean) as string[]
      )
    );

    const subjects = Array.from(
      new Set(classPerformances
        .flatMap(c => c.subjects || [])
      )
    );

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

      if (filters.subject !== 'all' && !classItem.subjects?.includes(filters.subject)) {
        return false;
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
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
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