import React from 'react'
import {
    FaCheck,
    FaClipboardCheck,
    FaExchangeAlt,
    FaFolderOpen,
    FaMinus,
    FaPlus,
    FaSave,
    FaShapes,
    FaTable,
    FaThLarge
} from 'react-icons/fa';
import { ActionButton } from "../../../styles/buttons";
import { ActionContainer, Content, TemplateSelect } from "./styles";
import { Template } from '../../../utils/classroomUtils';

interface Props {
    view: 'table' | 'layout';
    conferenceMode: boolean;
    editLayoutMode: boolean;
    swapMode: boolean;
    canAddRow: boolean;
    canRemoveRow: boolean;
    canAddColumn: boolean;
    canRemoveColumn: boolean;
    onToggleView: () => void,
    onGenerateLayout: () => void,
    onStartConference: () => void;
    onFinishConference: () => void;
    onToggleEditLayout: () => void;
    onToggleSwapMode: () => void;
    onSaveLayout: () => void;
    onLoadLayout: () => void;
    onAddRow: () => void;
    onRemoveRow: () => void;
    onAddColumn: () => void;
    onRemoveColumn: () => void;
    onApplyTemplate: (template: Template) => void;
}

const LayoutControls: React.FC<Props> = ({
    view,
    conferenceMode,
    editLayoutMode,
    swapMode,
    canAddRow,
    canRemoveRow,
    canAddColumn,
    canRemoveColumn,
    onToggleView,
    onGenerateLayout,
    onStartConference,
    onFinishConference,
    onToggleEditLayout,
    onToggleSwapMode,
    onLoadLayout,
    onSaveLayout,
    onAddRow,
    onRemoveRow,
    onAddColumn,
    onRemoveColumn,
    onApplyTemplate
}) => {

    const templates = [
        { value: 'default', label: 'Padrão' },
        { value: 'U', label: 'Formato U' },
        { value: 'circle', label: 'Círculo' },
        { value: 'groups', label: 'Grupos' },
        { value: 'rows', label: 'Fileiras' }
    ];

    return (
        <ActionContainer>
            <ActionButton onClick={onToggleView}>
                {view === 'table' ? <FaThLarge /> : <FaTable />}
                {view === 'table' ? ' Layout' : ' Tabela'}
            </ActionButton>

            <Content>
                <ActionButton onClick={onAddRow} disabled={!canAddRow}>
                    <FaPlus /> Fileira
                </ActionButton>
                <ActionButton onClick={onRemoveRow} disabled={!canRemoveRow}>
                    <FaMinus /> Fileira
                </ActionButton>
            </Content>

            <Content>
                <ActionButton onClick={onAddColumn} disabled={!canAddColumn}>
                    <FaPlus /> Coluna
                </ActionButton>
                <ActionButton onClick={onRemoveColumn} disabled={!canRemoveColumn}>
                    <FaMinus /> Coluna
                </ActionButton>
            </Content>

            <TemplateSelect
                onChange={(e) => onApplyTemplate(e.target.value as Template)}
            >
                <FaShapes />
                <option value="">Selecione um Template</option>
                {templates.map(template => (
                    <option key={template.value} value={template.value}>
                        {template.label}
                    </option>
                ))}
            </TemplateSelect>

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
                onClick={() => { }}
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