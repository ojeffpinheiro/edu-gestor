import React, { useState, useMemo } from 'react';
import { FaChevronDown, FaChevronUp, FaDownload, FaFilter } from 'react-icons/fa';

import { Button, IconButton } from '../../../styles/buttons';

import {
  ColumnHeader,
  Container,
  ControlsWrapper,
  DropdownContainer,
  DropdownContent,
  DropdownItem, 
  DropdownTrigger,
  FilterInput, 
  Header,
  NoResults,
  PageButton, 
  PaginationContainer,
  PaginationControls, 
  PaginationInfo,
  SearchInput, 
  SortableHeader, 
  StatusBadge, 
  StyledTable, 
  StyledTableCell, 
  StyledTableHeader, 
  StyledTableRow, 
  TableContainer, 
  Title
} from './styles';

// Define the types for the results data
interface ResultItem {
  id: string;
  studentName: string;
  studentId: string;
  score: number;
  maxScore: number;
  percentage: number;
  submissionDate: string;
  gradedBy?: string;
  status: 'completed' | 'pending' | 'in-progress';
  [key: string]: any; // To allow for custom columns
}

interface ResultsTableProps {
  results: ResultItem[];
  title?: string;
  customColumns?: { key: string; label: string }[];
  onRowClick?: (result: ResultItem) => void;
  onExport?: (filteredResults: ResultItem[]) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
  title = 'Assessment Results',
  customColumns = [],
  onRowClick,
  onExport,
}) => {
  const [sortColumn, setSortColumn] = useState<string>('studentName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Define standard columns
  const standardColumns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'studentId', label: 'Student ID' },
    { key: 'score', label: 'Score' },
    { key: 'percentage', label: 'Percentage' },
    { key: 'submissionDate', label: 'Submission Date' },
    { key: 'status', label: 'Status' },
  ];

  // Combine standard columns with custom columns
  const allColumns = [...standardColumns, ...customColumns];

  // Helper function to sort data
  const sortData = (data: ResultItem[], column: string, direction: 'asc' | 'desc') => {
    return [...data].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      // Handle special case for dates
      if (column === 'submissionDate') {
        const dateA = new Date(aValue).getTime();
        const dateB = new Date(bValue).getTime();
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // Handle numbers
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle strings
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  };

  // Helper function to filter data
  const filterData = (data: ResultItem[]) => {
    return data.filter(item => {
      // Apply search term across all text fields
      if (searchTerm) {
        const searchableValues = Object.entries(item)
          .filter(([_, value]) => typeof value === 'string')
          .map(([_, value]) => value.toLowerCase());

        if (!searchableValues.some(value => value.includes(searchTerm.toLowerCase()))) {
          return false;
        }
      }

      // Apply column filters
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        const itemValue = String(item[key]).toLowerCase();
        return itemValue.includes(value.toLowerCase());
      });
    });
  };

  // Apply sorting and filtering
  const processedData = useMemo(() => {
    const filtered = filterData(results);
    return sortData(filtered, sortColumn, sortDirection);
  }, [results, sortColumn, sortDirection, filters, searchTerm]);

  // Handle pagination
  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return processedData.slice(startIndex, startIndex + rowsPerPage);
  }, [processedData, currentPage, rowsPerPage]);

  // Handle column sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Handle filter change
  const handleFilterChange = (column: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [column]: value,
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle export functionality
  const handleExport = () => {
    if (onExport) {
      onExport(processedData);
    }
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisibleButtons) {
      const middlePoint = Math.floor(maxVisibleButtons / 2);

      if (currentPage <= middlePoint) {
        endPage = maxVisibleButtons;
      } else if (currentPage >= totalPages - middlePoint) {
        startPage = totalPages - maxVisibleButtons + 1;
      } else {
        startPage = currentPage - middlePoint;
        endPage = currentPage + middlePoint;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PageButton
          key={i}
          active={currentPage === i}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </PageButton>
      );
    }

    return buttons;
  };

  // Render column header with sort and filter
  const renderColumnHeader = (column: { key: string; label: string }) => {
    const isSorted = sortColumn === column.key;

    return (
      <ColumnHeader>
        <SortableHeader onClick={() => handleSort(column.key)}>
          {column.label}
          {isSorted && (
            sortDirection === 'asc' ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />
          )}
        </SortableHeader>
        <FilterInput
          placeholder={`Filter ${column.label}`}
          value={filters[column.key] || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange(column.key, e.target.value)}
        />
      </ColumnHeader>
    );
  };

  // Render cell content based on column type
  const renderCellContent = (item: ResultItem, column: string) => {
    switch (column) {
      case 'percentage':
        return `${item[column].toFixed(1)}%`;

      case 'score':
        return `${item.score}/${item.maxScore}`;

      case 'status':
        return (
          <StatusBadge status={item.status}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </StatusBadge>
        );

      case 'submissionDate':
        return new Date(item[column]).toLocaleString();

      default:
        return item[column];
    }
  };

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <ControlsWrapper>
          <SearchInput
            placeholder="Search all fields..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <DropdownContainer>
            <DropdownTrigger
              variant="secondary"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaFilter size={16} />
              Rows: {rowsPerPage}
              <FaChevronDown size={16} />
            </DropdownTrigger>

            {dropdownOpen && (
              <DropdownContent>
                {[5, 10, 25, 50, 100].map(value => (
                  <DropdownItem
                    key={value}
                    onClick={() => {
                      setRowsPerPage(value);
                      setCurrentPage(1);
                      setDropdownOpen(false);
                    }}
                  >
                    {value} rows
                  </DropdownItem>
                ))}
              </DropdownContent>
            )}
          </DropdownContainer>

          {onExport && (
            <Button
              variant="secondary"
              onClick={handleExport}
            >
              <FaDownload size={16} />
              Export
            </Button>
          )}
        </ControlsWrapper>
      </Header>

      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              {allColumns.map((column) => (
                <StyledTableHeader key={column.key}>
                  {renderColumnHeader(column)}
                </StyledTableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <StyledTableRow
                  key={item.id}
                  clickable={!!onRowClick}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {allColumns.map((column) => (
                    <StyledTableCell key={`${item.id}-${column.key}`}>
                      {renderCellContent(item, column.key)}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))
            ) : (
              <tr>
                <StyledTableCell colSpan={allColumns.length}>
                  <NoResults>No results found</NoResults>
                </StyledTableCell>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </TableContainer>

      {totalPages > 1 && (
        <PaginationContainer>
          <PaginationInfo>
            Showing {((currentPage - 1) * rowsPerPage) + 1} to {
              Math.min(currentPage * rowsPerPage, processedData.length)
            } of {processedData.length} results
          </PaginationInfo>

          <PaginationControls>
            <IconButton
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </IconButton>

            {renderPaginationButtons()}

            <IconButton
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </IconButton>
          </PaginationControls>
        </PaginationContainer>
      )}
    </Container>
  );
};

export default ResultsTable;