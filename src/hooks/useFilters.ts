import { useMemo, useState } from "react";
import { EventTypeConfig } from "../utils/consts";
import { EventType } from "../utils/types/CalendarEvent";
import { ClassPerformance, FilterState } from "../utils/types/Assessment";

// hooks/useFilters.ts
interface FilterOptions {
    types: Record<EventType, boolean>;
    schools: Record<string, boolean>;
    locations: Record<string, boolean>;
    timeRange: {
        start: Date | null;
        end: Date | null;
    };
}

export const useFilters = (eventTypes: EventTypeConfig[]) => {
    const [activeFilters, setActiveFilters] = useState<FilterOptions>({
        types: eventTypes.reduce((acc, type) => ({ ...acc, [type.type]: true }), {} as Record<EventType, boolean>),
        schools: {},
        locations: {},
        timeRange: { start: null, end: null }
    });

    const toggleFilter = (type: EventType) => {
        setActiveFilters(prev => ({
            ...prev,
            types: { ...prev.types, [type]: !prev.types[type] }
        }));
    };

    const toggleSchoolFilter = (school: string) => {
        setActiveFilters(prev => ({
            ...prev,
            schools: { ...prev.schools, [school]: !prev.schools[school] }
        }));
    };

    const toggleLocationFilter = (location: string) => {
        setActiveFilters(prev => ({
            ...prev,
            locations: { ...prev.locations, [location]: !prev.locations[location] }
        }));
    };

    const handleDateChange = (date: Date | null, field: 'start' | 'end') => {
        setActiveFilters(prev => ({
            ...prev,
            timeRange: { ...prev.timeRange, [field]: date }
        }));
    };

    const toggleAllTypeFilters = (activate: boolean) => {
        setActiveFilters(prev => ({
            ...prev,
            types: Object.keys(prev.types).reduce((acc, key) => ({
                ...acc,
                [key]: activate
            }), {} as Record<EventType, boolean>)
        }));
    };

    return {
        activeFilters,
        toggleFilter,
        toggleSchoolFilter,
        toggleLocationFilter,
        handleDateChange,
        toggleAllTypeFilters
    };
};// Novo hook useFilters.ts

export const useAssessmentFilters = (classPerformances: ClassPerformance[]) => {
  const [filters, setFilters] = useState<FilterState>({
    selectedClasses: [],
    selectedSubjects: [],
    selectedTimeRange: 'all'
  });

  const availableSubjects = useMemo(() => {
    return Array.from(new Set(
      classPerformances.flatMap(c => 
        c.subjects?.map(s => s.name) || []
      )
    ));
  }, [classPerformances]);

  const filteredClassPerformances = useMemo(() => {
    let result = [...classPerformances];
    
    if (filters.selectedClasses.length > 0) {
      result = result.filter(c => filters.selectedClasses.includes(c.classId));
    }
    
    if (filters.selectedSubjects.length > 0) {
      result = result.filter(c => 
        c.subjects?.some(s => filters.selectedSubjects.includes(s.name))
      );
    }
    
    return result;
  }, [classPerformances, filters.selectedClasses, filters.selectedSubjects]);

  return {
    filters,
    setFilters,
    availableSubjects,
    filteredClassPerformances
  };
};