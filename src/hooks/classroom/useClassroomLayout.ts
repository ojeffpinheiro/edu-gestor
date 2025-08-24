// hooks/useClassroomLayout.ts
import { useCallback, useState } from 'react';
import { LayoutConfig } from '../../types/classroom/Team';
import { generateLayout, initializeLayout, Template, validateLayout } from '../../utils/classroomUtils';


/**
 * Custom hook to manage classroom layout state and operations.
 * 
 * @param initialRows - Initial number of rows in the classroom layout.
 * @param initialColumns - Initial number of columns in the classroom layout.
 * @returns An object containing the current layout, operations to modify it, and state management functions.
 */
export const useClassroomLayout = (initialRows: number, initialColumns: number) => {
   const [savedLayouts, setSavedLayouts] = useState<{ name: string, layout: LayoutConfig }[]>([]);
    const [editLayoutMode, setEditLayoutMode] = useState<boolean>(false);

    const [layout, setLayout] = useState<LayoutConfig>(() =>
        initializeLayout(initialRows, initialColumns)
    );

    // Limites de redimensionamento
    const MIN_ROWS = 3;
    const MAX_ROWS = 10;
    const MIN_COLS = 3;
    const MAX_COLS = 8;

    const addRow = useCallback(() => {
        if (layout.rows >= MAX_ROWS) return;
        setLayout(prev => generateLayout(prev.rows + 1, prev.columns));
    }, [layout.rows]);

    const removeRow = useCallback(() => {
        setLayout(prev => {
            if (prev.rows <= MIN_ROWS) return prev;
            return generateLayout(prev.rows - 1, prev.columns);
        });
    }, []);

    const addColumn = useCallback(() => {
        setLayout(prev => {
            if (prev.columns >= MAX_COLS) return prev;
            return generateLayout(prev.rows, prev.columns + 1);
        });
    }, []);

    const removeColumn = useCallback(() => {
        setLayout(prev => {
            if (prev.columns <= MIN_COLS) return prev;
            return generateLayout(prev.rows, prev.columns - 1);
        });
    }, []);

    const applyTemplate = useCallback((template: Template) => {
        setLayout(generateLayout(layout.rows, layout.columns, template));
    }, [layout.rows, layout.columns]);

    const loadLayout = (
        savedLayout: LayoutConfig,
        setLoadModalOpen: (open: boolean) => void,
        showNotification: (message: string, type: string) => void
    ) => {
        setLayout(savedLayout);
        setLoadModalOpen(false);
        showNotification('Layout carregado com sucesso!', 'success');
    };

    const toggleEditLayout = useCallback(() => {
        setEditLayoutMode(prev => {
            const newMode = !prev;
            if (!newMode) {
                const { isValid, errors } = validateLayout(layout);
                if (!isValid) {
                    console.warn('Layout inválido:', errors.join(', '));
                }
            }
            return newMode;
        });
    }, [layout]);

    return {
        layout,
        savedLayouts,
        editLayoutMode,
        addColumn,
        removeColumn,
        applyTemplate,
        setLayout,
        setSavedLayouts,
        addRow,
        removeRow,
        toggleEditLayout,
        loadLayout,
        canAddRow: layout.rows < MAX_ROWS,
        canRemoveRow: layout.rows > MIN_ROWS,
        canAddColumn: layout.columns < MAX_COLS,
        canRemoveColumn: layout.columns > MIN_COLS
    };
};