import React from 'react';
import { usePlanningContext } from '../../contexts/PlanningContext';
import { Button } from '../../styles/buttons';

const UndoRedoControls: React.FC = () => {
  const { canUndo, canRedo, dispatch } = usePlanningContext();
  
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <Button onClick={() => dispatch({ type: 'UNDO' })} disabled={!canUndo}>
        Desfazer
      </Button>
      <Button onClick={() => dispatch({ type: 'REDO' })} disabled={!canRedo}>
        Refazer
      </Button>
    </div>
  );
};

export default UndoRedoControls;