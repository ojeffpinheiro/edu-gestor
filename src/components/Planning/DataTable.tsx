// DataTable.tsx - Componente de tabela de dados refatorado
import React, { useMemo } from 'react';
import { Table, TableHeader, TableRow, Td } from "../../styles/table";

/**
 * Interface para as propriedades do componente DataTable
 * @template T - Tipo genérico que estende Record<string, any>
 */
interface DataTableProps<T extends Record<string, any>> {
  /** Array de dados a serem exibidos na tabela */
  data: T[];
  /** Colunas a serem exibidas (chaves do objeto de dados) */
  columns?: (keyof T)[];
  /** Mensagem a ser exibida quando não há dados */
  emptyMessage?: string;
  /** Título acessível para a tabela (para leitores de tela) */
  ariaLabel?: string;
}

/**
 * Componente de tabela de dados genérica
 * Exibe dados tabulares com cabeçalhos formatados automaticamente
 * 
 * @template T - Tipo genérico que estende Record<string, any>
 */
export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  emptyMessage = "Nenhum dado disponível",
  ariaLabel = "Tabela de dados"
}: DataTableProps<T>) => {
  // Determinar as colunas a serem exibidas (todas as chaves do primeiro objeto se não especificado)
  const tableColumns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return columns || Object.keys(data[0]) as (keyof T)[];
  }, [columns, data]);

  // Renderização condicional para dados vazios
  if (!data || data.length === 0) {
    return (
      <div 
        className="p-4 text-center text-gray-500"
        role="status"
        aria-live="polite"
      >
        {emptyMessage}
      </div>
    );
  }

  /**
   * Formata o nome da coluna para exibição
   * Converte camelCase para palavras separadas e capitaliza
   */
  const formatColumnName = (key: keyof T): string => {
    return String(key)
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/^[a-z]/, match => match.toUpperCase());
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full" aria-label={ariaLabel}>
        <thead>
          <tr>
            {tableColumns.map(key => (
              <TableHeader
                key={String(key)}
                className="text-left py-2 border-b capitalize"
                scope="col"
              >
                {formatColumnName(key)}
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {tableColumns.map((key, colIndex) => (
                <Td 
                  key={`${rowIndex}-${String(key)}`} 
                  className="py-2 border-b"
                  // Primeira coluna geralmente é um cabeçalho de linha
                  {...(colIndex === 0 ? { scope: "row" } : {})}
                >
                  {/* Tratamento para valores undefined, null ou vazios */}
                  {item[key] != null && item[key] !== '' 
                    ? String(item[key]) 
                    : '-'}
                </Td>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};