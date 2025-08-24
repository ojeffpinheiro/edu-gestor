import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import JsBarcode from 'jsbarcode';
import { Exam } from '../../../types/evaluation/Exam';

interface ExamWithIdentification extends Omit<Exam, 'password'> {
  qrCode?: string;
  barcode?: string;
  accessCode: string;
  password?: string;
}

interface ExamIdentificationProps {
  exam: ExamWithIdentification;
}

// Componente para renderizar o código de barras
const Barcode: React.FC<{ value: string }> = ({ value }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (canvasRef.current && value) {
      JsBarcode(canvasRef.current, value, {
        format: 'CODE128',
        displayValue: true,
        fontSize: 12,
        margin: 10
      });
    }
  }, [value]);

  return <canvas ref={canvasRef} />;
};

/**
 * Componente para exibir a identificação da prova (QR Code, Código de Barras e informações de acesso)
 */
export const ExamIdentification: React.FC<ExamIdentificationProps> = ({ exam }) => {
  return (
    <div className="exam-identification">
      <div className="qr-code">
        {exam.qrCode && <QRCodeSVG value={exam.qrCode} size={128} />}
        <p>Código QR da Prova</p>
      </div>
      
      <div className="barcode">
        {exam.barcode && <Barcode value={exam.barcode} />}
        <p>Código: {exam.barcode}</p>
      </div>
      
      <div className="access-info">
        <p>Acesso: {exam.accessCode}</p>
        {exam.password && <p>Senha: {exam.password}</p>}
      </div>
    </div>
  );
};