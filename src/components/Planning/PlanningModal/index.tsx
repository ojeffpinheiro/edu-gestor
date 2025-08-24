import React, { useState, useCallback, useMemo } from 'react';
import {
  FiBarChart2, FiBook, FiBookmark, FiCalendar, FiChevronRight,
  FiCpu, FiEdit, FiFileText, FiHome, FiPaperclip, FiSave,
  FiSearch, FiTarget, FiUsers, FiX
} from 'react-icons/fi';

import { PlanningData } from '../../../types/academic/Planning';
import { mockPlanningData } from '../../../mocks/planning';
import SchoolInfoSection from '../PlanningTabs/SchoolInfoSection';
import GeneralObjectivesSection from '../PlanningTabs/GeneralObjectivesSection';
import TrimesterTopicsSection from '../PlanningTabs/TrimesterTopicsSection';
import DetailedPlanningSection from '../PlanningTabs/DetailedPlanningSection';
import DidacticSequenceSection from '../PlanningTabs/DidacticSequenceSection';
import SupportMaterialsSection from '../PlanningTabs/SupportMaterialsSection';
import EvaluationSection from '../PlanningTabs/EvaluationSection';
import DiagnosticEvaluationSection from '../PlanningTabs/DiagnosticEvaluationSection';
import InclusionSection from '../PlanningTabs/InclusionSection';
import DigitalTechnologiesSection from '../PlanningTabs/DigitalTechnologiesSection';
import ConclusionsSection from '../PlanningTabs/ConclusionsSection';
import ReferencesSection from '../PlanningTabs/ReferencesSection';
import ActivitiesSection from '../PlanningTabs/ActivitiesSection';

import Modal from '../../modals/Modal';

import { SectionTitle } from '../../../styles/baseComponents';
import { Button } from '../../../styles/buttons';

interface PlanningModalProps {
  isOpen: boolean;
  initialData?: PlanningData;
  onSave: (data: PlanningData) => void;
  onClose: () => void;
}

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
  category: 'basic' | 'content' | 'evaluation' | 'resources';
}

