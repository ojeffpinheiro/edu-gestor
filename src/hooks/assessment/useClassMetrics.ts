import { useMemo } from 'react';
import { ClassPerformance, ClassMetricsType } from '../../types/academic/Assessment';

/**
 * Calcula métricas agregadas para uma turma
 * @param filteredClassData Dados da turma filtrados
 * @returns Métricas calculadas ou null se não houver dados
 */
export const useClassMetrics = (filteredClassData: ClassPerformance | null) => {
  return useMemo<ClassMetricsType | null>(() => {
      if (!filteredClassData) return null;
  
      const frequentStudents = filteredClassData.students.filter((s: { attendanceRate?: number }) =>
        s.attendanceRate !== undefined && s.attendanceRate >= 75
      ).length;
  
      return {
        totalStudents: filteredClassData.studentCount,
        averageScore: filteredClassData.averageScore,
        passingRate: filteredClassData.passingRate,
        failingRate: 100 - filteredClassData.passingRate,
        frequentStudents,
        infrequentStudents: filteredClassData.studentCount - frequentStudents,
        attendanceRate: filteredClassData.attendanceRate ||
          (frequentStudents / filteredClassData.studentCount * 100),
        failingStudents: Math.round((100 - filteredClassData.passingRate) / 100 * filteredClassData.studentCount),
        failingStudentsChange: filteredClassData.performanceTrend === 'declining' ? -5 :
          filteredClassData.performanceTrend === 'improving' ? 5 : 0
      };
    }, [filteredClassData]);
};