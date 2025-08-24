import { mockResults } from "../mocks/assessmentData";
import { ExamResult } from "../types/academic/Assessment";

/**
 * Serviço para gerenciamento de resultados de exames
 */
class ExamResultService {
  private results: ExamResult[] = [...mockResults];

  /**
   * Recupera todos os resultados de exames
   * @returns Promise com array de resultados
   */
  async getAllResults(): Promise<ExamResult[]> {
    try {
      return Promise.resolve([...this.results]);
    } catch (error) {
      console.error('Erro ao recuperar todos os resultados:', error);
      throw new Error('Falha ao recuperar resultados');
    }
  }

  /**
   * Recupera resultados de um exame específico
   * @param examId ID do exame
   * @returns Promise com array de resultados filtrados pelo ID do exame
   */
  async getResultsByExamId(examId: string): Promise<ExamResult[]> {
    try {
      const filteredResults = this.results.filter(result => result.examId === examId);
      return Promise.resolve(filteredResults);
    } catch (error) {
      console.error(`Erro ao recuperar resultados para o exame ${examId}:`, error);
      throw new Error(`Falha ao recuperar resultados para o exame ${examId}`);
    }
  }

  /**
   * Recupera resultados de um estudante específico
   * @param studentId ID do estudante
   * @returns Promise com array de resultados filtrados pelo ID do estudante
   */
  async getResultsByStudentId(studentId: string): Promise<ExamResult[]> {
    try {
      const filteredResults = this.results.filter(result => result.studentId === studentId);
      return Promise.resolve(filteredResults);
    } catch (error) {
      console.error(`Erro ao recuperar resultados para o estudante ${studentId}:`, error);
      throw new Error(`Falha ao recuperar resultados para o estudante ${studentId}`);
    }
  }

  /**
   * Recupera um resultado específico pelo ID
   * @param resultId ID do resultado
   * @returns Promise com o resultado ou null se não encontrado
   */
  async getResultById(resultId: string): Promise<ExamResult | null> {
    try {
      const result = this.results.find(result => result.id === resultId);
      return Promise.resolve(result || null);
    } catch (error) {
      console.error(`Erro ao recuperar resultado ${resultId}:`, error);
      throw new Error(`Falha ao recuperar resultado ${resultId}`);
    }
  }

  /**
   * Submete um novo resultado de exame
   * @param resultData Dados do resultado a ser submetido
   * @returns Promise com o resultado criado
   */
  async submitResult(resultData: Omit<ExamResult, 'id'>): Promise<ExamResult> {
    try {
      // Simula geração de ID único
      const newId = `result-${Date.now()}`;
      
      const newResult: ExamResult = {
        id: newId,
        ...resultData
      };
      
      this.results.push(newResult);
      return Promise.resolve(newResult);
    } catch (error) {
      console.error('Erro ao submeter resultado:', error);
      throw new Error('Falha ao submeter resultado');
    }
  }

  /**
   * Atualiza um resultado existente
   * @param resultId ID do resultado a ser atualizado
   * @param updateData Dados parciais para atualização
   * @returns Promise com o resultado atualizado ou null se não encontrado
   */
  async updateResult(resultId: string, updateData: Partial<ExamResult>): Promise<ExamResult | null> {
    try {
      const index = this.results.findIndex(result => result.id === resultId);
      
      if (index === -1) {
        return Promise.resolve(null);
      }
      
      // Atualiza o resultado mantendo o ID original
      const updatedResult = {
        ...this.results[index],
        ...updateData,
        id: resultId
      };
      
      this.results[index] = updatedResult;
      return Promise.resolve(updatedResult);
    } catch (error) {
      console.error(`Erro ao atualizar resultado ${resultId}:`, error);
      throw new Error(`Falha ao atualizar resultado ${resultId}`);
    }
  }

  /**
   * Deleta um resultado pelo ID
   * @param resultId ID do resultado a ser deletado
   * @returns Promise com boolean indicando sucesso
   */
  async deleteResult(resultId: string): Promise<boolean> {
    try {
      const initialLength = this.results.length;
      this.results = this.results.filter(result => result.id !== resultId);
      
      // Verifica se algum item foi removido
      return Promise.resolve(this.results.length < initialLength);
    } catch (error) {
      console.error(`Erro ao deletar resultado ${resultId}:`, error);
      throw new Error(`Falha ao deletar resultado ${resultId}`);
    }
  }

  /**
   * Calcula estatísticas para um conjunto de resultados
   * @param examId ID do exame opcional para filtrar resultados
   * @returns Promise com objeto de estatísticas
   */
  async calculateStatistics(examId?: string): Promise<{
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    totalSubmissions: number;
  }> {
    try {
      // Filtra resultados por exame, se fornecido
      const targetResults = examId 
        ? this.results.filter(result => result.examId === examId)
        : this.results;
      
      if (targetResults.length === 0) {
        return Promise.resolve({
          averageScore: 0,
          highestScore: 0,
          lowestScore: 0,
          totalSubmissions: 0
        });
      }
      
      // Calcula estatísticas
      const scores = targetResults.map(result => result.totalScore);
      const totalScore = scores.reduce((sum, score) => sum + score, 0);
      
      return Promise.resolve({
        averageScore: totalScore / scores.length,
        highestScore: Math.max(...scores),
        lowestScore: Math.min(...scores),
        totalSubmissions: targetResults.length
      });
    } catch (error) {
      console.error('Erro ao calcular estatísticas:', error);
      throw new Error('Falha ao calcular estatísticas');
    }
  }

  /**
   * Exporta resultados em formato JSON
   * @param examId ID do exame opcional para filtrar resultados
   * @returns Promise com string JSON dos resultados
   */
  async exportResultsAsJson(results?: ExamResult[], examId?: string): Promise<string> {
    try {
      const targetResults = examId
        ? this.results.filter(result => result.examId === examId)
        : this.results;
      
      return Promise.resolve(JSON.stringify(targetResults, null, 2));
    } catch (error) {
      console.error('Erro ao exportar resultados como JSON:', error);
      throw new Error('Falha ao exportar resultados');
    }
  }
}

export const examResultService = new ExamResultService();