const PlanningModal: React.FC<PlanningModalProps> = ({
  isOpen,
  initialData,
  onSave,
  onClose
}) => {
  const [planningData, setPlanningData] = useState<PlanningData>(
    initialData || mockPlanningData
  );
  const [activeTab, setActiveTab] = useState('schoolInfo');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const sections: Section[] = useMemo(() => [
    // Informações Básicas
    {
      id: 'schoolInfo',
      label: 'Informações da Escola',
      icon: <FiHome size={18} />,
      category: 'basic'
    },
    {
      id: 'generalObjectives',
      label: 'Objetivos Gerais',
      icon: <FiTarget size={18} />,
      category: 'basic'
    },
    // Conteúdo Pedagógico
    {
      id: 'trimesterTopics',
      label: 'Tópicos do Trimestre',
      icon: <FiBook size={18} />,
      category: 'content'
    },
    {
      id: 'detailedPlanning',
      label: 'Planejamento Detalhado',
      icon: <FiEdit size={18} />,
      category: 'content'
    },
    {
      id: 'didacticSequence',
      label: 'Cronograma',
      icon: <FiCalendar size={18} />,
      category: 'content'
    },
    {
      id: 'activities',
      label: 'Atividades',
      icon: <FiEdit size={18} />,
      category: 'content'
    },
    // Avaliação
    {
      id: 'evaluation',
      label: 'Avaliação',
      icon: <FiBarChart2 size={18} />,
      category: 'evaluation'
    },
    {
      id: 'diagnosticEvaluation',
      label: 'Avaliação Diagnóstica',
      icon: <FiSearch size={18} />,
      category: 'evaluation'
    },
    // Recursos e Materiais
    {
      id: 'supportMaterials',
      label: 'Materiais',
      icon: <FiPaperclip size={18} />,
      category: 'resources'
    },
    {
      id: 'inclusionAndAccessibility',
      label: 'Inclusão',
      icon: <FiUsers size={18} />,
      category: 'resources'
    },
    {
      id: 'digitalTechnologies',
      label: 'Tecnologias',
      icon: <FiCpu size={18} />,
      category: 'resources'
    },
    {
      id: 'conclusions',
      label: 'Conclusões',
      icon: <FiFileText size={18} />,
      category: 'resources'
    },
    {
      id: 'references',
      label: 'Referências',
      icon: <FiBookmark size={18} />,
      category: 'resources'
    }
  ], []);

  const filteredSections = useMemo(() => {
    if (!searchTerm) return sections;
    return sections.filter(section =>
      section.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sections, searchTerm]);

  const categoryLabels = {
    basic: 'Informações Básicas',
    content: 'Conteúdo Pedagógico',
    evaluation: 'Avaliação',
    resources: 'Recursos e Materiais'
  };

  const updatePlanningData = useCallback((updater: (prev: PlanningData) => PlanningData) => {
    setPlanningData(updater);
    setUnsavedChanges(true);
  }, []);

  const renderActiveSection = useCallback(() => {
    switch (activeTab) {
      case 'schoolInfo':
        return (
          <SchoolInfoSection
            data={planningData.schoolInfo}
            onChange={(updatedInfo) =>
              updatePlanningData(prev => ({ ...prev, schoolInfo: updatedInfo }))
            }
          />
        );
      case 'generalObjectives':
        return (
          <GeneralObjectivesSection
            objectives={planningData.generalObjectives}
            onAdd={() => {
              const newObjective = {
                id: Date.now().toString(),
                description: 'Novo objetivo'
              };
              updatePlanningData(prev => ({
                ...prev,
                generalObjectives: [...prev.generalObjectives, newObjective]
              }));
            }}
            onEdit={(obj) => {
              updatePlanningData(prev => ({
                ...prev,
                generalObjectives: prev.generalObjectives.map(o =>
                  o.id === obj.id ? obj : o
                )
              }));
            }}
            onDelete={(id) => {
              updatePlanningData(prev => ({
                ...prev,
                generalObjectives: prev.generalObjectives.filter(obj => obj.id !== id)
              }));
            }}
          />
        );
      case 'trimesterTopics':
        return <TrimesterTopicsSection topics={planningData.trimesterTopics} />;
      case 'detailedPlanning':
        return <DetailedPlanningSection planning={planningData.detailedPlanning} />;
      case 'didacticSequence':
        return <DidacticSequenceSection sequence={planningData.didacticSequence} />;
      case 'activities':
        return <ActivitiesSection activities={planningData.activities} />;
      case 'supportMaterials':
        return <SupportMaterialsSection materials={planningData.supportMaterials} />;
      case 'evaluation':
        return <EvaluationSection evaluation={planningData.evaluation} />;
      case 'diagnosticEvaluation':
        return <DiagnosticEvaluationSection evaluation={planningData.diagnosticEvaluation} />;
      case 'inclusionAndAccessibility':
        return <InclusionSection inclusion={planningData.inclusionAndAccessibility} />;
      case 'digitalTechnologies':
        return <DigitalTechnologiesSection tech={planningData.digitalTechnologies} />;
      case 'conclusions':
        return <ConclusionsSection conclusions={planningData.conclusions} />;
      case 'references':
        return <ReferencesSection references={planningData.references} />;
      default:
        return null;
    }
  }, [activeTab, planningData, updatePlanningData]);

  const handleSave = useCallback(() => {
    onSave(planningData);
    setUnsavedChanges(false);
    onClose();
  }, [planningData, onSave, onClose]);

  const handleClose = useCallback(() => {
    if (unsavedChanges) {
      const confirmClose = window.confirm(
        'Você tem alterações não salvas. Deseja realmente fechar?'
      );
      if (!confirmClose) return;
    }
    onClose();
  }, [unsavedChanges, onClose]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  const selectTab = useCallback((tabId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveTab(tabId);
  }, []);

  const activeSection = sections.find(s => s.id === activeTab);

  const renderSectionsByCategory = (category: string) => {
    const sectionsInCategory = filteredSections.filter(s => s.category === category);
    if (sectionsInCategory.length === 0) return null;

    return (
      <div key={category} style={{ marginBottom: '1rem' }}>
        {!isSidebarCollapsed && (
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '0.5rem 1rem',
            marginBottom: '0.25rem'
          }}>
            {categoryLabels[category as keyof typeof categoryLabels]}
          </div>
        )}
        {sectionsInCategory.map((section) => (
          <button
            key={section.id}
            onClick={(e) => selectTab(section.id, e)}
            style={{
              width: '100%',
              padding: isSidebarCollapsed ? '0.75rem' : '0.75rem 1rem',
              background: activeTab === section.id ? '#e0f2fe' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
              gap: '0.75rem',
              textAlign: 'left',
              color: activeTab === section.id ? '#0369a1' : '#64748b',
              transition: 'all 0.2s ease',
              fontSize: '0.875rem',
              fontWeight: activeTab === section.id ? '500' : '400',
              borderRadius: '8px',
              margin: '0.125rem 0'
            }}
            title={isSidebarCollapsed ? section.label : undefined}
          >
            <span style={{
              display: 'flex',
              color: activeTab === section.id ? '#0369a1' : '#64748b',
              flexShrink: 0
            }}>
              {section.icon}
            </span>
            {!isSidebarCollapsed && (
              <span style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {section.label}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <Modal
      title={initialData ? "Editar Planejamento" : "Novo Planejamento"}
      submitText={initialData ? "Atualizar" : "Salvar"}
      isOpen={isOpen}
      size="xl"
      onClose={handleClose}
      onSubmit={handleSave}
    >
      <div
        style={{
          display: 'flex',
          height: '75vh',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar de Navegação */}
        <div style={{
          width: isSidebarCollapsed ? '60px' : '280px',
          borderRight: '1px solid #e2e8f0',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Header da Sidebar */}
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {!isSidebarCollapsed && (
              <h3 style={{
                margin: 0,
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--color-primary)'
              }}>
                Seções do Planejamento
              </h3>
            )}
            <button
              onClick={toggleSidebar}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b',
                padding: '0.5rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              title={isSidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
            >
              <FiChevronRight
                size={18}
                style={{
                  transform: isSidebarCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </button>
          </div>

          {/* Barra de Pesquisa */}
          {!isSidebarCollapsed && (
            <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ position: 'relative' }}>
                <FiSearch
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8'
                  }}
                />
                <input
                  type="text"
                  placeholder="Buscar seção..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem 0.5rem 2.5rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                  }}
                />
              </div>
            </div>
          )}

          {/* Lista de Seções */}
          <div style={{
            overflowY: 'auto',
            flex: 1,
            padding: '0.5rem'
          }}>
            {Object.keys(categoryLabels).map(category =>
              renderSectionsByCategory(category)
            )}
          </div>

          {/* Progress Indicator */}
          {!isSidebarCollapsed && (
            <div style={{
              padding: '1rem',
              borderTop: '1px solid #e2e8f0',
            }}>
              <div style={{
                fontSize: '0.75rem',
                color: '#64748b',
                marginBottom: '0.5rem'
              }}>
                Progresso do Planejamento
              </div>
              <div style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#e2e8f0',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '65%', // Exemplo - você pode calcular baseado nos dados preenchidos
                  height: '100%',
                  backgroundColor: '#22c55e',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#64748b',
                marginTop: '0.25rem'
              }}>
                65% completo
              </div>
            </div>
          )}
        </div>

        {/* Conteúdo Principal */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header do Conteúdo */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                {activeSection && (
                  <span style={{ color: '#3b82f6' }}>
                    {activeSection.icon}
                  </span>
                )}
                <SectionTitle style={{ margin: 0, fontSize: '1.25rem' }}>
                  {activeSection?.label}
                </SectionTitle>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button
                onClick={handleClose}
                variant='secondary'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem'
                }}
              >
                <FiX size={16} />
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem'
                }}
              >
                <FiSave size={16} />
                Salvar
              </Button>
            </div>
          </div>

          {/* Área de Conteúdo Rolável */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem'
          }}>
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PlanningModal;