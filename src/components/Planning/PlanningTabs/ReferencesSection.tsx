import React from 'react';

interface ReferencesProps {
  references: string[];
}

const ReferencesSection: React.FC<ReferencesProps> = ({ references }) => {
  return (
    <div className="section">
      <h2>Referências Bibliográficas</h2>
      <div className="form-group">
        <textarea value={references.join('\n')} rows={10} />
      </div>
    </div>
  );
};

export default ReferencesSection;