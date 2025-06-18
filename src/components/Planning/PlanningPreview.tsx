import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../styles/card';
import { Button } from '../../styles/buttons';
import { Lesson, LessonPlanTemplate, Team } from '../../utils/types/Planning';

interface PlanningPreviewProps {
  team: Team;
  template?: LessonPlanTemplate;
}

const PlanningPreview: React.FC<PlanningPreviewProps> = ({ team, template }) => {
  const [previewData, setPreviewData] = useState<{
    schedule: Lesson[];
    objectives: string[];
  } | null>(null);

  const generatePreview = () => {
    // Simular combinação de template com horários da turma
    const mockSchedule: Lesson[] = [
      { id: 1, day: 'Segunda', timeSlot: '08:00 - 09:40', discipline: 'Matemática', shift: 'Manhã',  team: team.name },
      { id: 2, day: 'Quarta', timeSlot: '10:00 - 11:40', discipline: 'Português', shift: 'Manhã', team: team.name },
    ];

    const mockObjectives = [
      'Desenvolver habilidades básicas de álgebra',
      'Melhorar compreensão de textos'
    ];

    setPreviewData({
      schedule: mockSchedule,
      objectives: mockObjectives
    });
  };

  const confirmPlanning = () => {
    // Implementar lógica de confirmação
    console.log('Plano confirmado para', team.name);
  };

  return (
    <Card className="planning-preview">
      <CardHeader>
        <h3>Pré-visualização do Planejamento</h3>
        <Button onClick={generatePreview}>Gerar Pré-visualização</Button>
      </CardHeader>

      {previewData && (
        <CardBody>
          <div className="preview-schedule">
            <h4>Grade Horária Proposta</h4>
            <ul>
              {previewData.schedule.map(lesson => (
                <li key={lesson.id}>
                  {lesson.day} - {lesson.timeSlot}: {lesson.discipline}
                </li>
              ))}
            </ul>
          </div>

          <div className="preview-objectives">
            <h4>Objetivos de Aprendizagem</h4>
            <ul>
              {previewData.objectives.map((obj, index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>

          <div className="preview-actions">
            <Button variant="primary" onClick={confirmPlanning}>
              Confirmar Planejamento
            </Button>
            <Button variant="secondary" onClick={() => setPreviewData(null)}>
              Ajustar
            </Button>
          </div>
        </CardBody>
      )}
    </Card>
  );
};

export default PlanningPreview;