// hooks/useClassroomLayout.ts
import { useCallback, useState } from 'react';
import { LayoutConfig } from '../utils/types/Team';
import { generateLayout, initializeLayout, Template } from '../utils/classroomUtils';

export const useClassroomLayout = (initialRows: number, initialColumns: number) => {
    const [layout, setLayout] = useState<LayoutConfig>({
        rows: initialRows,
        columns: initialColumns,
        seats: [],
    });
    const [savedLayouts, setSavedLayouts] = useState<{ name: string, layout: LayoutConfig }[]>([]);
    const [editLayoutMode, setEditLayoutMode] = useState(false);
    const [tempRows, setTempRows] = useState(5);

    // Limites de redimensionamento
    const MIN_ROWS = 3;
    const MAX_ROWS = 10;
    const MIN_COLS = 3;
    const MAX_COLS = 8;

    const addRow = useCallback(() => {
        setLayout(prev => {
            if (prev.rows >= MAX_ROWS) return prev;
            return generateLayout(prev.rows + 1, prev.columns);
        });
    }, []);

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
        setTempRows(savedLayout.rows);
        setLoadModalOpen(false);
        showNotification('Layout carregado com sucesso!', 'success');
    };

    const toggleEditLayout = () => {
        setEditLayoutMode(!editLayoutMode);
        if (editLayoutMode) {
            // When exiting edit mode, reinitialize with current rows
            initializeLayout(tempRows, layout.columns);
        }
    };

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