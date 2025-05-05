import React from 'react'
import { FaAngleDown, FaAngleUp, FaCheck, FaFilter, FaTimes } from "react-icons/fa";
import { FilterButton, FiltersContainer } from "../../filterStyles";
import { FilterSectionHeader } from "../FilterSection/styles";
import { ActiveFiltersBadge, CategoryHeader, CategoryToggle, DateRangeContainer, FilterCategory, FilterContent, FilterGrid, FilterItem, FilterList } from "../../Views/AnnualView/styles";
import { ActionButton } from "../../../Events/EventListStyle";
import { constants, EventTypeConfig } from '../../../../utils/consts';

import { SearchInput } from '../../../../styles/formControls';
import DatePicker from 'react-datepicker';
import { Checkbox } from '@mui/material';
import { CollapsedSectionsState, EventCategory, FilterOptions } from '../../Views/AnnualView';
import { FilterSection } from './styles';
import { useFilters } from '../../../../hooks/useFilters';

interface FilterPanelProps {
    collapsedSections: CollapsedSectionsState;
    activeFilters: FilterOptions;
    eventTypes: EventTypeConfig[];
    eventCategories: EventCategory[];
    filteredSchools: string[];
    filteredLocations: string[];
    onHeaderClick: () => void;
    collapsedSectionsClick: (section: string) => void;
    countActiveFiltersInCategory: (category: string) => number;
    toggleCategoryFilters: (category: EventCategory, activate: boolean) => void;
    onChangeSchoolSearchTerm : (term: string) => void;
    onChangeCollapsedSections: (sections: CollapsedSectionsState) => void;
    onChangeLocationSearch: (term: string) => void;
    onChangeDate: (date: Date | null, type: 'start' | 'end') => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    collapsedSections,
    eventTypes,
    eventCategories,
    filteredSchools,
    filteredLocations,
    collapsedSectionsClick,
    onHeaderClick,
    countActiveFiltersInCategory,
    toggleCategoryFilters,
    onChangeSchoolSearchTerm,
    onChangeCollapsedSections,
    onChangeLocationSearch,
    onChangeDate
}) => {
    const { activeFilters, toggleAllTypeFilters, toggleFilter, toggleSchoolFilter, toggleLocationFilter } = useFilters(eventTypes);
    return (
        <FiltersContainer>
            <FilterSectionHeader
                onClick={onHeaderClick}>
                <div style={{ display: 'flex', alignItems: 'center', gap: constants.spacing.sm }}>
                    <FaFilter />
                    <span>Filtros Avançados</span>
                    <ActiveFiltersBadge>
                        {Object.values(activeFilters.types).filter(Boolean).length}/{eventTypes.length} tipos
                    </ActiveFiltersBadge>
                </div>
                <FaAngleDown
                    style={{
                        transform: collapsedSections.allFilters ? 'rotate(0deg)' : 'rotate(180deg)',
                        transition: 'transform 0.2s'
                    }}
                />
            </FilterSectionHeader>

            {!collapsedSections.allFilters && (
                <>
                    {/* Filtro por Tipo */}
                    <FilterSection>
                        <FilterSectionHeader
                            onClick={onHeaderClick}
                        >
                            <span>Tipo de Evento</span>
                            <FaAngleUp
                                style={{
                                    transform: collapsedSections.types ? 'rotate(0deg)' : 'rotate(180deg)',
                                    transition: 'transform 0.2s'
                                }}
                            />
                        </FilterSectionHeader>

                        {!collapsedSections.types && (
                            <FilterContent>
                                <div style={{ display: 'flex', gap: constants.spacing.sm, marginBottom: constants.spacing.sm }}>
                                    <ActionButton
                                        onClick={() => toggleAllTypeFilters(true)}
                                    >
                                        <FaCheck /> Todos Tipos
                                    </ActionButton>
                                    <ActionButton
                                        onClick={() => toggleAllTypeFilters(false)}
                                    >
                                        <FaTimes /> Nenhum Tipo
                                    </ActionButton>
                                </div>

                                <FilterGrid>
                                    {eventCategories.map(category => (
                                        <FilterCategory key={category.id}>
                                            <CategoryHeader
                                                onClick={() => collapsedSectionsClick(`category_${category.id}`)}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: constants.spacing.sm }}>
                                                    <span>{category.name}</span>
                                                    <small style={{ color: constants.colors.text.secondary }}>
                                                        ({countActiveFiltersInCategory(category.id)}/{category.types.length})
                                                    </small>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: constants.spacing.sm }}>
                                                    <CategoryToggle
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleCategoryFilters(category, true);
                                                        }}
                                                    >
                                                        <FaCheck size={10} />
                                                    </CategoryToggle>
                                                    <CategoryToggle
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleCategoryFilters(category, false);
                                                        }}
                                                    >
                                                        <FaTimes size={10} />
                                                    </CategoryToggle>
                                                    <FaAngleDown
                                                        size={12}
                                                        style={{
                                                            transform: collapsedSections[`category_${category.id}`] ? 'rotate(0deg)' : 'rotate(90deg)',
                                                            transition: 'transform 0.2s'
                                                        }}
                                                    />
                                                </div>
                                            </CategoryHeader>

                                            {!collapsedSections[`category_${category.id}`] && (
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(11vw, 1fr))', gap: constants.spacing.sm, marginTop: constants.spacing.sm }}>
                                                    {category.types.map(({ type, color, name }) => (
                                                        <FilterButton
                                                            key={type}
                                                            color={color}
                                                            isActive={activeFilters.types[type]}
                                                            onClick={() => toggleFilter(type)}
                                                        >
                                                            {name}
                                                        </FilterButton>
                                                    ))}
                                                </div>
                                            )}
                                        </FilterCategory>
                                    ))}
                                </FilterGrid>
                            </FilterContent>
                        )}
                    </FilterSection>

                    {/* Filtro por Escola */}
                    <FilterSection>
                        <FilterSectionHeader
                            onClick={onHeaderClick}
                        >
                            <span>Escola</span>
                            <FaAngleUp
                                style={{
                                    transform: collapsedSections.schools ? 'rotate(0deg)' : 'rotate(180deg)',
                                    transition: 'transform 0.2s'
                                }}
                            />
                        </FilterSectionHeader>

                        {!collapsedSections.schools && (
                            <FilterContent>
                                <SearchInput
                                    placeholder="Buscar escola..."
                                    onChange={(e) => onChangeSchoolSearchTerm(e.target.value)}
                                />
                                <FilterList>
                                    {filteredSchools.map(school => (
                                        <FilterItem key={school}>
                                            <Checkbox
                                                checked={!!activeFilters.schools[school]}
                                                onChange={() => toggleSchoolFilter(school)}
                                            />
                                            <span>{school}</span>
                                        </FilterItem>
                                    ))}
                                </FilterList>
                            </FilterContent>
                        )}
                    </FilterSection>

                    {/* Filtro por Localização */}
                    <FilterSection>
                        <FilterSectionHeader
                            onClick={() => onChangeCollapsedSections({
                                ...collapsedSections,
                                locations: !collapsedSections.locations
                            })}
                        >
                            <span>Localização</span>
                            <FaAngleUp
                                style={{
                                    transform: collapsedSections.locations ? 'rotate(0deg)' : 'rotate(180deg)',
                                    transition: 'transform 0.2s'
                                }}
                            />
                        </FilterSectionHeader>

                        {!collapsedSections.locations && (
                            <FilterContent>
                                <SearchInput
                                    placeholder="Buscar local..."
                                    onChange={(e) => onChangeLocationSearch(e.target.value)}
                                />
                                <FilterList>
                                    {filteredLocations.map(location => (
                                        <FilterItem key={location}>
                                            <Checkbox
                                                checked={!!activeFilters.locations[location]}
                                                onChange={() => toggleLocationFilter(location)}
                                            />
                                            <span>{location}</span>
                                        </FilterItem>
                                    ))}
                                </FilterList>
                            </FilterContent>
                        )}
                    </FilterSection>

                    {/* Filtro por Período */}
                    <FilterSection>
                        <FilterSectionHeader
                            onClick={() => onChangeCollapsedSections({
                                ...collapsedSections,
                                timeRange: !collapsedSections.timeRange
                            })}
                        >
                            <span>Período</span>
                            <FaAngleUp
                                style={{
                                    transform: collapsedSections.timeRange ? 'rotate(0deg)' : 'rotate(180deg)',
                                    transition: 'transform 0.2s'
                                }}
                            />
                        </FilterSectionHeader>

                        {!collapsedSections.timeRange && (
                            <FilterContent>
                                <DateRangeContainer>
                                    <DatePicker
                                        selected={activeFilters.timeRange.start}
                                        onChange={(date) => onChangeDate(date, 'start')}
                                        selectsStart
                                        startDate={activeFilters.timeRange.start}
                                        endDate={activeFilters.timeRange.end}
                                        placeholderText="Data inicial"
                                    />
                                    <span>até</span>
                                    <DatePicker
                                        selected={activeFilters.timeRange.end}
                                        onChange={(date) => onChangeDate(date, 'end')}
                                        selectsEnd
                                        startDate={activeFilters.timeRange.start}
                                        endDate={activeFilters.timeRange.end}
                                        minDate={activeFilters.timeRange.start || undefined}
                                        placeholderText="Data final"
                                    />
                                </DateRangeContainer>
                            </FilterContent>
                        )}
                    </FilterSection>
                </>
            )}
        </FiltersContainer>
    )
};

export default FilterPanel;