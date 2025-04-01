import QRCodeLib from 'qrcode';

/**
 * Configurações para a geração do QR Code
 */
interface QRCodeConfig {
    size?: number;
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
    backgroundColor?: string;
    foregroundColor?: string;
    includeMargin?: boolean;
    logoUrl?: string;
    logoSize?: number;
}

/**
 * Classe utilitária para geração de QR Codes no sistema
 */
export default class QRCodeService {
    /**
     * Cria um componente QR Code React com ou sem logo
     */
    public static createQRCodeComponent(data: string, config: QRCodeConfig = {}) {
        if (!data) throw new Error('Os dados do QR Code não podem estar vazios.');
        
        const {
            size = 128,
            errorCorrectionLevel = 'M',
            backgroundColor = '#FFFFFF',
            foregroundColor = '#000000',
            includeMargin = true,
            logoUrl,
            logoSize,
        } = config;

        return (`
            <div style={{ position: 'relative', width: ${size}, height: ${size} }}>
                <QRCode
                    value={${data}}
                    size={${size}}
                    level={${errorCorrectionLevel}}
                    bgColor={${backgroundColor}}
                    fgColor={${foregroundColor}}
                    includeMargin={${includeMargin}}
                />
                {${logoUrl} && (
                    <img
                        src=${logoUrl}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: ${logoSize} || ${size} * 0.2,
                            height: ${logoSize} || ${size} * 0.2,
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            padding: 5
                        }}
                        alt="Logo"
                    />
                )}
            </div>    
        `);
    }

    /**
     * Gera um QR Code em formato SVG para exportação
     */
    public static async generateSVG(data: string, config: QRCodeConfig = {}): Promise<string> {
        if (!data) throw new Error('Os dados do QR Code não podem estar vazios.');
        
        return await QRCodeLib.toString(data, {
            type: 'svg',
            errorCorrectionLevel: config.errorCorrectionLevel || 'M',
            color: {
                dark: config.foregroundColor || '#000000',
                light: config.backgroundColor || '#FFFFFF'
            }
        });
    }

    /**
     * Cria os dados para um QR Code de prova
     */
    public static generateExamData(examId: string, additionalData: Record<string, any> = {}): string {
        if (!examId) throw new Error('O ID da prova é obrigatório.');
        
        return JSON.stringify({
            type: 'exam',
            id: examId,
            timestamp: new Date().toISOString(),
            ...additionalData
        });
    }

    /**
     * Cria os dados para um QR Code de aluno
     */
    public static generateStudentData(studentId: string, examId?: string): string {
        if (!studentId) throw new Error('O ID do aluno é obrigatório.');
        
        return JSON.stringify({
            type: 'student',
            studentId,
            examId,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Gera uma URL para acesso rápido à prova via QR Code
     */
    public static generateExamAccessURL(examId: string, baseUrl: string): string {
        if (!examId || !baseUrl) throw new Error('O ID da prova e a URL base são obrigatórios.');
        return `${baseUrl}/exam/access/${examId}`;
    }
}
