import { useState } from 'react';

export const useEvaluationFilters = () => {
    const [schoolFilter, setSchoolFilter] = useState<string>('');
    const [trimesterFilter, setTrimesterFilter] = useState<string>('');
    const [seriesFilter, setSeriesFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');

    return {
        filters: {
            schoolFilter,
            trimesterFilter,
            seriesFilter,
            typeFilter,
            statusFilter
        },
        filterFunctions: {
            setSchoolFilter,
            setTrimesterFilter,
            setSeriesFilter,
            setTypeFilter,
            setStatusFilter
        }
    };
};