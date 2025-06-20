// PlanningModal.tsx
import React from 'react';
import { PlanningData } from '../../../utils/types/Planning';
import { mockPlanningData } from '../../../mocks/planning';
import Modal from '../../modals/Modal';
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
import { SectionTitle } from '../../../styles/baseComponents';
import { Button } from '../../../styles/buttons';
import { FiBarChart2, FiBook, FiBookmark, FiCalendar, FiChevronRight, FiCpu, FiEdit, FiFileText, FiHome, FiPaperclip, FiSave, FiSearch, FiTarget, FiUsers, FiX } from 'react-icons/fi';

interface PlanningModalProps {
  isOpen: boolean;
  initialData?: PlanningData;
  onSave: (data: PlanningData) => void;
  onClose: () => void;
}

const PlanningModal: React.FC<PlanningModalProps> = ({ 
  isOpen, 
  initialData, 
  onSave, 
  onClose 
}) => {
  const [planningData, setPlanningData] = React.useState<PlanningData>(initialData || mockPlanningData);
  const [activeTab, setActiveTab] = React.useState('schoolInfo');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  
  const sections = [
    { id: 'schoolInfo', label: 'Informações da Escola', icon: <FiHome size={18} /> },
    { id: 'generalObjectives', label: 'Objetivos Gerais', icon: <FiTarget size={18} /> },
    { id: 'trimesterTopics', label: 'Tópicos do Trimestre', icon: <FiBook size={18} /> },
    { id: 'detailedPlanning', label: 'Planejamento Detalhado', icon: <FiEdit size={18} /> },
    { id: 'didacticSequence', label: 'Cronograma', icon: <FiCalendar size={18} /> },
    { id: 'activities', label: 'Atividades', icon: <FiEdit size={18} /> },
    { id: 'supportMaterials', label: 'Materiais', icon: <FiPaperclip size={18} /> },
    { id: 'evaluation', label: 'Avaliação', icon: <FiBarChart2 size={18} /> },
    { id: 'diagnosticEvaluation', label: 'Avaliação Diagnóstica', icon: <FiSearch size={18} /> },
    { id: 'inclusionAndAccessibility', label: 'Inclusão', icon: <FiUsers size={18} /> },
    { id: 'digitalTechnologies', label: 'Tecnologias', icon: <FiCpu size={18} /> },
    { id: 'conclusions', label: 'Conclusões', icon: <FiFileText size={18} /> },
    { id: 'references', label: 'Referências', icon: <FiBookmark size={18} /> }
  ];

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'schoolInfo':
        return (
          <SchoolInfoSection 
            data={planningData.schoolInfo} 
            onChange={(updatedInfo) => 
              setPlanningData(prev => ({ ...prev, schoolInfo: updatedInfo }))
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
              setPlanningData(prev => ({
                ...prev,
                generalObjectives: [...prev.generalObjectives, newObjective]
              }));
            }}
            onEdit={(obj) => {
              setPlanningData(prev => ({
                ...prev,
                generalObjectives: prev.generalObjectives.map(o => 
                  o.id === obj.id ? obj : o
                )
              }));
            }}
            onDelete={(id) => {
              setPlanningData(prev => ({
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
  };

  const handleSave = () => {
    onSave(planningData);
    onClose();
  };

  return (
    <Modal
      title={initialData ? "Editar Planejamento" : "Novo Planejamento"}
      submitText={initialData ? "Atualizar" : "Salvar"}
      isOpen={isOpen} size="xl"
      onClose={onClose} onSubmit={handleSave}
    >
      <div style={{ 
        display: 'flex', 
        height: '70vh',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
      }}>
        {/* Sidebar de Navegação */}
        <div style={{ 
          width: isSidebarCollapsed ? '60px' : '240px',
          background: '#f8fafc',
          borderRight: '1px solid #e2e8f0',
          transition: 'width 0.2s ease',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            padding: '1rem',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {!isSidebarCollapsed && <h3 style={{ margin: 0, fontSize: '0.9rem' }}>Seções</h3>}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b',
                padding: '0.25rem'
              }}
            >
              {isSidebarCollapsed ? <FiChevronRight size={18} /> : <FiChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />}
            </button>
          </div>
          
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: activeTab === section.id ? '#e2e8f0' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textAlign: 'left',
                  color: activeTab === section.id ? '#1e293b' : '#64748b',
                  transition: 'all 0.2s ease',
                  fontSize: '0.9rem'
                }}
              >
                <span style={{ 
                  display: 'flex',
                  color: activeTab === section.id ? '#3b82f6' : '#64748b'
                }}>
                  {section.icon}
                </span>
                {!isSidebarCollapsed && section.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Conteúdo Principal */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          background: 'white',
          padding: '1.5rem'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <SectionTitle>
              {sections.find(s => s.id === activeTab)?.label}
            </SectionTitle>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button 
                onClick={onClose} variant='secondary'
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <FiX size={16} />
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <FiSave size={16} />
                Salvar
              </Button>
            </div>
          </div>
          
          {renderActiveSection()}
        </div>
      </div>
    </Modal>
  );
};

export default PlanningModal;