import jsPDF from 'jspdf';
import { Exam, Question } from '../types/academic/Assessment'
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';

/**
 * Interface para opções de layout do PDF de exame
 */
interface ExamPdfOptions {
  // Configurações gerais
  pageSize: 'a4' | 'letter' | 'legal';
  orientation: 'portrait' | 'landscape';
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  // Configurações de cabeçalho
  headerOptions: {
    includeHeader: boolean;
    title: string;
    subtitle?: string;
    includeInstitutionLogo?: boolean;
    logoUrl?: string;
    includeDate?: boolean;
    includeQrCode?: boolean;
    includeBarCode?: boolean;
  };

  // Configurações de rodapé
  footerOptions: {
    includeFooter: boolean;
    includePageNumbers: boolean;
    footerText?: string;
  };

  // Configurações de conteúdo
  contentOptions: {
    fontFamily: 'helvetica' | 'times' | 'courier';
    fontSize: number;
    questionSpacing: number;
    includeDifficulty?: boolean;
    includeCategories?: boolean;
    showPoints?: boolean;
  };

  // Configurações de segurança
  securityOptions: {
    password?: string;
    preventCopy?: boolean;
    preventPrint?: boolean;
    watermark?: string;
  };

  // Configurações específicas de estudante
  studentOptions?: {
    includeStudentInfo: boolean;
    includeClass?: boolean;
    includeSignatureField?: boolean;
  };
}

/**
 * Interface para opções de layout do gabarito
 */
interface AnswerKeyPdfOptions {
  // Configurações gerais
  pageSize: 'a4' | 'letter' | 'legal';
  orientation: 'portrait' | 'landscape';

  // Configurações de cabeçalho
  includeHeader: boolean;
  title: string;

  // Configurações de conteúdo
  includeQuestions: boolean;
  includeAnswersOnly: boolean;
  includeExplanations?: boolean;

  // Configurações de segurança
  securityOptions: {
    password?: string;
    preventCopy?: boolean;
    preventPrint?: boolean;
  };
}

/**
 * Classe para geração de PDFs de provas e gabaritos
 */
export default class ExamPdfGenerator {
  /**
   * Gera um PDF de prova baseado em um exame e suas questões
   * @param exam O exame para gerar o PDF
   * @param questions As questões do exame
   * @param options Opções de layout para o PDF
   * @returns Promise contendo o Buffer do PDF gerado
   */
  public static async generateExamPdf(
    exam: Exam,
    questions: Question[],
    options: ExamPdfOptions
  ): Promise<Buffer> {
    // Inicializa documento PDF com as opções especificadas
    const doc = new jsPDF({
      orientation: options.orientation,
      unit: 'mm',
      format: options.pageSize,
      encryption: options.securityOptions.password ? {
        userPassword: options.securityOptions.password,
        ownerPassword: options.securityOptions.password + '_owner',
        userPermissions: ([
          'print',
          'modify',
          'copy',
          'annot-forms'
        ] as const).filter(permission => {
          // Remove permissões específicas baseado nas opções de segurança
          if (permission === 'print' && options.securityOptions.preventPrint) return false;
          if (permission === 'copy' && options.securityOptions.preventCopy) return false;
          return true;
        })
      } : undefined
    });


    // Configura fonte
    doc.setFont(options.contentOptions.fontFamily);
    doc.setFontSize(options.contentOptions.fontSize);

    // Posição vertical inicial
    let yPosition = options.margins.top;

    // Adiciona cabeçalho se configurado
    if (options.headerOptions.includeHeader) {
      yPosition = await this.addHeader(doc, exam, options, yPosition);
    }

    // Adiciona informações do estudante se configurado
    if (options.studentOptions?.includeStudentInfo) {
      yPosition = this.addStudentInfo(doc, options, yPosition);
    }

    // Adiciona instruções da prova
    yPosition = this.addExamInstructions(doc, exam, yPosition, options);

    // Adiciona cada questão
    for (let i = 0; i < questions.length; i++) {
      yPosition = this.addQuestion(doc, questions[i], i + 1, yPosition, options);

      // Verifica se é necessário adicionar uma nova página
      if (yPosition > (doc.internal.pageSize.height - options.margins.bottom) && i < questions.length - 1) {
        doc.addPage();
        yPosition = options.margins.top;

        // Adiciona cabeçalho na nova página se configurado
        if (options.headerOptions.includeHeader) {
          yPosition = await this.addHeader(doc, exam, options, yPosition);
        }
      }
    }

    // Adiciona rodapé em todas as páginas se configurado
    if (options.footerOptions.includeFooter) {
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        this.addFooter(doc, i, totalPages, options);
      }
    }

