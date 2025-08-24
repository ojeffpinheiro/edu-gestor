import React, { useState } from 'react';

import { mockPlanningData } from '../../../../mocks/planning';

import { GeneralObjective, PlanningData, SchoolInfo } from '../../../../types/academic/Planning';
import SchoolInfoSection from '../../PlanningTabs/SchoolInfoSection';
import GeneralObjectivesSection from '../../PlanningTabs/GeneralObjectivesSection';
import TrimesterTopicsSection from '../../PlanningTabs/TrimesterTopicsSection';
import DetailedPlanningSection from '../../PlanningTabs/DetailedPlanningSection';
import DidacticSequenceSection from '../../PlanningTabs/DidacticSequenceSection';
import ActivitiesSection from '../../PlanningTabs/ActivitiesSection';
import SupportMaterialsSection from '../../PlanningTabs/SupportMaterialsSection';
import EvaluationSection from '../../PlanningTabs/EvaluationSection';
import DiagnosticEvaluationSection from '../../PlanningTabs/DiagnosticEvaluationSection';
import InclusionSection from '../../PlanningTabs/InclusionSection';
import DigitalTechnologiesSection from '../../PlanningTabs/DigitalTechnologiesSection';
import ConclusionsSection from '../../PlanningTabs/ConclusionsSection';
import ReferencesSection from '../../PlanningTabs/ReferencesSection';

import {
  PlanningContainer,
  TabsContainer,
  TabButton,
  ConfirmationDialog,
  Button
} from './styles';

interface ModalState {
  isOpen: boolean;
  type: string;
  data: GeneralObjective | SchoolInfo | null;
}

