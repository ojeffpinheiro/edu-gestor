import React, { useContext } from 'react';
import PlanningContext from '../../contexts/PlanningContext';
import { Button } from '../../styles/buttons';

const UndoRedoControls: React.FC = () => {
  const { undo, redo, canUndo, canRedo } = useContext(PlanningContext);
  
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <Button onClick={undo} disabled={!canUndo}>
        Desfazer
      </Button>
      <Button onClick={redo} disabled={!canRedo}>
        Refazer
      </Button>
    </div>
  );
};

export default UndoRedoControls;