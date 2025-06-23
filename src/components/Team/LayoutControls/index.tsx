import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
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
  FaEdit,
  FaTh,
  FaCircle,
  FaUsers,
  FaGripLines,
  FaUmbraco
} from 'react-icons/fa';

import { useClassroom } from '../../../contexts/ClassroomContext';
import { Template } from '../../../utils/classroomUtils';

import TemplateConfigModal from '../TemplateConfigModal';

import { ActionContainer, TemplateSelect, ControlGroup, ActionButton } from "./styles";

interface Props {
  conferenceMode: boolean;
  canAddRow: boolean;
  canRemoveRow: boolean;
  canAddColumn: boolean;
  canRemoveColumn: boolean;
  onStartConference: () => void;
  onFinishConference: () => void;
  onToggleEditLayout: () => void;
  onToggleSwapMode: () => void;
  onSaveLayout: () => void;
  onAddRow: () => void;
  onRemoveRow: () => void;
  onAddColumn: () => void;
  onRemoveColumn: () => void;
  onApplyTemplate: (template: Template, config?: { groupSize?: number; numGroups?: number }) => void;
}
/**
 * Barra de controles para manipulação do layout da sala
 * Contém botões para adicionar/remover fileiras, colunas, templates e modos especiais
 * @param {string} view - Visualização atual ('table' ou 'layout')
 * @param {boolean} conferenceMode - Indica se está no modo conferência
 * @param {boolean} canAddRow - Se pode adicionar fileira
 * @param {boolean} canRemoveRow - Se pode remover fileira
 * @param {boolean} canAddColumn - Se pode adicionar coluna
 * @param {boolean} canRemoveColumn - Se pode remover coluna
 * @param {function} onStartConference - Inicia modo conferência
 * @param {function} onFinishConference - Finaliza modo conferência
 * @param {function} onToggleEditLayout - Alterna modo edição
 * @param {function} onToggleSwapMode - Alterna modo troca
 * @param {function} onSaveLayout - Salva layout atual
 * @param {function} onAddRow - Adiciona fileira
 * @param {function} onRemoveRow - Remove fileira
 * @param {function} onAddColumn - Adiciona coluna
 * @param {function} onRemoveColumn - Remove coluna
 * @param {function} onApplyTemplate - Aplica template selecionado
 */
const LayoutControls: React.FC<Props> = ({
  conferenceMode,
  canAddRow,
  canRemoveRow,
  canAddColumn,
  canRemoveColumn,
  onStartConference,
  onFinishConference,
  onToggleEditLayout,
  onToggleSwapMode,
  onSaveLayout,
  onAddRow,
  onRemoveRow,
  onAddColumn,
  onRemoveColumn,
  onApplyTemplate
}) => {
  const { state, dispatch, actions } = useClassroom();
  const { view } = state;
  const { toggleView, generateAutomaticLayout } = actions;

  const [showTemplateConfig, setShowTemplateConfig] = useState(false);
  const [activeMode, setActiveMode] = useState<'none' | 'edit' | 'swap'>('none');

  const handleEditToggle = React.useCallback(() => {
    if (activeMode === 'swap') {
      setActiveMode('edit');
      onToggleSwapMode();
    }
    const next = activeMode === 'edit' ? 'none' : 'edit';
    setActiveMode(next);
    onToggleEditLayout();
  }, [activeMode, onToggleEditLayout, onToggleSwapMode]);

  const handleSwapToggle = React.useCallback(() => {
    if (activeMode === 'edit') {
      setActiveMode('swap');
      onToggleEditLayout();
    }
    const next = activeMode === 'swap' ? 'none' : 'swap';
    setActiveMode(next);
    onToggleSwapMode();
  }, [activeMode, onToggleEditLayout, onToggleSwapMode]);

  const handleLoadLayout = () => {
    dispatch({ type: 'TOGGLE_LOAD_MODAL', payload: true })
  }

  const useKeyboardShortcut = (key: string, callback: () => void, deps: any[]) => {
    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key.toLowerCase() === key.toLowerCase()) {
          e.preventDefault();
          callback();
        }
      };

      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }, [key, callback, ...deps]);
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
  }, [activeMode, handleEditToggle, handleSwapToggle]);

  const templates = [
    { value: 'default', label: 'Padrão', icon: <FaTh /> },
    { value: 'U', label: 'Formato U', icon: <FaUmbraco /> },
    { value: 'circle', label: 'Círculo', icon: <FaCircle /> },
    { value: 'groups', label: 'Grupos', icon: <FaUsers /> },
    { value: 'rows', label: 'Fileiras', icon: <FaGripLines /> }
  ];

  useKeyboardShortcut('e', handleEditToggle, [activeMode]);
  useKeyboardShortcut('s', handleSwapToggle, [activeMode]);

  const handleRemoveRow = () => {
    if (window.confirm('Tem certeza que deseja remover esta fileira?')) {
      onRemoveRow();
    }
  };

  const handleTemplateChange = (template: Template) => {
    if (!template) return;

    if (template === 'groups') {
      setShowTemplateConfig(true);
    } else {
      onApplyTemplate(template);
    }
  };

  const handleApplyGroupConfig = (config: { groupSize?: number; numGroups?: number }) => {
    setShowTemplateConfig(false);
    onApplyTemplate('groups', config);
  };

  return (
    <ActionContainer>
      <ControlGroup>
        <Tooltip title="Alternar entre visualização de tabela e layout">
          <ActionButton onClick={toggleView}>
            {view === 'table' ? <FaThLarge /> : <FaTable />}
            {view === 'table' ? ' Layout' : ' Tabela'}
          </ActionButton>
        </Tooltip>
      </ControlGroup>

      <ControlGroup>
        <Tooltip title={canAddRow ? "Adicionar uma nova fileira" : "Número máximo de fileiras alcançado"}>
          <span>
            <ActionButton onClick={onAddRow} disabled={!canAddRow}>
              <FaPlus /> Fileira
            </ActionButton>
          </span>
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
          <div style={{ position: 'relative' }}>
            <FaShapes style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <TemplateSelect
              onChange={(e) => handleTemplateChange(e.target.value as Template)}
            >
              <option value="">Selecione um Template</option>
              {templates.map(template => (
                <option key={template.value} value={template.value}>
                  {template.label}
                </option>
              ))}
            </TemplateSelect>
          </div>
        </Tooltip>

        <Tooltip title="Gerar um layout automático com os alunos disponíveis">
          <ActionButton onClick={generateAutomaticLayout}>
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
          <ActionButton
            onClick={handleEditToggle}
            $active={activeMode === 'edit'}
            $mode="edit"
          >
            <FaEdit /> {activeMode === 'edit' ? 'Salvar' : 'Editar'}
          </ActionButton>
        </Tooltip>

        <Tooltip title="Alternar modo de troca (Ctrl+S)">
          <ActionButton onClick={handleSwapToggle} $active={activeMode === 'swap'}>
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
          <ActionButton onClick={handleLoadLayout}>
            <FaFolderOpen /> Carregar Layout
          </ActionButton>
        </Tooltip>
      </ControlGroup>

      {showTemplateConfig && (
        <TemplateConfigModal
          onClose={() => setShowTemplateConfig(false)}
          onApply={handleApplyGroupConfig}
        />
      )}
    </ActionContainer>
  );
};

export default LayoutControls;