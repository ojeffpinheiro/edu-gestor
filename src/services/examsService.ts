// src/services/examsService.ts
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { questions } from '../mocks/questions';

// Tipos
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  topic: string;
  difficulty: QuestionDifficulty;
}

export interface Exam {
  id: string;
  title: string;
  questions: Question[];
  password?: string;
  qrCode?: string;
  barcode?: string;
  createdAt: Date;
}

interface DifficultyDistribution {
  easy: number;
  medium: number;
  hard: number;
}

/**
 * Parâmetros para geração de provas
 * @property {number} numberOfExams - Número de variantes de prova a serem geradas
 * @property {number} questionsPerExam - Número de questões por prova
 * @property {string[]} topics - Tópicos das questões a serem incluídas
 * @property {'all' | QuestionDifficulty} difficulty - Dificuldade das questões
 * @property {string} title - Título base da prova
 * @property {string} [password] - Senha opcional para proteção da prova
 * @property {string[]} selectedQuestionIds - IDs das questões selecionadas
 * @property {DifficultyDistribution} [difficultyDistribution] - Distribuição de dificuldade
 * @property {boolean} [shuffleQuestions] - Se as questões devem ser embaralhadas
 * @property {boolean} [shuffleOptions] - Se as opções devem ser embaralhadas
 * @property {string} [titlePrefix] - Prefixo para títulos de variantes
 */
export interface ExamGenerationParams {
  numberOfExams: number;
  questionsPerExam: number;
  topics: string[];
  selectedTopics: string[];
  difficulty: 'all' | QuestionDifficulty;
  title: string;
  password?: string;
  selectedQuestionIds: string[];
  difficultyDistribution?: DifficultyDistribution;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
  titlePrefix?: string;
}

export class ExamService {
  private static instance: ExamService;
  private questions: Question[] = [];
  private exams: Exam[] = [];

  private constructor() {}

  public static getInstance(): ExamService {
    if (!ExamService.instance) {
      ExamService.instance = new ExamService();
    }
    return ExamService.instance;
  }

  public async loadQuestions(): Promise<Question[]> {
    if (this.questions.length === 0) {
      this.questions = [...questions]; // Usa as questões mockadas do final do arquivo
    }
    return this.questions;
  }

  public async getExams(): Promise<Exam[]> {
    return this.exams;
  }

  public async getExamById(id: string): Promise<Exam | undefined> {
    return this.exams.find(exam => exam.id === id);
  }

  public async generateSpecificExam(
    title: string, 
    questionIds: string[], 
    password?: string
  ): Promise<Exam | null> {
    await this.loadQuestions();
    
    if (questionIds.length === 0) return null;
    
    const selectedQuestions = this.questions.filter(q => 
      questionIds.includes(q.id)
    );
    
    if (selectedQuestions.length === 0) return null;
    
    const examId = `exam-${Date.now()}-specific`;
    const newExam: Exam = {
      id: examId,
      title,
      questions: selectedQuestions,
      password,
      createdAt: new Date()
    };
    
    this.exams.push(newExam);
    return newExam;
  }

  public async saveExamAsPDF(examId: string): Promise<Blob> {
    const exam = await this.getExamById(examId);
    if (!exam) throw new Error('Prova não encontrada');
    
    const doc = new jsPDF();
    
    // Configurações iniciais
    doc.setFont('helvetica', 'normal');
    
    // Adicionar título
    doc.setFontSize(18);
    doc.text(exam.title, 105, 15, { align: 'center' });
    
    // Adicionar QR Code
    const qrCodeDataUrl = await QRCode.toDataURL(exam.id, {
      width: 80,
      margin: 1
    });
    
    doc.addImage(qrCodeDataUrl, 'JPEG', 20, 25, 40, 40);
    
    // Adicionar código de barras
    const barcodeCanvas = document.createElement('canvas');
    JsBarcode(barcodeCanvas, exam.id, {
      format: 'CODE128',
      width: 2,
      height: 40,
      displayValue: false
    });
    
    const barcodeDataUrl = barcodeCanvas.toDataURL('image/png');
    doc.addImage(barcodeDataUrl, 'PNG', 70, 25, 80, 20);
    
    // Adicionar informações
    doc.setFontSize(10);
    doc.text(`ID: ${exam.id}`, 20, 70);
    doc.text(`Data: ${exam.createdAt.toLocaleDateString()}`, 20, 75);
    doc.text(`Questões: ${exam.questions.length}`, 20, 80);
    
    // Adicionar instruções
    doc.setFontSize(12);
    doc.text('Instruções:', 20, 90);
    doc.setFontSize(10);
    doc.text('- Responda todas as questões.', 25, 95);
    doc.text('- Cada questão tem apenas uma resposta correta.', 25, 100);
    doc.text('- Tempo de prova: 2 horas.', 25, 105);
    
    // Adicionar questões
    let yPosition = 115;
    
    exam.questions.forEach((question, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(11);
      const questionText = `${index + 1}. ${question.text}`;
      const splitText = doc.splitTextToSize(questionText, 170);
      doc.text(splitText, 20, yPosition);
      yPosition += splitText.length * 7;
      
      question.options.forEach((option, optIndex) => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
        
        const optionLetter = String.fromCharCode(65 + optIndex);
        doc.setFontSize(10);
        const optionText = `${optionLetter}) ${option}`;
        const splitOption = doc.splitTextToSize(optionText, 170);
        doc.text(splitOption, 25, yPosition);
        yPosition += splitOption.length * 6;
      });
      
      yPosition += 5;
    });
    
