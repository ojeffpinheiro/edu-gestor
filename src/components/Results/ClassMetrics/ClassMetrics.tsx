import React from 'react';
import { ClassPerformance, ClassMetricsType } from '../../../utils/types/Assessment'
import MetricCard from './MetricCard';

const calculateClassMetrics = (currentClass: ClassPerformance): ClassMetricsType => {
  const totalStudents = currentClass.students.length;
  const examCount = currentClass.examResults.length;

  const averageScore = examCount > 0
    ? currentClass.examResults.reduce((sum, exam) => sum + exam.averageScore, 0) / examCount
    : 0;

  const passingStudents = currentClass.students.filter(student => {
    const studentResults = currentClass.examResults.flatMap(exam => exam.results || [])
      .filter(result => result.studentId === student.id);
    return studentResults.length > 0 && studentResults.every(result => result.totalScore >= 70);
  }).length;

  const failingStudents = totalStudents - passingStudents;
  const frequentStudents = currentClass.students.filter(s => 
    s.attendanceRate !== undefined && s.attendanceRate >= 75
  ).length;

  return {
    totalStudents,
    averageScore,
    passingRate: (passingStudents / totalStudents) * 100,
    failingRate: (failingStudents / totalStudents) * 100,
    frequentStudents,
    infrequentStudents: totalStudents - frequentStudents,
    attendanceRate: frequentStudents / totalStudents * 100,
    failingStudents,
    failingStudentsChange: 0
  };
};

interface ClassMetricsProps {
  currentClass: ClassPerformance;
}

const ClassMetrics: React.FC<ClassMetricsProps> = ({ currentClass }) => {
  const metrics = calculateClassMetrics(currentClass);

  return (
    <div className="metrics-row">
      <MetricCard 
        title="Total de Alunos" 
        value={metrics.totalStudents.toString()} 
      />
      
      <MetricCard 
        title="Média da Turma" 
        value={metrics.averageScore.toFixed(1)}
        unit="pts"
      />
      
      <MetricCard 
        title="Taxa de Aprovação" 
        value={metrics.passingRate.toFixed(1)}
        unit="%"
      />
      
      <MetricCard 
        title="Alunos em Recuperação" 
        value={metrics.failingStudents.toString()}
        className="warning"
        change={metrics.failingStudentsChange}
      />
      
      <MetricCard 
        title="Frequência" 
        value={`${metrics.frequentStudents}`}
        unit={`/${metrics.totalStudents}`}
        subtext={`(${metrics.attendanceRate.toFixed(1)}% de frequência)`}
      />
    </div>
  );
};

export default ClassMetrics;