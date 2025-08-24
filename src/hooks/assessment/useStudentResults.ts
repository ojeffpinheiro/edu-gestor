import { useMemo } from 'react';
import { ClassPerformance, ExamResult, ExamSummary, StudentResult } from '../../types/academic/Assessment';

/**
 * Transforma dados brutos de alunos em formato para exibição
 * @param currentClass Dados da turma atual
 * @returns Array de resultados formatados para exibição
 */
export const useStudentResults = (currentClass: ClassPerformance | null) => {
    return useMemo<StudentResult[]>(() => {
        if (!currentClass) return [];

        return currentClass.students.map((student: {
            id: string;
            name: string;
            email?: string;
            attendanceRate?: number;
            overallPercentile?: number;
        }) => {
            const studentExams = currentClass.examResults.flatMap((exam: ExamSummary) =>
                exam.results?.filter((result: ExamResult) => result.studentId === student.id) || []
            );

            const overallAverage = studentExams.length > 0
                ? studentExams.reduce((sum: number, exam: ExamResult) => sum + exam.totalScore, 0) / studentExams.length
                : 0;

            const skillProfile = studentExams.reduce((skills: Record<string, number>, exam: ExamResult) => {
                exam.answers.forEach((answer: { skills?: Record<string, number> }) => {
                    if (answer.skills) {
                        Object.entries(answer.skills).forEach(([skill, score]) => {
                            skills[skill] = (skills[skill] || 0) + score;
                        });
                    }
                });
                return skills;
            }, {} as Record<string, number>);

            return {
                studentId: student.id,
                studentName: student.name,
                studentEmail: student.email || '',
                classId: currentClass.classId,
                className: currentClass.className,
                examResults: studentExams,
                overallAverage,
                progressTrend: student.overallPercentile ?
                    (student.overallPercentile > 0.7 ? 'improving' :
                        student.overallPercentile < 0.3 ? 'declining' : 'stable') : 'stable',
                attendanceRate: student.attendanceRate,
                skillProfile,
                riskAssessment: overallAverage < 50 ? {
                    level: 'high',
                    factors: ['Baixo desempenho geral']
                } : overallAverage < 70 ? {
                    level: 'medium',
                    factors: ['Desempenho abaixo da média']
                } : undefined
            };
        });
    }, [currentClass]);
};