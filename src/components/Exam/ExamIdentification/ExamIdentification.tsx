// src/components/ExamIdentification.tsx
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { FaQrcode, FaBarcode, FaInfoCircle, FaCalendarAlt, FaIdCard } from 'react-icons/fa';

import {
  Card,
  CardContent,
  CardDescription,
  CardGrid,
  CardTitle,
  Container,
  InfoCard,
  InfoItem
 } from './styles'

interface ExamIdentificationProps {
  examId: string;
  title: string;
  showQrCode?: boolean;
  showBarcode?: boolean;
  createdAt?: Date;
}

const ExamIdentification: React.FC<ExamIdentificationProps> = ({
  examId,
  title,
  showQrCode = true,
  showBarcode = true,
  createdAt = new Date()
}) => {
  const qrCodeRef = useRef<HTMLCanvasElement>(null);
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Gerar QR Code
    if (showQrCode && qrCodeRef.current) {
      QRCode.toCanvas(
        qrCodeRef.current,
        examId,
        {
          width: 128,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        },
        (error) => {
          if (error) console.error('Erro ao gerar QR Code:', error);
        }
      );
    }

    // Gerar código de barras
    if (showBarcode && barcodeRef.current) {
      try {
        JsBarcode(barcodeRef.current, examId, {
          format: 'CODE128',
          width: 2,
          height: 50,
          displayValue: true,
          margin: 5,
          background: '#ffffff',
          lineColor: '#000000',
          fontSize: 12,
          text: `ID: ${examId}`
        });
      } catch (error) {
        console.error('Erro ao gerar código de barras:', error);
      }
    }
  }, [examId, showQrCode, showBarcode]);

  return (
    <Container>
      <CardGrid>
        {showQrCode && (
          <Card>
            <CardContent>
              <CardTitle>
                <FaQrcode size={16} />
                QR Code
              </CardTitle>
              <canvas ref={qrCodeRef} />
              <CardDescription>
                Escaneie para identificar a prova
              </CardDescription>
            </CardContent>
          </Card>
        )}

        {showBarcode && (
          <Card>
            <CardContent>
              <CardTitle>
                <FaBarcode size={16} />
                Código de Barras
              </CardTitle>
              <svg ref={barcodeRef} />
              <CardDescription>
                Código para identificação da prova
              </CardDescription>
            </CardContent>
          </Card>
        )}

        <Card>
          <InfoCard>
            <CardTitle>
              <FaInfoCircle size={16} />
              Informações
            </CardTitle>
            <div>
              <InfoItem>
                <strong><FaIdCard size={12} /> Título:</strong> {title}
              </InfoItem>
              <InfoItem>
                <strong><FaIdCard size={12} /> ID da Prova:</strong> {examId}
              </InfoItem>
              <InfoItem>
                <strong><FaCalendarAlt size={12} /> Data:</strong> {createdAt.toLocaleDateString()}
              </InfoItem>
            </div>
          </InfoCard>
        </Card>
      </CardGrid>
    </Container>
  );
};

export default ExamIdentification;