import React from 'react';
import { StudentResult } from '../../utils/types/Assessment';

interface StudentDetailsProps {
  student: StudentResult;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
  return (
    <div className="student-details">
      <h2>{student.studentName}</h2>
      <div className="student-metrics">
        <div className="metric">
          <span className="label">Média Geral:</span>
          <span className="value">{student.overallAverage.toFixed(1)}%</span>
        </div>
        <div className="metric">
          <span className="label">Tendência:</span>
          <span className={`value trend-${student.progressTrend}`}>
            {student.progressTrend === 'improving' ? '↑ Melhorando' :
             student.progressTrend === 'declining' ? '↓ Piorando' : '↔ Estável'}
          </span>
        </div>
        {student.attendanceRate && (
          <div className="metric">
            <span className="label">Frequência:</span>
            <span className="value">{student.attendanceRate}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;