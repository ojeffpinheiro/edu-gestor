import React from 'react';

interface ConclusionsProps {
  conclusions: string;
}

const ConclusionsSection: React.FC<ConclusionsProps> = ({ conclusions }) => {
  return (
    <div className="section">
      <h2>Conclusões e Reflexões</h2>
      <div className="form-group">
        <textarea value={conclusions} rows={10} />
      </div>
    </div>
  );
};

export default ConclusionsSection;