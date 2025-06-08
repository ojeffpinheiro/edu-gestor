import React, { useEffect, useState } from 'react';
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
  FaThLarge,
  FaEdit
} from 'react-icons/fa';
import { ActionContainer, TemplateSelect, ControlGroup, ActionButton } from "./styles";
import { Template } from '../../../utils/classroomUtils';
import { Tooltip } from '@mui/material';

interface Props {
  view: 'table' | 'layout';
  conferenceMode: boolean;
  editLayoutMode: boolean;
  swapMode: boolean;
  canAddRow: boolean;
  canRemoveRow: boolean;
  canAddColumn: boolean;
  canRemoveColumn: boolean;
  onToggleView: () => void;
  onGenerateLayout: () => void;
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

/**
 * Barra de controles para manipulação do layout da sala
 * Contém botões para adicionar/remover fileiras, colunas, templates e modos especiais
 * @param {string} view - Visualização atual ('table' ou 'layout')
 * @param {boolean} conferenceMode - Indica se está no modo conferência
 * @param {boolean} editLayoutMode - Indica se está no modo edição
 * @param {boolean} swapMode - Indica se está no modo troca de assentos
 * @param {boolean} canAddRow - Se pode adicionar fileira
 * @param {boolean} canRemoveRow - Se pode remover fileira
 * @param {boolean} canAddColumn - Se pode adicionar coluna
 * @param {boolean} canRemoveColumn - Se pode remover coluna
 * @param {function} onToggleView - Alterna entre visualizações
 * @param {function} onGenerateLayout - Gera layout automático
 * @param {function} onStartConference - Inicia modo conferência
 * @param {function} onFinishConference - Finaliza modo conferência
 * @param {function} onToggleEditLayout - Alterna modo edição
 * @param {function} onToggleSwapMode - Alterna modo troca
 * @param {function} onSaveLayout - Salva layout atual
 * @param {function} onLoadLayout - Carrega layout salvo
 * @param {function} onAddRow - Adiciona fileira
 * @param {function} onRemoveRow - Remove fileira
 * @param {function} onAddColumn - Adiciona coluna
 * @param {function} onRemoveColumn - Remove coluna
 * @param {function} onApplyTemplate - Aplica template selecionado
 */
const LayoutControls: React.FC<Props> = ({
  view,
  conferenceMode,
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
  onSaveLayout,
  onLoadLayout,
  onAddRow,
  onRemoveRow,
  onAddColumn,
  onRemoveColumn,
  onApplyTemplate
}) => {
  const [activeMode, setActiveMode] = useState<'none' | 'edit' | 'swap'>('none');

  const handleEditToggle = () => {
    if (activeMode === 'swap') {
      setActiveMode('edit');
      onToggleSwapMode();
    }
    const next = activeMode === 'edit' ? 'none' : 'edit';
    setActiveMode(next);
    onToggleEditLayout();
  };

  const handleSwapToggle = () => {
    if (activeMode === 'edit') {
      setActiveMode('swap');
      onToggleEditLayout();
    }
    const next = activeMode === 'swap' ? 'none' : 'swap';
    setActiveMode(next);
    onToggleSwapMode();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        handleEditToggle();
      }
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSwapToggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMode]);

  const templates = [
    { value: 'default', label: 'Padrão' },
    { value: 'U', label: 'Formato U' },
    { value: 'circle', label: 'Círculo' },
    { value: 'groups', label: 'Grupos' },
    { value: 'rows', label: 'Fileiras' }
  ];

  return (
    <ActionContainer>
      <ControlGroup>
        <Tooltip title="Alternar entre visualização de tabela e layout">
          <ActionButton onClick={onToggleView}>
            {view === 'table' ? <FaThLarge /> : <FaTable />}
            {view === 'table' ? ' Layout' : ' Tabela'}
          </ActionButton>
        </Tooltip>
      </ControlGroup>

      <ControlGroup>
        <Tooltip title="Adicionar uma nova fileira">
          <ActionButton onClick={onAddRow} disabled={!canAddRow}>
            <FaPlus /> Fileira
          </ActionButton>
        </Tooltip>
        <Tooltip title="Remover a última fileira">
          <ActionButton onClick={onRemoveRow} disabled={!canRemoveRow}>
            <FaMinus /> Fileira
          </ActionButton>
        </Tooltip>
      </ControlGroup>

      <ControlGroup>
        <Tooltip title="Adicionar uma nova coluna">
          <ActionButton onClick={onAddColumn} disabled={!canAddColumn}>
            <FaPlus /> Coluna
          </ActionButton>
        </Tooltip>
        <Tooltip title="Remover a última coluna">
          <ActionButton onClick={onRemoveColumn} disabled={!canRemoveColumn}>
            <FaMinus /> Coluna
          </ActionButton>
        </Tooltip>
      </ControlGroup>

      <ControlGroup>
        <Tooltip title="Selecione um template pré-definido">
          <TemplateSelect onChange={(e) => onApplyTemplate(e.target.value as Template)}>
            <FaShapes />
            <option value="">Selecione um Template</option>
            {templates.map(template => (
              <option key={template.value} value={template.value}>
                {template.label}
              </option>
            ))}
          </TemplateSelect>
        </Tooltip>

        <Tooltip title="Gerar um layout automático com os alunos disponíveis">
          <ActionButton onClick={onGenerateLayout}>
            <FaExchangeAlt /> Gerar Layout Automático
          </ActionButton>
        </Tooltip>
      </ControlGroup>

      <ControlGroup>
        <Tooltip title={conferenceMode ? "Finalizar a verificação de assentos" : "Iniciar verificação de assentos"}>
          <ActionButton onClick={conferenceMode ? onFinishConference : onStartConference}>
            {conferenceMode
              ? <><FaCheck /> Finalizar Conferência</>
              : <><FaClipboardCheck /> Iniciar Conferência</>}
          </ActionButton>
        </Tooltip>
      </ControlGroup>

      <ControlGroup>
        <Tooltip title="Alternar modo de edição (Ctrl+E)">
          <ActionButton onClick={handleEditToggle} active={activeMode === 'edit'}>
            <FaEdit /> {activeMode === 'edit' ? 'Salvar' : 'Editar'}
          </ActionButton>
        </Tooltip>

        <Tooltip title="Alternar modo de troca (Ctrl+S)">
          <ActionButton onClick={handleSwapToggle} active={activeMode === 'swap'}>
            <FaExchangeAlt /> {activeMode === 'swap' ? 'Cancelar Troca' : 'Trocar Assentos'}
          </ActionButton>
        </Tooltip>
      </ControlGroup>

      <ControlGroup>
        <Tooltip title="Salvar o layout atual">
          <ActionButton onClick={onSaveLayout}>
            <FaSave /> Salvar Layout
          </ActionButton>
        </Tooltip>

        <Tooltip title="Carregar um layout salvo">
          <ActionButton onClick={onLoadLayout}>
            <FaFolderOpen /> Carregar Layout
          </ActionButton>
        </Tooltip>
      </ControlGroup>
    </ActionContainer>
  );
};

export default LayoutControls;