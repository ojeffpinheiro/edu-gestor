import React from 'react';
import { FiDownload } from 'react-icons/fi';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: var(--transition-fast);

  &:hover {
    background: var(--color-primary-dark);
  }
`;

interface ReportExporterProps {
  data: any[];
  fileName: string;
  exportFormats?: ('csv' | 'xlsx' | 'pdf')[];
}

export const ReportExporter: React.FC<ReportExporterProps> = ({
  data,
  fileName = 'report',
  exportFormats = ['xlsx', 'csv']
}) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${fileName}.csv`);
  };

  const handleExport = () => {
    // Por padrão exporta para Excel
    exportToExcel();
  };

  return (
    <ExportButton onClick={handleExport}>
      <FiDownload /> Exportar Relatório
    </ExportButton>
  );
};