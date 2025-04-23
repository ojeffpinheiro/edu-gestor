/**
 * Calculates completion percentages for planning items
 * @param total - Total number of items
 * @param completed - Number of completed items
 * @param partial - Number of partially completed items
 * @returns Object containing calculated percentages
 */
export const calculateCompletionPercentages = (total: number, completed: number, partial?: number) => {
  const completePercent = Math.round((completed / total) * 100);
  const pendingPercent = 100 - completePercent;
  const partialPercent = partial ? Math.round((partial / total) * 100) : 0;

  return { completePercent, pendingPercent, partialPercent };
};