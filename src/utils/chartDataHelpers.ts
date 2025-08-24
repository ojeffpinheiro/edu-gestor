import { ClassPerformance, ExamSummary } from '../types/academic/Assessment';

/**
 * Prepara dados para gráficos de comparação entre turmas
 * @param classes Turmas para comparação
 * @param selectedSubject Matéria selecionada (opcional)
 * @returns Dados formatados para ChartJS
 */
export const prepareComparisonData = (
  classes: ClassPerformance[],
  selectedSubject?: string | null
) => {
  return {
      labels: classes.map((c: ClassPerformance) => c.className),
      datasets: [
        {
          label: 'Média Geral',
          data: classes.map((c: ClassPerformance) => c.averageScore),
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        },
        ...(selectedSubject ? [{
          label: `Média em ${selectedSubject}`,
          data: classes.map((c: ClassPerformance) => {
            const subjectExams = c.examResults.filter((e: ExamSummary) => e.subject === selectedSubject);
            return subjectExams.length > 0
              ? subjectExams.reduce((sum: number, e: ExamSummary) => sum + e.averageScore, 0) / subjectExams.length
              : 0;
          }),
          backgroundColor: 'rgba(255, 99, 132, 0.6)'
        }] : [])
      ]
    };
};