    return doc.output('blob');
  }
  
  public async exportAnswerKey(examId: string): Promise<Blob> {
    const exam = await this.getExamById(examId);
    if (!exam) throw new Error('Prova não encontrada');
    
    const doc = new jsPDF();
    
    // Configurações iniciais
    doc.setFont('helvetica', 'normal');
    
    // Adicionar título
    doc.setFontSize(18);
    doc.text(`Gabarito: ${exam.title}`, 105, 15, { align: 'center' });
    
    // Informações da prova
    doc.setFontSize(12);
    doc.text(`ID da Prova: ${exam.id}`, 20, 25);
    doc.text(`Data de Criação: ${exam.createdAt.toLocaleDateString()}`, 20, 30);
    
    // Tabela de respostas
    const tableData = exam.questions.map((question, index) => {
      const correctOptionLetter = String.fromCharCode(65 + question.correctAnswer);
      return [
        index + 1,
        correctOptionLetter,
        question.topic,
        question.difficulty === 'easy' ? 'Fácil' : 
        question.difficulty === 'medium' ? 'Média' : 'Difícil'
      ];
    });
    
    // @ts-ignore - A definição de tipos para jspdf-autotable pode não estar completa
    doc.autoTable({
      startY: 40,
      head: [['Questão', 'Resposta', 'Tópico', 'Dificuldade']],
      body: tableData,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        halign: 'center'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });
    
    return doc.output('blob');
  }

  public validateExamPassword(examId: string, password: string): boolean {
    const exam = this.exams.find(e => e.id === examId);
    if (!exam) return false;
    if (!exam.password) return true;
    return exam.password === password;
  }

  public async generateRandomExams(params: ExamGenerationParams): Promise<Exam[]> {
    await this.loadQuestions();
  
    if (!params.difficultyDistribution) {
      throw new Error('Distribuição de dificuldade não definida');
    }
  
    const { easy, medium, hard } = params.difficultyDistribution;
    const totalQuestions = easy + medium + hard;
  
    if (totalQuestions !== params.questionsPerExam) {
      throw new Error(`O total de questões por dificuldade (${totalQuestions}) não corresponde ao número de questões por prova (${params.questionsPerExam})`);
    }
  
    // Filtrar por tópicos se especificado
    let filteredQuestions = params.selectedTopics?.length > 0
      ? this.questions.filter(q => params.selectedTopics.includes(q.topic))
      : [...this.questions];
  
    // Verificar questões disponíveis uma única vez
    const easyQuestions = filteredQuestions.filter(q => q.difficulty === 'easy');
    const mediumQuestions = filteredQuestions.filter(q => q.difficulty === 'medium');
    const hardQuestions = filteredQuestions.filter(q => q.difficulty === 'hard');
  
    if (easyQuestions.length < easy || mediumQuestions.length < medium || hardQuestions.length < hard) {
      throw new Error(`Não há questões suficientes com os filtros atuais. 
        Disponíveis: Fácil(${easyQuestions.length}), Média(${mediumQuestions.length}), Difícil(${hardQuestions.length})
        Solicitadas: Fácil(${easy}), Média(${medium}), Difícil(${hard})`);
    }
  
    const newExams: Exam[] = [];
  
    for (let i = 0; i < params.numberOfExams; i++) {
      const selectedQuestions = [
        ...this.selectRandomQuestions(easyQuestions, easy, params.shuffleQuestions),
        ...this.selectRandomQuestions(mediumQuestions, medium, params.shuffleQuestions),
        ...this.selectRandomQuestions(hardQuestions, hard, params.shuffleQuestions),
      ];
  
      if (params.shuffleOptions) {
        selectedQuestions.forEach(q => {
          const { options, correctAnswer } = this.shuffleOptions(q.options, q.correctAnswer);
          q.options = options;
          q.correctAnswer = correctAnswer;
        });
      }
  
      const examTitle = params.numberOfExams > 1 
        ? `${params.titlePrefix || ''} ${params.title} ${i + 1}`.trim()
        : params.title;
  
      const newExam: Exam = {
        id: `exam-${Date.now()}-${i}`,
        title: examTitle,
        questions: selectedQuestions,
        password: params.password,
        createdAt: new Date()
      };
  
      newExams.push(newExam);
      this.exams.push(newExam);
    }
  
    return newExams;
  }

  public static simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }
  
  private selectRandomQuestions(questions: Question[], count: number, shuffle = true): Question[] {
    if (count <= 0) return [];
    
    const source = shuffle 
      ? [...questions].sort(() => 0.5 - Math.random())
      : [...questions];
      
    return source.slice(0, count);
  }
  
  private shuffleOptions(options: string[], correctIndex: number): { options: string[], correctAnswer: number } {
    // Criar array de índices para mapeamento
    const indices = options.map((_, index) => index);
    
    // Embaralhar os índices usando Fisher-Yates
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    // Criar novo array de opções embaralhadas
    const shuffledOptions = indices.map(index => options[index]);
    
    // Encontrar o novo índice da resposta correta
    const newCorrectIndex = indices.indexOf(correctIndex);
    
    return {
      options: shuffledOptions,
      correctAnswer: newCorrectIndex,
    };
  }
}