import React from 'react';
import { ClassPerformance } from '../../types/academic/Assessment';
import ClassSelector from './ClassSelectorView';
import PeriodSelector from './PeriodSelector';
import ViewToggle from './ViewToggle';
import SubjectSelector from './SubjectSelector';

interface ClassViewToolbarProps {
  classPerformances: ClassPerformance[];
  selectedClass: string | null;
  onClassSelect: (classId: string | null) => void;
  availablePeriods: string[];
  selectedPeriod: string | null;
  setSelectedPeriod: (period: string | null) => void;
  activeView: 'class' | 'school';
  setActiveView: (view: 'class' | 'school') => void;
  subjects: { name: string }[]; 
  selectedSubject: string | null;
  setSelectedSubject: (subject: string | null) => void;
}

/**
 * Barra de ferramentas para controle da visualização de turmas com seletores.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {ClassPerformance[]} props.classPerformances - Lista de turmas disponíveis
 * @param {string | null} props.selectedClass - ID da turma selecionada
 * @param {Function} props.onClassSelect - Callback para seleção de turma
 * @param {string[]} props.availablePeriods - Períodos disponíveis para filtro
 * @param {string | null} props.selectedPeriod - Período selecionado
 * @param {Function} props.setSelectedPeriod - Callback para seleção de período
 * @param {'class' | 'school'} props.activeView - Visualização ativa
 * @param {Function} props.setActiveView - Callback para mudança de visualização
 * @param {Array<{name: string}>} props.subjects - Disciplinas disponíveis
 * @param {string | null} props.selectedSubject - Disciplina selecionada
 * @param {Function} props.setSelectedSubject - Callback para seleção de disciplina
 * @returns {JSX.Element} Barra de ferramentas com controles de visualização
 * 
 * @example
 * <ClassViewToolbar
 *   classPerformances={classes}
 *   selectedClass={selectedClassId}
 *   onClassSelect={handleClassSelect}
 *   // ... outras props
 * />
 */
const ClassViewToolbar: React.FC<ClassViewToolbarProps> = ({
    classPerformances,
    selectedClass,
    availablePeriods,
    activeView,
    subjects,
    selectedSubject,
    selectedPeriod,
    onClassSelect,
    setSelectedPeriod,
    setActiveView,
    setSelectedSubject,
}) => {
  return (
    <div className="class-controls">
      <ClassSelector
        classes={classPerformances}
        selectedClass={selectedClass}
        onSelect={onClassSelect}
      />
      <PeriodSelector
        periods={availablePeriods}
        selectedPeriod={selectedPeriod}
        onSelect={setSelectedPeriod}
      />
      <ViewToggle
        activeView={activeView}
        onViewChange={setActiveView}
      />
      {subjects?.length > 0 && (
        <SubjectSelector
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSelect={setSelectedSubject}
        />
      )}
    </div>
  );
};

export default ClassViewToolbar;