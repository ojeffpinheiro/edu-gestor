// useLayoutManager.ts
import { useCallback } from 'react';
import { useClassroom } from '../contexts/ClassroomContext';
import { generateLayout, Template, validateLayout } from '../utils/classroomUtils';
import { LayoutConfig } from '../utils/types/Team';

export const useLayoutManager = () => {
  const { state, dispatch } = useClassroom();
  const errors: string[] = [];

  // Layout dimensions constraints
  const MIN_ROWS = 3;
  const MAX_ROWS = 10;
  const MIN_COLS = 3;
  const MAX_COLS = 8;

  const addRow = useCallback(() => {
  if (state.layout.rows >= MAX_ROWS) return;
  const newLayout = generateLayout(state.layout.rows + 1, state.layout.columns, 'rows');
  dispatch({ type: 'SET_LAYOUT', payload: newLayout });
  dispatch({ type: 'SET_CURRENT_TEMPLATE', payload: 'rows' });
}, [state.layout.rows, state.layout.columns, dispatch]);

  const removeRow = useCallback(() => {
    if (state.layout.rows <= MIN_ROWS) return;
    const newLayout = generateLayout(state.layout.rows - 1, state.layout.columns);
    dispatch({ type: 'SET_LAYOUT', payload: newLayout });
  }, [state.layout.rows, state.layout.columns, dispatch]);

  const addColumn = useCallback(() => {
    if (state.layout.columns >= MAX_COLS) return;
    const newLayout = generateLayout(state.layout.rows, state.layout.columns + 1);
    dispatch({ type: 'SET_LAYOUT', payload: newLayout });
  }, [state.layout.rows, state.layout.columns, dispatch]);

  const removeColumn = useCallback(() => {
    if (state.layout.columns <= MIN_COLS) return;
    const newLayout = generateLayout(state.layout.rows, state.layout.columns - 1);
    dispatch({ type: 'SET_LAYOUT', payload: newLayout });
  }, [state.layout.rows, state.layout.columns, dispatch]);

  const applyTemplate = useCallback((template: Template, config?: { groupSize?: number; numGroups?: number }) => {
    const newLayout = generateLayout(state.layout.rows, state.layout.columns, template, config);
    dispatch({ type: 'SET_LAYOUT', payload: newLayout });
    dispatch({ type: 'SET_CURRENT_TEMPLATE', payload: template });
  }, [state.layout.rows, state.layout.columns, dispatch]);

  const toggleEditLayout = useCallback(() => {
    if (!state.editMode) {
      const { isValid, errors } = validateLayout(state.layout);
      if (!isValid) {
        console.warn('Layout inválido:', errors.join(', '));
      }
    }
    dispatch({ type: 'TOGGLE_EDIT_MODE' });
  }, [state.layout, state.editMode, dispatch]);

  const loadLayout = useCallback((savedLayout: LayoutConfig) => {
    dispatch({ type: 'SET_LAYOUT', payload: savedLayout });
  }, [dispatch]);



  if (state.layout.rows < MIN_ROWS) errors.push(`Mínimo de ${MIN_ROWS} fileiras`);
  if (state.layout.rows > MAX_ROWS) errors.push(`Máximo de ${MAX_ROWS} fileiras`);
  if (state.layout.columns < MIN_COLS) errors.push(`Mínimo de ${MIN_COLS} colunas`);
  if (state.layout.columns > MAX_COLS) errors.push(`Máximo de ${MAX_COLS} colunas`);

  const seatIds = state.layout.seats.map(s => s.id);
  if (new Set(seatIds).size !== seatIds.length) {
    errors.push("IDs de assentos duplicados encontrados");
  }

  return {
    canAddRow: state.layout.rows < MAX_ROWS,
    canRemoveRow: state.layout.rows > MIN_ROWS,
    canAddColumn: state.layout.columns < MAX_COLS,
    canRemoveColumn: state.layout.columns > MIN_COLS,
    editMode: state.editMode,
    isValid: errors.length === 0,
    errors,
    addRow,
    removeRow,
    addColumn,
    removeColumn,
    applyTemplate,
    toggleEditLayout,
    loadLayout
  };
};