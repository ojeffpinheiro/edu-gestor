// hooks/useClassroomLayout.ts
import { useState } from 'react';
import { LayoutConfig } from '../utils/types/Team';
import { initializeLayout } from '../utils/classroomUtils';

export const useClassroomLayout = (initialRows: number, initialColumns: number) => {
    const [layout, setLayout] = useState<LayoutConfig>({
        rows: initialRows,
        columns: initialColumns,
        seats: [],
    });
    const [savedLayouts, setSavedLayouts] = useState<{ name: string, layout: LayoutConfig }[]>([]);
    const [editLayoutMode, setEditLayoutMode] = useState(false);
    const [tempRows, setTempRows] = useState(5);

    const addRow = () => {
        if (layout.rows >= 10) return;
        const newRows = layout.rows + 1;
        initializeLayout(newRows, layout.columns);
        setTempRows(newRows);
    };

     const removeRow = () => {
        if (layout.rows <= 3) return; // Min 3 rows
        const newRows = layout.rows - 1;

        // Filter out seats that are in the removed row
        const filteredSeats = layout.seats.filter(
            seat => seat.position.row < newRows
        );

        setLayout({
            rows: newRows,
            columns: layout.columns,
            seats: filteredSeats
        });
        setTempRows(newRows);
    };

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
        setLayout, 
        setSavedLayouts, 
        addRow, 
        removeRow, 
        toggleEditLayout,
        loadLayout,
     };
};