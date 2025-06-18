import React from 'react';
import { 
  CheckboxContainer, 
  Checkbox, 
  CheckboxLabel, 
  CardTitle
} from './styles';
import { usePlanningContext } from '../../../../../contexts/PlanningContext';

const TasksSection: React.FC = () => {
  const { state, dispatch } = usePlanningContext();
  const { tasks } = state;

  return (
    <div>
      <CardTitle>Tarefas Pendentes</CardTitle>
      {tasks.map(task => (
        <CheckboxContainer key={task.id} onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}>
          <Checkbox checked={task.completed}>
            {task.completed && <span>✓</span>}
          </Checkbox>
          <CheckboxLabel checked={task.completed}>{task.text}</CheckboxLabel>
        </CheckboxContainer>
      ))}
    </div>
  );
};

export default TasksSection;