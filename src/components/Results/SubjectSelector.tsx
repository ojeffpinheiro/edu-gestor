import React from 'react';

interface SubjectSelectorProps {
  subjects: string[];
  selectedSubject: string | null;
  onSelect: (subject: string | null) => void;
  className?: string;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  subjects,
  selectedSubject,
  onSelect,
  className = ''
}) => {
  return (
    <div className={`subject-selector ${className}`}>
      <label>Disciplina:</label>
      <select
        value={selectedSubject || ''}
        onChange={(e) => onSelect(e.target.value || null)}
      >
        <option value="">Todas</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubjectSelector;