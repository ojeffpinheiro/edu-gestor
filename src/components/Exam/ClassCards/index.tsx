// src/components/Exam/ClassCards/index.tsx
import React, { useState } from 'react';

import { ClassData } from '../../../utils/types/ExamAssesments';

import { 
  ClassCard, 
  ClassHeader, 
  AssessmentItem, 
  StudentScore,
  CollapseButton
} from './styles';

interface ClassCardsProps {
  classes: ClassData[];
  periodType: 'bimester' | 'trimester' | 'semester';
}

const ClassCards: React.FC<ClassCardsProps> = ({ classes, periodType }) => {
  const [expandedClass, setExpandedClass] = useState<string | null>(null);
  const [expandedAssessment, setExpandedAssessment] = useState<string | null>(null);

  const toggleClass = (classId: string) => {
    setExpandedClass(expandedClass === classId ? null : classId);
    setExpandedAssessment(null);
  };

  const toggleAssessment = (assessmentId: string) => {
    setExpandedAssessment(expandedAssessment === assessmentId ? null : assessmentId);
  };

  return (
    <div className="class-grid">
      {classes.map(classData => (
        <ClassCard key={classData.id}>
          <ClassHeader onClick={() => toggleClass(classData.id)}>
            <h3>{classData.name}</h3>
            <span>{classData.period}</span>
            <CollapseButton>
              {expandedClass === classData.id ? '−' : '+'}
            </CollapseButton>
          </ClassHeader>

          {expandedClass === classData.id && (
            <div className="assessments-list">
              {classData.assessments.map(assessment => (
                <AssessmentItem key={assessment.id}>
                  <div 
                    className="assessment-header"
                    onClick={() => toggleAssessment(assessment.id)}
                  >
                    <div>
                      <strong>{assessment.title}</strong>
                      <span>{assessment.date}</span>
                    </div>
                    <div>
                      <span>Média: {assessment.average?.toFixed(1) || '-'}</span>
                      <CollapseButton small>
                        {expandedAssessment === assessment.id ? '−' : '+'}
                      </CollapseButton>
                    </div>
                  </div>

                  {expandedAssessment === assessment.id && (
                    <div className="students-scores">
                      {classData.students.map(student => (
                        <StudentScore key={student.id}>
                          <span>{student.name}</span>
                          <span>{student.scores[assessment.id] || '-'}</span>
                        </StudentScore>
                      ))}
                    </div>
                  )}
                </AssessmentItem>
              ))}
            </div>
          )}
        </ClassCard>
      ))}
    </div>
  );
};

export default ClassCards;