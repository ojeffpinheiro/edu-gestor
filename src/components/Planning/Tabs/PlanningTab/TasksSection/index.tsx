import React, { useContext } from 'react';
import PlanningContext from '../../../../../contexts/PlanningContext';
import { 
  CheckboxContainer, 
  Checkbox, 
  CheckboxLabel, 
  CardTitle
} from './styles';

const TasksSection: React.FC = () => {
  const { state, toggleTask } = useContext(PlanningContext);
  const { tasks } = state;

  return (
    <div>
      <CardTitle>Tarefas Pendentes</CardTitle>
      {tasks.map(task => (
        <CheckboxContainer key={task.id} onClick={() => toggleTask(task.id)}>
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