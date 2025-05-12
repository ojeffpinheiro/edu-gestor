import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Checkbox,
  PageButton,
  PageControls,
  PageInfo,
  Pagination,
  RowsPerPage,
  StyledTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from './styles';

interface Column {
  field: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  selectable?: boolean;
  onRowClick?: (row: any) => void;
  onSelectRow?: (row: any, isSelected: boolean) => void;
  selectedIds?: (string | number)[];
  emptyMessage?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  selectable = false,
  onRowClick,
  onSelectRow,
  selectedIds = [],
  emptyMessage = "Nenhum dado encontrado"
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));

  const allVisibleSelected = useMemo(() => {
    if (paginatedData.length === 0) return false;
    return paginatedData.every(row => selectedIds.includes(row.id));
  }, [paginatedData, selectedIds]);

  const someVisibleSelected = useMemo(() => {
    if (paginatedData.length === 0) return false;
    return paginatedData.some(row => selectedIds.includes(row.id)) && !allVisibleSelected;
  }, [paginatedData, selectedIds, allVisibleSelected]);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = allVisibleSelected;
      checkboxRef.current.indeterminate = someVisibleSelected;
    }
  }, [allVisibleSelected, someVisibleSelected]);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <tr>
            {selectable && (
              <TableHeader width="40px">
                <Checkbox
                  type="checkbox"
                  ref={checkboxRef}
                  onChange={(e) => {
                    if (onSelectRow) {
                      paginatedData.forEach(row => 
                        onSelectRow(row, e.target.checked)
                      );
                    }
                  }}
                  disabled={paginatedData.length === 0}
                />
              </TableHeader>
            )}
            {columns.map(column => (
              <TableHeader key={column.field} width={column.width}>
                {column.header}
              </TableHeader>
            ))}
          </tr>
        </TableHead>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row) => (
              <TableRow
                key={row.uniqueKey || row.id}
                selected={selectedIds.includes(row.id)}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {selectable && (
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      type="checkbox"
                      checked={selectedIds.includes(row.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        if (onSelectRow) {
                          onSelectRow(row, e.target.checked);
                        }
                      }}
                    />
                  </TableCell>
                )}
                {columns.map(column => (
                  <TableCell key={`${row.uniqueKey || row.id}-${column.field}`}>
                    {column.render ? column.render(row) : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + (selectable ? 1 : 0)}>
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>

      {data.length > 0 && (
        <Pagination>
          <RowsPerPage>
            <span>Linhas por página:</span>
            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              {[5, 10, 25, 50].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </RowsPerPage>

          <PageInfo>
            {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
              currentPage * rowsPerPage,
              data.length
            )} de ${data.length}`}
          </PageInfo>

          <PageControls>
            <PageButton
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              {'<<'}
            </PageButton>
            <PageButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {'<'}
            </PageButton>
            <PageButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {'>'}
            </PageButton>
            <PageButton
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              {'>>'}
            </PageButton>
          </PageControls>
        </Pagination>
      )}
    </TableContainer>
  );
};

export default DataTable;