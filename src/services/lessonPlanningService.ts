// Mock API service for testing
export class LessonPlanService {
    // Sample data for testing
    private static mockData = {
      lessonPlans: [
        {
          id: "plan1",
          title: "Introdução às Frações",
          description: "Aula introdutória sobre conceitos de frações",
          discipline: "Matemática",
          classGroup: "6º Ano A",
          status: "planejada",
          applicationDate: "2023-04-10"
        },
        {
          id: "plan2",
          title: "Verbos no Presente do Indicativo",
          description: "Estudo dos verbos regulares e irregulares no presente do indicativo",
          discipline: "Português",
          classGroup: "7º Ano A",
          status: "em_planejamento",
          applicationDate: "2023-04-12"
        },
        {
          id: "plan3",
          title: "Sistema Solar",
          description: "Estudo dos planetas e outros corpos celestes do Sistema Solar",
          discipline: "Ciências",
          classGroup: "6º Ano B",
          status: "aplicada",
          applicationDate: "2023-04-05"
        }
      ]
    };
  
    // Simulate fetching lesson plans
    static async getLessonPlans() {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return this.mockData.lessonPlans;
    }
  
    // Simulate creating a new lesson plan
    static async createLessonPlan(data: any) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newPlan = {
        id: `plan${this.mockData.lessonPlans.length + 1}`,
        ...data,
        createdAt: new Date().toISOString()
      };
      
      this.mockData.lessonPlans.push(newPlan);
      return newPlan;
    }
  
    // Simulate updating a lesson plan
    static async updateLessonPlan(id: string, data: any) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const index = this.mockData.lessonPlans.findIndex(plan => plan.id === id);
      
      if (index === -1) {
        throw new Error("Lesson plan not found");
      }
      
      const updatedPlan = {
        ...this.mockData.lessonPlans[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      this.mockData.lessonPlans[index] = updatedPlan;
      return updatedPlan;
    }
  
    // Simulate deleting a lesson plan
    static async deleteLessonPlan(id: string) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const index = this.mockData.lessonPlans.findIndex(plan => plan.id === id);
      
      if (index === -1) {
        throw new Error("Lesson plan not found");
      }
      
      this.mockData.lessonPlans.splice(index, 1);
      return { success: true, id };
    }
  }
  
  // Mock data for reference tables
  export const mockTables = {
    // Educational sequences
    sequences: [
      { id: "seq1", title: "Sequência 1: Números Naturais", disciplineId: "disc1" },
      { id: "seq2", title: "Sequência 2: Frações", disciplineId: "disc1" },
      { id: "seq3", title: "Sequência 3: Geometria Básica", disciplineId: "disc1" },
      { id: "seq4", title: "Sequência 1: Gêneros Textuais", disciplineId: "disc2" },
      { id: "seq5", title: "Sequência 2: Verbos e Conjugações", disciplineId: "disc2" },
      { id: "seq6", title: "Sequência 1: Sistema Solar", disciplineId: "disc3" }
    ],
    
    // Disciplines
    disciplines: [
      { id: "disc1", name: "Matemática", color: "#4a90e2" },
      { id: "disc2", name: "Português", color: "#50c878" },
      { id: "disc3", name: "Ciências", color: "#f5a623" }
    ],
    
    // Class groups
    classGroups: [
      { id: "class1", name: "6º Ano A", grade: 6, section: "A" },
      { id: "class2", name: "6º Ano B", grade: 6, section: "B" },
      { id: "class3", name: "7º Ano A", grade: 7, section: "A" },
      { id: "class4", name: "7º Ano B", grade: 7, section: "B" }
    ],
    
    // BNCC skill codes (examples for math)
    bnccCodes: [
      { id: "EF06MA01", description: "Comparar, ordenar, ler e escrever números naturais com a utilização de regras do sistema de numeração decimal" },
      { id: "EF06MA09", description: "Resolver e elaborar problemas que envolvam o cálculo da fração de uma quantidade" },
      { id: "EF06MA10", description: "Resolver e elaborar problemas que envolvam adição ou subtração com números racionais" },
      { id: "EF06MA24", description: "Resolver e elaborar problemas que envolvam as grandezas comprimento, massa, tempo, temperatura, área e volume" }
    ]
  };