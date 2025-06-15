import React, { useContext } from 'react';
import { filterLessons } from '../../../../utils/scheduleUtils';
import PlanningContext from '../../../../contexts/PlanningContext';

import { 
  Card, 
  CardTitle,
  Checkbox,
  CheckboxContainer,
  CheckboxLabel,
  ClassInfo,
  ClassItem,
  ClassTitle,
  ClassTime,
  Content,
  DayCard,
  DayTitle,
  WeekGrid
} from './styles';

const TabPlanning: React.FC = () => {
  const { state, toggleTask } = useContext(PlanningContext);
  const { tasks, lessons } = state;
  const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  return (
    <div style={{ padding: '1rem' }}>
      <Card>
        <CardTitle>Planejamento de Aulas</CardTitle>
        
        <Content columns={2} gap="lg">
          <div>
            <CardTitle style={{ marginBottom: '1rem' }}>Tarefas Pendentes</CardTitle>
            {tasks.map(task => (
              <CheckboxContainer key={task.id} onClick={() => toggleTask(task.id)}>
                <Checkbox checked={task.completed}>
                  {task.completed && <span>✓</span>}
                </Checkbox>
                <CheckboxLabel checked={task.completed}>{task.text}</CheckboxLabel>
              </CheckboxContainer>
            ))}
          </div>

          <div>
            <CardTitle style={{ marginBottom: '1rem' }}>Grade Semanal</CardTitle>
            <WeekGrid>
              {weekDays.map(day => (
                <DayCard key={day}>
                  <DayTitle>{day}</DayTitle>
                  {filterLessons(lessons, 'todas', day).map(lesson => (
                    <ClassItem key={`${day}-${lesson.id}`}>
                      <ClassTitle>{lesson.discipline}</ClassTitle>
                      <ClassTime>{lesson.timeSlot}</ClassTime>
                      <ClassInfo>{lesson.team}</ClassInfo>
                    </ClassItem>
                  ))}
                </DayCard>
              ))}
            </WeekGrid>
          </div>
        </Content>
      </Card>
    </div>
  );
};

export default TabPlanning;