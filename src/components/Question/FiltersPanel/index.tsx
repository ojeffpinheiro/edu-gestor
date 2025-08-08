import React, { useState } from 'react';
import { FaFilter, FaStar, FaSave } from 'react-icons/fa';
import { Content, QuestionFilters, SavedFilter } from '../../../utils/types/Question';
import { Card } from '../../../styles/card';
import { Divider, Flex, Grid } from '../../../styles/layoutUtils';
import { Input, Label, Select } from '../../../styles/inputs';
import DatePicker from 'react-datepicker';
import { Button } from '../../../styles/buttons';
import { Modal } from '../../Modal';
import FilterChip from '../FilterChip';
import TagInput from '../TagInput';
import RangeSlider from '../../../styles/RangeSlider';

interface FiltersPanelProps {
  contents: Content[];
  onApply: (filters: QuestionFilters) => void;
  onSaveFilter?: (filter: SavedFilter) => void;
  savedFilters?: SavedFilter[];
  onLoadFilter?: (filter: QuestionFilters) => void;
  onDeleteFilter?: (id: string) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = (
  {
    contents,
    onApply,
    onSaveFilter,
    savedFilters = [],
    onLoadFilter,
    onDeleteFilter
  }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filters, setFilters] = useState<QuestionFilters>({
    contentId: '',
    difficulty: 'easy',
    questionType: '',
    status: '',
    tags: ['', ''],
    dateRange: { start: '', end: '' },
    minCorrectRate: undefined,
    maxCorrectRate: undefined
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: 'start' | 'end', date: Date | null) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [name]: date ? date.toISOString() : ''
      }
    }))
  }

  const handleRateChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      minCorrectRate: min,
      maxCorrectRate: max
    }));
  };

  const handleTagChange = (tags: string[]) => {
    setFilters(prev => ({ ...prev, tags }));
  };

  const applyFilters = () => {
    onApply(filters);
  };

  const resetFilters = () => {
    setFilters({
      contentId: '',
      difficulty: '',
      questionType: '',
      status: '',
      tags: [],
      dateRange: { start: '', end: '' },
      minCorrectRate: undefined,
      maxCorrectRate: undefined
    });
    onApply({} as QuestionFilters);
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

      <Grid columns={3} gap="md" style={{ marginTop: '1rem' }}>
        <Select
          name="questionType"
          value={filters.questionType}
          onChange={handleInputChange}
        >
          <option value="">Todos os tipos</option>
          <option value="multiple_choice">Múltipla escolha</option>
          <option value="true_false">Verdadeiro/Falso</option>
          <option value="essay">Dissertativa</option>
        </Select>

        <Select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleInputChange}
        >
          <option value="">Todas as dificuldades</option>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </Select>

        <Select
          name="status"
          value={filters.status}
          onChange={handleInputChange}
        >
          <option value="">Todos os status</option>
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
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
                  selected={filters.dateRange.start ? new Date(filters.dateRange.start) : null}
                  onChange={(date: Date | null) => handleDateChange('start', date)}
                  placeholderText="Data inicial"
                />
                <DatePicker
                  selected={filters.dateRange.end ? new Date(filters.dateRange.end) : null}
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
                value={[filters.minCorrectRate || 0, filters.maxCorrectRate || 100]}
                onChange={([min, max]) => handleRateChange(min, max)}
              />
              <Flex justify="between">
                <span>{filters.minCorrectRate || 0}%</span>
                <span>{filters.maxCorrectRate || 100}%</span>
              </Flex>
            </div>

            <div>
              <Label>Tags</Label>
              <TagInput
                tags={filters.tags}
                onChange={handleTagChange}
                suggestions={['matemática', 'português', 'ciências']}
              />
            </div>

            <div>
              <Label>Conteúdo</Label>
              <Select
                name="contentId"
                value={filters.contentId}
                onChange={handleInputChange}
              >
                <option value="">Todos os conteúdos</option>
                {contents.map(content => (
                  <option key={content.id} value={content.id}>
                    {content.name}
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