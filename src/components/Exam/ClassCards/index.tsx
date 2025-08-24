import React, { useState } from 'react';
import { Assessment, ClassData, Student } from '../../../types/academic/ExamAssesments';
import {
  ClassGrid,
  ClassCard,
  ClassHeader,
  AssessmentItem,
  StudentScore,
  CollapseButton,
  ClassPeriod,
  ClassAverage,
  AssessmentStats,
  TrimesterHeader
} from './styles';

interface ClassCardsProps {
  classes: ClassData[];
  periodType: 'bimester' | 'trimester' | 'semester';
  onSelectClass: (classId: string) => void;
  selectedClass: string | null;
}

const ClassCards: React.FC<ClassCardsProps> = ({
  classes,
  periodType,
  onSelectClass,
  selectedClass
}) => {
  const [expandedClass, setExpandedClass] = useState<string | null>(null);
  const [expandedAssessment, setExpandedAssessment] = useState<string | null>(null);

  const toggleClass = (classId: string) => {
    setExpandedClass(expandedClass === classId ? null : classId);
    setExpandedAssessment(null);
  };

  const toggleAssessment = (assessmentId: string) => {
    setExpandedAssessment(expandedAssessment === assessmentId ? null : assessmentId);
  };

  const calculateClassAverage = (assessments: Assessment[], students: Student[]) => {
    if (!assessments.length || !students.length) return 0;

    const total = assessments.reduce((sum, assessment) => {
      return sum + (assessment.average || 0);
    }, 0);

    return total / assessments.length;
  };


  const groupAssessmentsByTrimester = (assessments: Assessment[]) => {
    return assessments.reduce((acc, assessment) => {
      const trimester = assessment.trimester || 'Outros';
      if (!acc[trimester]) {
        acc[trimester] = [];
      }
      acc[trimester].push(assessment);
      return acc;
    }, {} as Record<string, Assessment[]>);
  };

  return (
    <ClassGrid>
      {classes.map(classData => {
        const classAvg = calculateClassAverage(classData.assessments, classData.students);
        const isSelected = selectedClass === classData.id;

        return (
          <ClassCard
            key={classData.id}
            $selected={isSelected}
            onClick={() => onSelectClass(classData.id)}
          >
            <ClassHeader
              onClick={(e) => {
                e.stopPropagation();
                toggleClass(classData.id);
              }}
              $expanded={expandedClass === classData.id}
            >
              <div className="class-info">
                <h3>{classData.name}</h3>
                <ClassPeriod>{classData.period}</ClassPeriod>
                <ClassAverage>
                  Média da turma: <strong>{classAvg.toFixed(1)}</strong>
                </ClassAverage>
              </div>

              <CollapseButton>
                {expandedClass === classData.id ? '−' : '+'}
              </CollapseButton>
            </ClassHeader>

            {expandedClass === classData.id && (
              <div className="assessments-list">
                {Object.entries(groupAssessmentsByTrimester(classData.assessments)).map(([trimester, assessments]) => (
                  <TrimesterHeader key={trimester}>
                    <h4 className="trimester-header">{trimester}</h4>
                    {assessments.map(assessment => (
                      <AssessmentItem key={assessment.id}>
                        <div
                          className="assessment-header"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAssessment(assessment.id);
                          }}
                        >
                          <div className="assessment-info">
                            <strong>{assessment.title}</strong>
                            <span>{new Date(assessment.date).toLocaleDateString()}</span>
                            <span>Tipo: {assessment.type}</span>
                          </div>

                          <AssessmentStats>
                            <span>Média: {assessment.average?.toFixed(1) || '-'}</span>
                            <span>Max: {assessment.maxScore}</span>
                            <CollapseButton small>
                              {expandedAssessment === assessment.id ? '−' : '+'}
                            </CollapseButton>
                          </AssessmentStats>
                        </div>

                        {expandedAssessment === assessment.id && (
                          <div className="students-scores">
                            <div className="score-header">
                              <span>Aluno</span>
                              <span>Nota</span>
                            </div>
                            {classData.students.map(student => (
                              <StudentScore
                                key={student.id}
                                $lowScore={(student.scores[assessment.id] || 0) < (assessment.maxScore * 0.6)}
                              >
                                <span>{student.name}</span>
                                <span>{student.scores[assessment.id] || '-'}</span>
                              </StudentScore>
                            ))}
                          </div>
                        )}
                      </AssessmentItem>
                    ))}
                  </TrimesterHeader>
                ))}
              </div>
            )}
          </ClassCard>
        );
      })}
    </ClassGrid>
  );
};

export default ClassCards;