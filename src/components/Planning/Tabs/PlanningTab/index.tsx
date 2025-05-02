import React from 'react';
import { Lesson, Task } from '../../../../utils/types/Planning';
import { 
    Card, 
    CardTitle, 
    Checkbox, 
    CheckboxContainer, 
    CheckboxLabel, 
    ClassInfo, 
    ClassItem, 
    ClassTime, 
    ClassTitle, 
    Content, 
    DayCard, 
    DayTitle, 
    WeekGrid,
 } from './styles';


interface TabPlanningProps {
  tasks: Task[];
  lessons: Lesson[];
  toggleTask: (id: number) => void;
}

const TabPlanning: React.FC<TabPlanningProps> = ({ tasks, lessons, toggleTask }) => {
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
                  {lessons
                    .filter(lesson => lesson.day === day)
                    .map(lesson => (
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