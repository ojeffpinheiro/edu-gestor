import React, { useState, useRef } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import {
  FaDownload,
  FaCopy,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

import {
  Title,
  QRContainer,
  ButtonsContainer,
  CloseButton,
  FormatOption,
  FormatSelector,
  IdText,
  ModalContainer,
  ModalOverlay,
  PrimaryButton,
  SecondaryButton,
  SizeControl,
  SizeControlWrapper,
  SizeLabel,
  SizeSlider,
  SizeValue,
  Container
} from './styles'

interface QRCodeGeneratorProps {
  examId?: string;
  isModal?: boolean;
  onClose?: () => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  examId = "EX-12345-678", 
  isModal = false,
  onClose
}) => {
  const [format, setFormat] = useState('png');
  const [copied, setCopied] = useState(false);
  const [size, setSize] = useState(180);
  const qrRef = useRef<HTMLDivElement>(null);
  
  const qrValue = `https://exam.example.com/${examId}`;
  
  const generateQRDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    
    if (format === 'png' && canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `exam-qrcode-${examId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'svg') {
      const svgElement = qrRef.current.querySelector('svg');
      if (!svgElement) return;
      
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const link = document.createElement('a');
      link.href = svgUrl;
      link.download = `exam-qrcode-${examId}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(svgUrl);
    }
  };

  const copyToClipboard = async () => {
    try {
      if (!qrRef.current) return;
      const canvas = qrRef.current.querySelector('canvas');
      if (!canvas) return;
      
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const MainContent = (
    <>
      <Title>QR Code da Prova</Title>
      
      <QRContainer ref={qrRef}>
        {format === 'svg' ? (
          <QRCodeSVG 
            value={qrValue}
            size={size}
            level="H"
            includeMargin={true}
          />
        ) : (
          <QRCodeCanvas 
            value={qrValue}
            size={size}
            level="H"
            includeMargin={true}
          />
        )}
      </QRContainer>
      
      <IdText>ID da Prova: <strong>{examId}</strong></IdText>
      
      <SizeControl>
        <SizeLabel>Tamanho:</SizeLabel>
        <SizeControlWrapper>
          <SizeSlider 
            type="range" 
            min="128" 
            max="512" 
            value={size} 
            onChange={(e) => setSize(parseInt(e.target.value))} 
          />
          <SizeValue>{size}px</SizeValue>
        </SizeControlWrapper>
      </SizeControl>
      
      <FormatSelector>
        <FormatOption 
          active={format === 'png'} 
          onClick={() => setFormat('png')}
        >
          PNG
        </FormatOption>
        <FormatOption 
          active={format === 'svg'} 
          onClick={() => setFormat('svg')}
        >
          SVG
        </FormatOption>
      </FormatSelector>
      
      <ButtonsContainer>
        <PrimaryButton onClick={generateQRDownload}>
          <FaDownload size={16} />
          Download
        </PrimaryButton>
        <SecondaryButton onClick={copyToClipboard}>
          {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
          {copied ? 'Copiado' : 'Copiar'}
        </SecondaryButton>
      </ButtonsContainer>
    </>
  );

  if (isModal && onClose) {
    return (
      <>
        <ModalOverlay onClick={onClose} />
        <ModalContainer>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
          {MainContent}
        </ModalContainer>
      </>
    );
  }

  return <Container>{MainContent}</Container>;
};

export default QRCodeGenerator;