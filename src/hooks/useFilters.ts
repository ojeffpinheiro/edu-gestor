import { useState } from "react";
import { EventTypeConfig } from "../utils/consts";
import { EventType } from "../utils/types/CalendarEvent";

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
};