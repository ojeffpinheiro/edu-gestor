import React, { useEffect, useState } from 'react';
import { FaFilter, FaStar, FaSave } from 'react-icons/fa';
import { FilterOptions, SavedFilter } from '../../../utils/types/Question';
import { Card } from '../../../styles/card';
import { Divider, Flex, Grid } from '../../../styles/layoutUtils';
import { Input, Label, Select } from '../../../styles/inputs';
import DatePicker from 'react-datepicker';
import { Button } from '../../../styles/buttons';
import { Modal } from '../../Modal';
import FilterChip from '../FilterChip';
import RangeSlider from '../../../styles/RangeSlider';
import { useDisciplineFilter } from '../../../hooks/disciplineMapper';
import TagFilter from './TagFilter';
import { CategoryWithId } from '../QuestionForm/type';

interface FiltersPanelProps {
  categories: CategoryWithId[];  // Agora usando o tipo correto
  onApply: (filters: Partial<FilterOptions>) => void;
  onSaveFilter?: (filter: SavedFilter) => void;
  savedFilters?: SavedFilter[];
  onLoadFilter?: (filter: Partial<FilterOptions>) => void;
  onDeleteFilter?: (id: string) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = (
  {
    categories,
    onApply,
    onSaveFilter,
    savedFilters = [],
    onLoadFilter,
    onDeleteFilter
  }) => {
  const [filters, setFilters] = useState<Partial<FilterOptions>>({
    searchTerm: '',
    categories: [],
    difficulties: [],
    types: [],
    ratingRange: [0, 100],
    createdAtRange: ['', ''],
    tags: []
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');

  const { getCategoriesByDiscipline } = useDisciplineFilter(categories);

  useEffect(() => {
    if (selectedDiscipline) {
      const disciplineCategories = getCategoriesByDiscipline(selectedDiscipline);
      setFilters(prev => ({
        ...prev,
        categories: disciplineCategories
      }));
    }
  }, [selectedDiscipline, getCategoriesByDiscipline]);

  const disciplineOptions = React.useMemo(() => {
    const disciplines = new Set<string>();
    categories.forEach(category => {
      const discipline = (category as any).discipline || 'Geral';
      disciplines.add(discipline);
    });
    return Array.from(disciplines);
  }, [categories]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: 'start' | 'end', date: Date | null) => {
    setFilters(prev => {
      const newDate = date ? date.toISOString() : '';
      const [currentStart, currentEnd] = prev.createdAtRange || ['', ''];

      return {
        ...prev,
        createdAtRange: name === 'start'
          ? [newDate, currentEnd]
          : [currentStart, newDate]
      };
    });
  };

  const handleRateChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      minCorrectRate: min,
      maxCorrectRate: max
    }));
  };

  const applyFilters = () => {
    onApply(filters);
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      categories: [],
      difficulties: [],
      types: [],
      ratingRange: [0, 100],
    });
    onApply({});
  };

  const saveCurrentFilter = () => {
    if (!filterName.trim()) return;

    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: filterName,
      filters: { ...filters }
    };

    onSaveFilter?.(newFilter);
    setFilterName('');
    setShowSaveDialog(false);
  };

  const loadSavedFilter = (filter: SavedFilter) => {
    setFilters({ ...filter.filters });
    onLoadFilter?.(filter.filters);
  };
  return (
    <Card>
      <Flex justify="between" align="center">
        <h3>Filtros</h3>
        <Button variant='info' onClick={() => setShowAdvanced(!showAdvanced)}>
          <FaFilter /> {showAdvanced ? 'Ocultar' : 'Avançados'}
        </Button>
      </Flex>

       <Grid columns={2} gap="md">
        <div>
          <Label>Disciplina</Label>
          <Select
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
          >
            <option value="">Todas as disciplinas</option>
            {disciplineOptions.map(discipline => (
              <option key={discipline} value={discipline}>
                {discipline}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label>Tags</Label>
          <TagFilter
            tags={filters.tags || []}
            onTagsChange={(tags) => setFilters(prev => ({ ...prev, tags }))}
            availableTags={['matemática', 'português', 'história', 'ciências']}
          />
        </div>
      </Grid>

      <Grid columns={3} gap="md" style={{ marginTop: '1rem' }}>
        <Select
          name="questionType"
          value={filters.types}
          onChange={handleInputChange}
        >
          <option value="">Todos os tipos</option>
          <option value="multiple_choice">Múltipla escolha</option>
          <option value="true_false">Verdadeiro/Falso</option>
          <option value="essay">Dissertativa</option>
        </Select>

        <Select
          name="difficulty"
          value={filters.difficulties?.[0]}
          onChange={handleInputChange}
        >
          <option value="">Todas as dificuldades</option>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </Select>

        
      </Grid>

      {showAdvanced && (
        <>
          <Divider />

          <Grid columns={2} gap="md" style={{ marginTop: '1rem' }}>
            <div>
              <Label>Período de criação</Label>
              <Flex gap="sm">
                <DatePicker
                  selected={Array.isArray(filters.createdAtRange) && filters.createdAtRange[0] ?
                    new Date(filters.createdAtRange[0]) : null}
                  onChange={(date: Date | null) => handleDateChange('start', date)}
                  placeholderText="Data inicial"
                />
                <DatePicker
                  selected={Array.isArray(filters.createdAtRange) && filters.createdAtRange[1] ?
                    new Date(filters.createdAtRange[1]) : null}
                  onChange={(date: Date | null) => handleDateChange('end', date)}
                  placeholderText="Data final"
                />
              </Flex>
            </div>

            <div>
              <Label>Taxa de acerto</Label>
              <RangeSlider
                min={0}
                max={100}
                value={[filters.ratingRange?.[0] || 0, filters.ratingRange?.[1] || 100]}
                onChange={([min, max]) => handleRateChange(min, max)}
              />
              <Flex justify="between">
                <span>{filters.ratingRange?.[0] ?? 0}%</span>
                <span>{filters.ratingRange?.[1] ?? 100}%</span>
              </Flex>
            </div>

            <div>
              <Label>Conteúdo</Label>
              <Select
                name="contentId"
                value={filters.categories}
                onChange={handleInputChange}
              >
                <option value="">Todos os conteúdos</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
          </Grid>
        </>
      )}

      <Flex justify="between" style={{ marginTop: '1rem' }}>
        <Flex gap="sm">
          <Button onClick={resetFilters}>Limpar</Button>
          <Button variant="primary" onClick={applyFilters}>
            Aplicar Filtros
          </Button>
        </Flex>

        <Button onClick={() => setShowSaveDialog(true)}>
          <FaSave /> Salvar Filtro
        </Button>
      </Flex>

      {savedFilters.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <Label>Filtros salvos:</Label>
          <Flex wrap gap="xs" style={{ marginTop: '0.5rem' }}>
            {savedFilters.map(filter => (
              <FilterChip
                key={filter.id}
                onClick={() => loadSavedFilter(filter)}
                onDelete={() => onDeleteFilter?.(filter.id)}
              >
                {filter.isDefault && <FaStar style={{ marginRight: '4px' }} />}
                {filter.name}
              </FilterChip>
            ))}
          </Flex>
        </div>
      )}

      {showSaveDialog && (
        <Modal onClose={() => setShowSaveDialog(false)} isOpen title='Salvar Filtro' >
          <Card>
            <h3>Salvar Filtro</h3>
            <Input
              placeholder="Nome do filtro"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              style={{ margin: '1rem 0' }}
            />
            <Flex justify="end" gap="sm">
              <Button onClick={() => setShowSaveDialog(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={saveCurrentFilter}>
                Salvar
              </Button>
            </Flex>
          </Card>
        </Modal>
      )}
    </Card>
  );
};

export default FiltersPanel;