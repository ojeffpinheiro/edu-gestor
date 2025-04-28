import React from 'react';
import styled from 'styled-components';
import { Container, Grid } from "../../styles/layoutUtils";
import { Lesson, Task } from '../../utils/types/Planning';

interface TabPlanningProps {
    tasks: Task[];
    lessons: Lesson[];
    toggleTask: (id: number) => void;
}

const Card = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  min-width: 30vw;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

// Styled Components para Checkbox
const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.25rem 0;
`;

const Checkbox = styled.div<{ checked: boolean }>`
    width: 18px;
    height: 18px;
    border-radius: 3px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.checked ? 'var(--color-primary, #4a6fa5)' : 'transparent'};
    border: 1px solid ${props => props.checked ? 'var(--color-primary, #4a6fa5)' : 'var(--color-border, #ccc)'};
    transition: all 0.2s ease-in-out;
`;

const CheckboxLabel = styled.span<{ checked: boolean }>`
    text-decoration: ${props => props.checked ? 'line-through' : 'none'};
    color: ${props => props.checked ? 'var(--color-text-secondary, #888)' : 'var(--color-text, #333)'};
    transition: all 0.2s ease-in-out;
`;

// Styled Components para o Planejamento Semanal
const WeekGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--space-sm, 0.5rem);
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const DayCard = styled.div`
    background-color: var(--color-background-light, #f9f9f9);
    border-radius: var(--border-radius, 4px);
    padding: var(--space-sm, 0.5rem);
    min-height: 120px;
`;

const DayTitle = styled.h4`
    margin: 0 0 var(--space-xs, 0.25rem) 0;
    font-size: 0.9rem;
    color: var(--color-primary, #4a6fa5);
    border-bottom: 1px solid var(--color-border-light, #eee);
    padding-bottom: var(--space-xs, 0.25rem);
`;

const ClassItem = styled.div`
    margin-bottom: var(--space-xs, 0.25rem);
    padding: var(--space-xs, 0.25rem);
    border-left: 3px solid var(--color-accent, #6a8ec8);
    background-color: var(--color-background, white);
    border-radius: 0 var(--border-radius-sm, 2px) var(--border-radius-sm, 2px) 0;
`;

const ClassTitle = styled.div`
    font-weight: 600;
    font-size: 0.85rem;
`;

const ClassTime = styled.div`
    font-size: 0.75rem;
    color: var(--color-text-secondary, #888);
`;

const ClassInfo = styled.div`
    font-size: 0.8rem;
    margin-top: var(--space-xs, 0.25rem);
`;

const TabPlanning: React.FC<TabPlanningProps> = ({ tasks, lessons, toggleTask }) => {
    return (
        <Container>
            <CardTitle>Planejamento de Aulas</CardTitle>
            <Grid columns={2} style={{ maxWidth: '55vw;' }} >
                <Card>
                    <CardTitle>Tarefas pendentes</CardTitle>
                    <div>
                        {tasks.map(task => (
                            <div key={task.id} style={{ marginBottom: 'var(--space-sm, 0.5rem)' }}>
                                <CheckboxContainer onClick={() => toggleTask(task.id)}>
                                    <Checkbox checked={task.completed}>
                                        {task.completed && <span style={{ color: 'white' }}>✓</span>}
                                    </Checkbox>
                                    <CheckboxLabel checked={task.completed}>{task.text}</CheckboxLabel>
                                </CheckboxContainer>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card>
                    <CardTitle>Planejamento Semanal</CardTitle>
                    <WeekGrid>
                        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map(day => (
                            <DayCard key={day}>
                                <DayTitle>{day}</DayTitle>
                                <div>
                                    {lessons.filter(lesson => lesson.day === day).map(lesson => (
                                        <ClassItem key={lesson.id}>
                                            <ClassTitle>{lesson.team}</ClassTitle>
                                            <ClassTime>{lesson.timeSlot}</ClassTime>
                                            <ClassInfo>{lesson.discipline}</ClassInfo>
                                        </ClassItem>
                                    ))}
                                </div>
                            </DayCard>
                        ))}
                    </WeekGrid>
                </Card>
            </Grid>
        </Container>
    );
};

export default TabPlanning;