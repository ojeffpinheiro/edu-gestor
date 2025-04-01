import JsBarcode from 'jsbarcode';
import { DOMImplementation, XMLSerializer } from 'xmldom';

/**
 * Opções para configuração do código de barras
 */
interface BarCodeOptions {
  format?: string;
  width?: number;
  height?: number;
  displayValue?: boolean;
  text?: string;
  fontOptions?: string;
  font?: string;
  textAlign?: string;
  textPosition?: string;
  textMargin?: number;
  fontSize?: number;
  background?: string;
  lineColor?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

/**
 * Classe que encapsula a geração de códigos de barras para o sistema de provas
 */
export default class BarCodeGenerator {
  /**
   * Formatos de código de barras suportados
   */
  public static readonly FORMATS = {
    CODE128: 'CODE128',
    CODE39: 'CODE39',
    EAN13: 'EAN13',
    EAN8: 'EAN8',
    UPC: 'UPC',
    ITF14: 'ITF14',
    ITF: 'ITF',
    MSI: 'MSI',
    PHARMACODE: 'pharmacode'
  };

  /**
   * Gera um código de barras como SVG
   * @param data Dados a serem codificados no código de barras
   * @param options Opções de configuração
   * @returns String SVG do código de barras
   */
  public static generateBarCodeSVG(data: string, options: BarCodeOptions = {}): string {
    const xmlSerializer = new XMLSerializer();
    const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    const defaultOptions: BarCodeOptions = {
      format: 'CODE128',
      width: 2,
      height: 100,
      displayValue: true,
      fontSize: 20,
      margin: 10,
      background: '#FFFFFF',
      lineColor: '#000000'
    };

    // Mesclando opções padrão com as fornecidas
    const mergedOptions = { ...defaultOptions, ...options };

    JsBarcode(svgNode, data, mergedOptions);
    return xmlSerializer.serializeToString(svgNode);
  }

  /**
   * Gera um código de barras específico para uma prova
   * @param examId ID da prova
   * @param options Opções de configuração do código de barras
   * @returns String SVG do código de barras
   */
  public static generateExamBarCode(examId: string, options: BarCodeOptions = {}): string {
    // Prefixo para códigos de exame
    const examCode = `E${examId.replace(/\D/g, '')}`;
    return this.generateBarCodeSVG(examCode, options);
  }

  /**
   * Gera um código de barras para identificação de aluno
   * @param studentId ID do aluno
   * @param options Opções de configuração do código de barras
   * @returns String SVG do código de barras
   */
  public static generateStudentBarCode(studentId: string, options: BarCodeOptions = {}): string {
    // Prefixo para códigos de aluno
    const studentCode = `A${studentId.replace(/\D/g, '')}`;
    return this.generateBarCodeSVG(studentCode, options);
  }

  /**
   * Gera um código de barras para um gabarito
   * @param examId ID da prova
   * @param variant Variante do gabarito
   * @param options Opções de configuração do código de barras
   * @returns String SVG do código de barras
   */
  public static generateAnswerSheetBarCode(examId: string, variant: number, options: BarCodeOptions = {}): string {
    // Formato: AS (Answer Sheet) + ID da Prova + Variante
    const answerSheetCode = `AS${examId}V${variant}`;
    return this.generateBarCodeSVG(answerSheetCode, options);
  }

  /**
   * Gera um código de barras EAN-13 para identificação de documentos
   * @param prefix Prefixo para o código (ex: 978 para livros)
   * @param id ID numérico para o documento
   * @param options Opções de configuração do código de barras
   * @returns String SVG do código de barras EAN-13
   */
  public static generateEAN13(prefix: string, id: string, options: BarCodeOptions = {}): string {
    // Garantindo que temos apenas dígitos
    const numericPrefix = prefix.replace(/\D/g, '');
    const numericId = id.replace(/\D/g, '');
    
    // Construindo o código EAN-13 (12 dígitos + 1 dígito verificador)
    // O jsBarcode calcula automaticamente o dígito verificador
    const eanCode = `${numericPrefix}${numericId}`.slice(0, 12);
    
    return this.generateBarCodeSVG(eanCode, {
      ...options,
      format: this.FORMATS.EAN13
    });
  }

  /**
   * Valida se uma string pode ser codificada em um determinado formato de código de barras
   * @param data Dados a serem validados
   * @param format Formato do código de barras
   * @returns Boolean indicando se os dados são válidos para o formato
   */
  public static validateBarCode(data: string, format: string): boolean {
    try {
      // Criamos um elemento temporário para testar a validade
      const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
      const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      
      JsBarcode(svgNode, data, { format });
      return true;
    } catch (error) {
      return false;
    }
  }
}