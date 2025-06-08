/**
 * Retorna uma cor em formato hexadecimal com base na porcentagem de presença.
 * 
 * @param {number} attendance - Porcentagem de presença (0 a 100).
 * @returns {string} Código de cor hexadecimal representando o nível de presença.
 */
export const getAttendanceColor = (attendance: number): string => {
    if (attendance >= 90) return '#4CAF50';
    if (attendance >= 75) return '#FFC107';
    return '#F44336';
};

/**
 * Calcula a linha de tendência linear com base em um conjunto de dados de presença.
 * 
 * @param {number[]} data - Array de porcentagens de presença.
 * @returns {number[]} Array com os valores calculados da linha de tendência.
 */
export const calculateTrendLine = (data: number[]): number[] => {
  const n = data.length;
  const x = Array.from({ length: n }, (_, i) => i);
  const y = data;

  const sumX = x.reduce((sum, val) => sum + val, 0);
  const sumY = y.reduce((sum, val) => sum + val, 0);
  const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0);
  const sumXX = x.reduce((sum, val) => sum + val * val, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return x.map(val => slope * val + intercept);
};