    // Adiciona marca d'água se configurado
    if (options.securityOptions.watermark) {
      this.addWatermark(doc, options.securityOptions.watermark);
    }

    // Gera buffer do PDF
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    return pdfBuffer;
  }

  /**
   * Gera um PDF de gabarito baseado em um exame e suas questões
   * @param exam O exame para gerar o gabarito
   * @param questions As questões do exame com respostas
   * @param options Opções de layout para o gabarito
   * @returns Promise contendo o Buffer do PDF gerado
   */
  public static async generateAnswerKeyPdf(
    exam: Exam,
    questions: Question[],
    options: AnswerKeyPdfOptions
  ): Promise<Buffer> {
    // Inicializa documento PDF com as opções especificadas
    const doc = new jsPDF({
      orientation: options.orientation,
      unit: 'mm',
      format: options.pageSize
    });

    // Posição vertical inicial
    let yPosition = 20;

    // Adiciona cabeçalho do gabarito
    if (options.includeHeader) {
      doc.setFontSize(16);
      doc.text(`GABARITO - ${options.title || exam.title}`, doc.internal.pageSize.width / 2, yPosition, { align: 'center' });
      yPosition += 15;
    }

    doc.setFontSize(12);

    // Adiciona respostas com ou sem as questões
    if (options.includeAnswersOnly) {
      // Formato tabular apenas com respostas
      const answersPerRow = 5;
      const columnWidth = (doc.internal.pageSize.width - 40) / answersPerRow;

      for (let i = 0; i < questions.length; i++) {
        const rowIndex = Math.floor(i / answersPerRow);
        const colIndex = i % answersPerRow;

        const xPosition = 20 + (colIndex * columnWidth);
        const currentYPosition = yPosition + (rowIndex * 10);

        doc.text(`${i + 1}. ${this.getCorrectAnswer(questions[i])}`, xPosition, currentYPosition);

        // Adiciona nova página se necessário
        if (currentYPosition > (doc.internal.pageSize.height - 20) && i < questions.length - 1) {
          doc.addPage();
          yPosition = 20;
        }
      }
    } else if (options.includeQuestions) {
      // Inclui questões completas com respostas
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];

        doc.setFontSize(12);
        doc.text(`${i + 1}. ${question.content}`, 20, yPosition);
        yPosition += 10;

        doc.setFontSize(12);
        doc.text(`Resposta: ${this.getCorrectAnswer(question)}`, 30, yPosition);
        yPosition += 8;

        // Adiciona explicação se configurado
        if (options.includeExplanations && question.explanation) {
          doc.setFontSize(10);
          doc.text(`Explicação: ${question.explanation}`, 30, yPosition);
          yPosition += 15;
        } else {
          yPosition += 10;
        }

        // Adiciona nova página se necessário
        if (yPosition > (doc.internal.pageSize.height - 20) && i < questions.length - 1) {
          doc.addPage();
          yPosition = 20;
        }
      }
    }

    // Gera buffer do PDF
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    return pdfBuffer;
  }

  /**
   * Gera uma versão em branco da prova para estudantes preencherem
   * @param exam O exame para gerar o PDF em branco
   * @param questions As questões do exame
   * @param options Opções de layout para o PDF
   * @returns Promise contendo o Buffer do PDF gerado
   */
  public static async generateBlankExamPdf(
    exam: Exam,
    questions: Question[],
    options: ExamPdfOptions
  ): Promise<Buffer> {
    // Clone das opções com modificações específicas para versão em branco
    const blankOptions: ExamPdfOptions = {
      ...options,
      studentOptions: {
        ...options.studentOptions,
        includeStudentInfo: true,
        includeSignatureField: true
      }
    };

    return this.generateExamPdf(exam, questions, blankOptions);
  }

  /**
   * Gera múltiplas variantes de uma prova (ex: provas A, B, C com questões embaralhadas)
   * @param exam O exame para gerar variantes
   * @param questions As questões do exame
   * @param options Opções de layout para o PDF
   * @param numVariants Número de variantes a serem geradas
   * @returns Promise contendo um Array de Buffers com os PDFs gerados
   */
  public static async generateExamVariants(
    exam: Exam,
    questions: Question[],
    options: ExamPdfOptions,
    numVariants: number
  ): Promise<Buffer[]> {
    const variants: Buffer[] = [];

    for (let i = 0; i < numVariants; i++) {
      // Cria uma cópia do exam para cada variante
      const variantExam: Exam = {
        ...exam,
        title: `${exam.title} - Versão ${String.fromCharCode(65 + i)}` // A, B, C, etc.
      };

      // Embaralha as questões para esta variante
      const shuffledQuestions = this.shuffleQuestions([...questions]);

      // Gera PDF para esta variante
      const variantPdf = await this.generateExamPdf(variantExam, shuffledQuestions, options);
      variants.push(variantPdf);
    }

    return variants;
  }

  // Métodos auxiliares privados

  /**
   * Adiciona o cabeçalho ao documento PDF
   */
  private static async addHeader(
    doc: jsPDF,
    exam: Exam,
    options: ExamPdfOptions,
    startY: number
  ): Promise<number> {
    let yPosition = startY;
    const headerOptions = options.headerOptions;
    const pageWidth = doc.internal.pageSize.width;

    // Adiciona logo da instituição se configurado
    if (headerOptions.includeInstitutionLogo && headerOptions.logoUrl) {
      try {
        // Em uma implementação real, carregaria a imagem de forma assíncrona
        // const imgData = await loadImageAsDataUrl(headerOptions.logoUrl);
        // doc.addImage(imgData, 'JPEG', options.margins.left, yPosition, 30, 15);
        yPosition += 20;
      } catch (error) {
        console.error('Erro ao adicionar logo:', error);
      }
    }

    // Adiciona título e subtítulo
    doc.setFontSize(16);
    doc.text(headerOptions.title || exam.title, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    if (headerOptions.subtitle) {
      doc.setFontSize(12);
      doc.text(headerOptions.subtitle, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;
    }

    // Adiciona data se configurado
    if (headerOptions.includeDate) {
      doc.setFontSize(10);
      const currentDate = new Date().toLocaleDateString();
      doc.text(`Data: ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;
    }

    // Adiciona QR code se configurado
    if (headerOptions.includeQrCode && exam.qrCode) {
      await this.addQrCode(doc, exam.qrCode, pageWidth - 30, startY);
    }

    // Adiciona código de barras se configurado
    if (headerOptions.includeBarCode && exam.barCode) {
      try {
        await this.addBarCode(doc, exam.barCode, pageWidth / 2, yPosition);
        yPosition += 15;
      } catch (error) {
        console.error('Erro ao adicionar código de barras:', error);
      }
    }

    // Adiciona linha separadora
    doc.setLineWidth(0.5);
    doc.line(options.margins.left, yPosition, pageWidth - options.margins.right, yPosition);

    return yPosition + 10;
  }

  /**
   * Adiciona informações do estudante ao documento PDF
   */
  private static addStudentInfo(
    doc: jsPDF,
    options: ExamPdfOptions,
    startY: number
  ): number {
    let yPosition = startY;

    doc.setFontSize(12);
    doc.text('Nome: ___________________________________________', options.margins.left, yPosition);
    yPosition += 10;

    if (options.studentOptions?.includeClass) {
      doc.text('Turma: ______________________', options.margins.left, yPosition);
      yPosition += 10;
    }

    if (options.studentOptions?.includeSignatureField) {
      doc.text('Assinatura: ___________________________________________', options.margins.left, yPosition);
      yPosition += 10;
    }

    // Adiciona linha separadora
    doc.setLineWidth(0.5);
    doc.line(options.margins.left, yPosition, doc.internal.pageSize.width - options.margins.right, yPosition);

    return yPosition + 10;
  }

  /**
   * Adiciona as instruções do exame ao documento PDF
   */
  private static addExamInstructions(
    doc: jsPDF,
    exam: Exam,
    startY: number,
    options: ExamPdfOptions
  ): number {
    let yPosition = startY;

    // Adiciona descrição/instruções do exame
    if (exam.description) {
      doc.setFontSize(12);
      doc.text('INSTRUÇÕES:', options.margins.left, yPosition);
      yPosition += 8;

      doc.setFontSize(10);

      // Divide a descrição em linhas para caber na página
      const splitDescription = doc.splitTextToSize(
        exam.description,
        doc.internal.pageSize.width - options.margins.left - options.margins.right
      );

      doc.text(splitDescription, options.margins.left, yPosition);
      yPosition += splitDescription.length * 5 + 10;

      // Adiciona linha separadora
      doc.setLineWidth(0.5);
      doc.line(options.margins.left, yPosition, doc.internal.pageSize.width - options.margins.right, yPosition);
      yPosition += 10;
    }

    return yPosition;
  }

  /**
   * Adiciona uma questão ao documento PDF
   */
  private static addQuestion(
    doc: jsPDF,
    question: Question,
    questionNumber: number,
    startY: number,
    options: ExamPdfOptions
  ): number {
    let yPosition = startY;
    const contentOptions = options.contentOptions;
    const margins = options.margins;

    // Define o tamanho da fonte para a questão
    doc.setFontSize(contentOptions.fontSize);

    // Texto da questão com numeração
    const questionText = `${questionNumber}. ${question.content}`;

    // Divide o texto da questão em linhas para caber na página
    const splitQuestion = doc.splitTextToSize(
      questionText,
      doc.internal.pageSize.width - margins.left - margins.right
    );

    doc.text(splitQuestion, margins.left, yPosition);
    yPosition += splitQuestion.length * (contentOptions.fontSize / 3) + 5;

    // Adiciona dificuldade se configurado
    if (contentOptions.includeDifficulty) {
      doc.setFontSize(8);
      doc.text(`Dificuldade: ${question.difficulty}`, margins.left, yPosition);
      yPosition += 5;
    }

    // Adiciona categorias se configurado
    if (contentOptions.includeCategories && question.categories && question.categories.length > 0) {
      doc.setFontSize(8);
      doc.text(`Categorias: ${question.categories.join(', ')}`, margins.left, yPosition);
      yPosition += 5;
    }

    // Adiciona pontuação se configurado
    if (contentOptions.showPoints && question.points) {
      doc.setFontSize(8);
      doc.text(`(${question.points} pontos)`, doc.internal.pageSize.width - margins.right - 20, startY);
    }

    // Adiciona espaço para resposta
    yPosition += contentOptions.questionSpacing;

    return yPosition;
  }

  /**
   * Adiciona o rodapé ao documento PDF
   */
  private static addFooter(
    doc: jsPDF,
    currentPage: number,
    totalPages: number,
    options: ExamPdfOptions
  ): void {
    const footerOptions = options.footerOptions;
    const margins = options.margins;
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    doc.setFontSize(8);

    // Adiciona numeração de página se configurado
    if (footerOptions.includePageNumbers) {
      doc.text(
        `Página ${currentPage} de ${totalPages}`,
        pageWidth / 2,
        pageHeight - margins.bottom,
        { align: 'center' }
      );
    }

    // Adiciona texto do rodapé se configurado
    if (footerOptions.footerText) {
      doc.text(
        footerOptions.footerText,
        pageWidth / 2,
        pageHeight - margins.bottom + 5,
        { align: 'center' }
      );
    }
  }

  /**
   * Adiciona um QR code ao documento PDF
   */
  private static async addQrCode(
    doc: jsPDF,
    data: string,
    x: number,
    y: number
  ): Promise<void> {
    try {
      // Gera QR code como data URL
      const qrDataUrl = await QRCode.toDataURL(data, { errorCorrectionLevel: 'H' });

      // Adiciona QR code ao documento
      doc.addImage(qrDataUrl, 'PNG', x - 25, y, 25, 25);
    } catch (error) {
      console.error('Erro ao gerar QR code:', error);
    }
  }

  /**
   * Adiciona código de barras ao documento PDF
   */
  private static async addBarCode(
    doc: jsPDF,
    data: string,
    x: number,
    y: number
  ): Promise<void> {
    try {
      // Criar um elemento canvas temporário
      const canvas = document.createElement('canvas');

      // Usar JsBarcode para gerar o código de barras no canvas
      JsBarcode(canvas, data, {
        format: 'CODE128',
        width: 2,
        height: 50,
        displayValue: true
      });

      // Converter canvas para data URL
      const barcodeDataUrl = canvas.toDataURL('image/png');

      // Adicionar imagem ao PDF
      doc.addImage(barcodeDataUrl, 'PNG', x - 40, y, 80, 15);
    } catch (error) {
      console.error('Erro ao gerar código de barras:', error);
    }
  }

  /**
   * Adiciona uma marca d'água ao documento PDF
   */
  private static addWatermark(
    doc: jsPDF,
    text: string
  ): void {
    const pageCount = doc.getNumberOfPages();

    // Configurações da marca d'água
    doc.setFontSize(60);
    doc.setTextColor(200, 200, 200); // Cinza claro

    // Adiciona marca d'água em todas as páginas
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Rotaciona o texto para exibir diagonalmente
      doc.text(
        text,
        pageWidth / 2,
        pageHeight / 2,
        {
          align: 'center',
          angle: 45
        }
      );
    }

    // Restaura configurações de texto
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
  }

  /**
   * Embaralha um array de questões
   */
  private static shuffleQuestions(questions: Question[]): Question[] {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  }

  /**
   * Obtém a resposta correta de uma questão
   */
  private static getCorrectAnswer(question: Question): string {
    return question.correctAnswer || 'N/A';
  }

  /**
   * Retorna configurações padrão para PDF de exame
   */
  public static getDefaultExamPdfOptions(): ExamPdfOptions {
    return {
      pageSize: 'a4',
      orientation: 'portrait',
      margins: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      },
      headerOptions: {
        includeHeader: true,
        title: 'Avaliação',
        includeInstitutionLogo: false,
        includeDate: true,
        includeQrCode: false,
        includeBarCode: false
      },
      footerOptions: {
        includeFooter: true,
        includePageNumbers: true,
        footerText: 'Documento confidencial - Todos os direitos reservados'
      },
      contentOptions: {
        fontFamily: 'helvetica',
        fontSize: 12,
        questionSpacing: 15,
        includeDifficulty: false,
        includeCategories: false,
        showPoints: true
      },
      securityOptions: {
        preventCopy: true,
        preventPrint: false
      },
      studentOptions: {
        includeStudentInfo: true,
        includeClass: true,
        includeSignatureField: true
      }
    };
  }

  /**
   * Retorna configurações padrão para PDF de gabarito
   */
  public static getDefaultAnswerKeyPdfOptions(): AnswerKeyPdfOptions {
    return {
      pageSize: 'a4',
      orientation: 'portrait',
      includeHeader: true,
      title: 'Gabarito',
      includeQuestions: true,
      includeAnswersOnly: false,
      includeExplanations: true,
      securityOptions: {
        password: '',
        preventCopy: true,
        preventPrint: false
      }
    };
  }
}