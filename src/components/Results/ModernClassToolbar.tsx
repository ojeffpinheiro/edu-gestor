import React from 'react';
import { ModernButton, ModernSelect, ModernToolbar } from './Features/styles/ClassViewStyles';

interface ModernClassToolbarProps {
  activeView: 'class' | 'school';
  onViewChange: (view: 'class' | 'school') => void;
  selectedClass: string | null;
  classes: Array<{ classId: string; className: string }>;
  onClassSelect: (classId: string | null) => void;
  selectedSubject: string | null;
  subjects: string[];
  onSubjectSelect: (subject: string | null) => void;
}

export const ModernClassToolbar: React.FC<ModernClassToolbarProps> = ({
  activeView,
  onViewChange,
  selectedClass,
  classes,
  onClassSelect,
  selectedSubject,
  subjects,
  onSubjectSelect
}) => {
  return (
    <ModernToolbar>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ModernButton
          $variant={activeView === 'class' ? 'primary' : 'ghost'}
          onClick={() => onViewChange('class')}
        >
          📊 Turma
        </ModernButton>
        <ModernButton
          $variant={activeView === 'school' ? 'primary' : 'ghost'}
          onClick={() => onViewChange('school')}
        >
          🏫 Escola
        </ModernButton>
      </div>

      <ModernSelect
        value={selectedClass || ''}
        onChange={(e) => onClassSelect(e.target.value || null)}
      >
        <option value="">Selecionar Turma</option>
        {classes.map(cls => (
          <option key={cls.classId} value={cls.classId}>
            {cls.className}
          </option>
        ))}
      </ModernSelect>

      <ModernSelect
        value={selectedSubject || ''}
        onChange={(e) => onSubjectSelect(e.target.value || null)}
      >
        <option value="">Todas as Disciplinas</option>
        {subjects.map(subject => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </ModernSelect>

      <ModernButton $variant="secondary" $size="sm">
        📥 Exportar
      </ModernButton>
    </ModernToolbar>
  );
};