const PlanningTab: React.FC = () => {
  const [planningData, setPlanningData] = useState<PlanningData>(mockPlanningData);
  const [activeTab, setActiveTab] = useState('schoolInfo');
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: '',
    data: null
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: string, id: string } | null>(null);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentModal, setCurrentModal] = useState<string | null>(null);

  const openModal = (type: string, data: GeneralObjective | SchoolInfo | null = null) => {
    setModalState({
      isOpen: true,
      type,
      data
    });
  };

  const handleSaveGeneralObjective = (data: { description: string }) => {
    if (modalState.data && 'id' in modalState.data) {
      // Edição
      setPlanningData(prev => ({
        ...prev,
        generalObjectives: prev.generalObjectives.map(obj => 
          obj.id === (modalState.data as GeneralObjective).id ? { ...obj, ...data } : obj
        )
      }));
    } else {
      // Adição
      setPlanningData(prev => ({
        ...prev,
        generalObjectives: [...prev.generalObjectives, {
          id: Date.now().toString(),
          description: data.description
        }]
      }));
    }
    closeModal();
  };

  const handleDeleteGeneralObjective = (id: string) => {
    setPlanningData(prev => ({
      ...prev,
      generalObjectives: prev.generalObjectives.filter(obj => obj.id !== id)
    }));
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: '',
      data: null
    });
  };

  const handleSaveSchoolInfo = (data: SchoolInfo) => {
    setPlanningData(prev => ({ ...prev, schoolInfo: data }));
    closeModal();
  };

  // Funções genéricas para atualização
  const updateSchoolInfo = (updatedInfo: SchoolInfo) => {
    setPlanningData(prev => ({ ...prev, schoolInfo: updatedInfo }));
  };

  const addGeneralObjective = () => {
    const newObjective: GeneralObjective = {
      id: Date.now().toString(),
      description: ''
    };
    setPlanningData(prev => ({
      ...prev,
      generalObjectives: [...prev.generalObjectives, newObjective]
    }));
  };

  const updateGeneralObjective = (id: string, description: string) => {
    setPlanningData(prev => ({
      ...prev,
      generalObjectives: prev.generalObjectives.map(obj =>
        obj.id === id ? { ...obj, description } : obj
      )
    }));
  };

  const confirmDelete = (type: string, id: string) => {
    setItemToDelete({ type, id });
    setShowConfirmation(true);
  };

  const handleDelete = () => {
    if (!itemToDelete) return;

    const { type, id } = itemToDelete;

    setPlanningData(prev => {
      switch (type) {
        case 'generalObjective':
          return {
            ...prev,
            generalObjectives: prev.generalObjectives.filter(obj => obj.id !== id)
          };
        case 'topic':
          return {
            ...prev,
            trimesterTopics: prev.trimesterTopics.filter(topic => topic.id !== id)
          };
        // Adicione outros casos conforme necessário
        default:
          return prev;
      }
    });

    setShowConfirmation(false);
    setItemToDelete(null);
  };

  // Funções de validação
  const validateSchoolInfo = (data: SchoolInfo): boolean => {
    return (
      data.school.trim() !== '' &&
      data.discipline.trim() !== '' &&
      data.grade.trim() !== '' &&
      data.studentCount > 0
    );
  };


  const handleSchoolInfoChange = (updatedInfo: SchoolInfo) => {
    setPlanningData(prev => ({
      ...prev,
      schoolInfo: updatedInfo
    }));
  };

  return (
    <PlanningContainer>
      <h1>Planejamento por Série</h1>

      <TabsContainer>
        <TabButton active={activeTab === 'schoolInfo'} onClick={() => setActiveTab('schoolInfo')}>Informações da Escola</TabButton>
        <TabButton active={activeTab === 'generalObjectives'} onClick={() => setActiveTab('generalObjectives')}>Objetivos Gerais</TabButton>
        <TabButton active={activeTab === 'trimesterTopics'} onClick={() => setActiveTab('trimesterTopics')}>Tópicos do Trimestre</TabButton>
        <TabButton active={activeTab === 'detailedPlanning'} onClick={() => setActiveTab('detailedPlanning')}>Planejamento Detalhado</TabButton>
        <TabButton active={activeTab === 'didacticSequence'} onClick={() => setActiveTab('didacticSequence')}>Cronograma</TabButton>
        <TabButton active={activeTab === 'activities'} onClick={() => setActiveTab('activities')}>Atividades</TabButton>
        <TabButton active={activeTab === 'supportMaterials'} onClick={() => setActiveTab('supportMaterials')}>Materiais</TabButton>
        <TabButton active={activeTab === 'evaluation'} onClick={() => setActiveTab('evaluation')}>Avaliação</TabButton>
        <TabButton active={activeTab === 'diagnosticEvaluation'} onClick={() => setActiveTab('diagnosticEvaluation')}>Avaliação Diagnóstica</TabButton>
        <TabButton active={activeTab === 'inclusionAndAccessibility'} onClick={() => setActiveTab('inclusionAndAccessibility')}>Inclusão</TabButton>
        <TabButton active={activeTab === 'digitalTechnologies'} onClick={() => setActiveTab('digitalTechnologies')}>Tecnologias</TabButton>
        <TabButton active={activeTab === 'conclusions'} onClick={() => setActiveTab('conclusions')}>Conclusões</TabButton>
        <TabButton active={activeTab === 'references'} onClick={() => setActiveTab('references')}>Referências</TabButton>
      </TabsContainer>

      <div className="tab-content">
        {activeTab === 'schoolInfo' && (
          <SchoolInfoSection 
            data={planningData.schoolInfo} 
            onChange={(updatedInfo) => 
              setPlanningData(prev => ({ ...prev, schoolInfo: updatedInfo }))
            }
          />
        )}
        {activeTab === 'generalObjectives' && (
          <GeneralObjectivesSection
            objectives={planningData.generalObjectives}
            onAdd={() => openModal('generalObjective')}
            onEdit={() => {}}
            onDelete={(id) => {
              setPlanningData(prev => ({
                ...prev,
                generalObjectives: prev.generalObjectives.filter(obj => obj.id !== id)
              }));
            }}
          />
        )}
        {activeTab === 'trimesterTopics' && <TrimesterTopicsSection topics={planningData.trimesterTopics} />}
        {activeTab === 'detailedPlanning' && <DetailedPlanningSection planning={planningData.detailedPlanning} />}
        {activeTab === 'didacticSequence' && <DidacticSequenceSection sequence={planningData.didacticSequence} />}
        {activeTab === 'activities' && <ActivitiesSection activities={planningData.activities} />}
        {activeTab === 'supportMaterials' && <SupportMaterialsSection materials={planningData.supportMaterials} />}
        {activeTab === 'evaluation' && <EvaluationSection evaluation={planningData.evaluation} />}
        {activeTab === 'diagnosticEvaluation' && <DiagnosticEvaluationSection evaluation={planningData.diagnosticEvaluation} />}
        {activeTab === 'inclusionAndAccessibility' && <InclusionSection inclusion={planningData.inclusionAndAccessibility} />}
        {activeTab === 'digitalTechnologies' && <DigitalTechnologiesSection tech={planningData.digitalTechnologies} />}
        {activeTab === 'conclusions' && <ConclusionsSection conclusions={planningData.conclusions} />}
        {activeTab === 'references' && <ReferencesSection references={planningData.references} />}
      </div>

      {showConfirmation && (
        <ConfirmationDialog>
          <div>
            <p>Tem certeza que deseja remover este item?</p>
            <Button onClick={handleDelete}>Confirmar</Button>
            <Button onClick={() => setShowConfirmation(false)}>Cancelar</Button>
          </div>
        </ConfirmationDialog>
      )}
    </PlanningContainer>
  );
};

export default PlanningTab;