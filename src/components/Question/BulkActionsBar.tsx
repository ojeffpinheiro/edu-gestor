import React from 'react'
import { FaBroom } from 'react-icons/fa';
import { FiDownload, FiFlag, FiFolder, FiLayers, FiTrash2 } from 'react-icons/fi';
interface BulkActionsBarProps {
    selectedCount: number;
    onDelete: () => void;
    onExport: () => void;
    onCombine: () => void;
    onClearSelection: () => void;
    onStatusChange: () => void; // Adicionado
    onMove: () => void; // Adicionado
}

export const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
    selectedCount,
    onDelete,
    onExport,
    onCombine,
    onClearSelection,
    onStatusChange, // Adicionado
    onMove // Adicionado
}) => (
    <div className="bulk-actions-bar">
        <span>{selectedCount} selected</span>
        <button onClick={onDelete}>
            <FiTrash2 /> Excluir
        </button>

        <button onClick={onStatusChange}>
            <FiFlag /> Status
        </button>

        <button onClick={onMove}>
            <FiFolder /> Mover
        </button>

        <button onClick={onCombine}>
            <FiLayers /> Combinar
        </button>

        <button onClick={onClearSelection}>
            <FaBroom /> Limpar
        </button>

        <button onClick={onExport}>
            <FiDownload /> Exportar
        </button>
    </div>
);