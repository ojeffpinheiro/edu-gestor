import { ClassPerformance, EnhancedExamResult } from "./types/Assessment";

// Calcula distribuição de notas para histograma
export const calculateDistribution = (examResults: EnhancedExamResult[]) => {
  const scores = examResults.flatMap(er => 
    er.answers.map(a => a.score)
  );
  
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const binSize = 10;
  const binCount = Math.ceil((maxScore - minScore) / binSize);
  
  const bins = Array.from({ length: binCount }, (_, i) => {
    const start = minScore + i * binSize;
    const end = start + binSize;
    return `${start}-${end}`;
  });
  
  const frequencies = Array(binCount).fill(0);
  scores.forEach(score => {
    const binIndex = Math.floor((score - minScore) / binSize);
    frequencies[binIndex]++;
  });
  
  // Normaliza para porcentagem
  const total = frequencies.reduce((sum, f) => sum + f, 0);
  const normalizedFrequencies = frequencies.map(f => (f / total) * 100);
  
  // Curva normal aproximada
  const mean = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  const stdDev = Math.sqrt(
    scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length
  );
  
  const normalCurve = bins.map((_, i) => {
    const x = minScore + (i + 0.5) * binSize;
    return (100 / (stdDev * Math.sqrt(2 * Math.PI))) * 
           Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2)) * binSize;
  });
  
  return { bins, frequencies: normalizedFrequencies, normalCurve };
};

// Agrupa resultados por período temporal
export const groupByTimePeriod = (examResults: EnhancedExamResult[]) => {
  const grouped = examResults.reduce((acc, er) => {
    const date = new Date(er.completedAt);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const key = `${month}/${year}`;
    
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(er);
    return acc;
  }, {} as Record<string, EnhancedExamResult[]>);
  
  const labels = Object.keys(grouped).sort();
  const averages = labels.map(key => {
    const results = grouped[key];
    const total = results.reduce((sum, er) => sum + er.totalScore, 0);
    return total / results.length;
  });
  
  const medians = labels.map(key => {
    const scores = grouped[key]
      .map(er => er.totalScore)
      .sort((a, b) => a - b);
    const middle = Math.floor(scores.length / 2);
    return scores.length % 2 === 0 
      ? (scores[middle - 1] + scores[middle]) / 2 
      : scores[middle];
  });
  
  return { labels, averages, medians };
};

// Comparação de habilidades para gráfico de radar
export const calculateSkillsComparison = (
  classPerformances: ClassPerformance[],
  selectedClassId?: string | null
) => {
  const defaultSkills = [
    'Conhecimento', 'Aplicação', 'Raciocínio', 
    'Comunicação', 'Criatividade', 'Colaboração'
  ] as const;

  // Filtra apenas turmas com skillBreakdown definido
  const classesWithSkills = classPerformances.filter(
    cp => cp.skillBreakdown !== undefined
  );

  // Calcula média apenas das turmas com dados
  const averageData = defaultSkills.map(skill => {
    if (classesWithSkills.length === 0) return 0;
    
    const sum = classesWithSkills.reduce((total, cp) => {
      // Usamos ! pois já filtramos por cp.skillBreakdown !== undefined
      return total + (cp.skillBreakdown![skill] ?? 0);
    }, 0);
    return sum / classesWithSkills.length;
  });

  // Tratamento seguro da turma selecionada
  let selectedData = averageData;
  if (selectedClassId) {
    const selectedClass = classPerformances.find(cp => cp.classId === selectedClassId);
    if (selectedClass?.skillBreakdown) {
      selectedData = defaultSkills.map(skill => {
        return selectedClass.skillBreakdown[skill] ?? 0;
      });
    }
  }

  return {
    labels: defaultSkills,
    selectedData,
    averageData
  };
};