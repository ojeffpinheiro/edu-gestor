import React from 'react'
import { ActionButton } from "../../../styles/buttons";
import { ActionContainer } from "./styles";
import { FaCheck, FaClipboardCheck, FaExchangeAlt, FaFolderOpen, FaMinus, FaPlus, FaSave, FaTable, FaThLarge } from 'react-icons/fa';

interface Props {
    view: 'table' | 'layout';
    conferenceMode: boolean;
    editLayoutMode: boolean;
    swapMode: boolean;
    onToggleView: () => void,
    onGenerateLayout: () => void,
    onStartConference: () => void;
    onFinishConference: () => void;
    onToggleEditLayout: () => void;
    onToggleSwapMode : () => void;
    onSaveLayout: () => void;
    onLoadLayout : () => void;
    onAddRow: () => void;
    onRemoveRow: () => void;
}

const LayoutControls: React.FC<Props> = ({
    view,
    conferenceMode,
    editLayoutMode,
    swapMode,
    onToggleView,
    onGenerateLayout,
    onStartConference,
    onFinishConference,
    onToggleEditLayout,
    onToggleSwapMode,
    onLoadLayout,
    onSaveLayout,
    onAddRow,
    onRemoveRow
}) => {
    return (
        <ActionContainer>
            <ActionButton onClick={onToggleView}>
                {view === 'table' ? <><FaThLarge /> Visualizar Layout</> : <><FaTable /> Visualizar Tabela</>}
            </ActionButton>
            <ActionButton onClick={onGenerateLayout}>
                <FaExchangeAlt /> Gerar Layout Automático
            </ActionButton>
            <ActionButton onClick={conferenceMode ? onFinishConference : onStartConference}>
                {conferenceMode ? <><FaCheck /> Finalizar Conferência</> : <><FaClipboardCheck /> Iniciar Conferência</>}
            </ActionButton>
            <ActionButton onClick={onToggleEditLayout}>
                {editLayoutMode ? 'Salvar Layout' : 'Editar Layout'}
            </ActionButton>
            <ActionButton onClick={onToggleSwapMode}>
                <FaSave /> Salvar Layout
            </ActionButton>
            <ActionButton onClick={onLoadLayout}>
                <FaFolderOpen /> Carregar Layout
            </ActionButton>
            <ActionButton
                onClick={() => {}}
                style={swapMode ? { backgroundColor: '#4CAF50', color: 'white' } : {}}
            >
                {swapMode ? 'Cancelar Troca' : 'Trocar Assentos'}
            </ActionButton>
            {editLayoutMode && (
                <>
                    <ActionButton onClick={onAddRow}>
                        <FaPlus /> Adicionar Fileira
                    </ActionButton>
                    <ActionButton onClick={onRemoveRow}>
                        <FaMinus /> Remover Fileira
                    </ActionButton>
                </>
            )}
        </ActionContainer>
    );
}

export default LayoutControls;