import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { StudentFormData } from '../../../utils/types/BasicUser';
import { SearchContainer, SearchInput, ClearButton } from './styles';

interface SearchBarProps {
  students: StudentFormData[];
  onSearchResults: (results: StudentFormData[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ students, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [filters, setFilters] = useState({
    className: '',
    minAttendance: 0,
    maxAttendance: 100,
    specialNeeds: [] as string[]
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(debouncedTerm.toLowerCase());
      const matchesClass = !filters.className || student.className === filters.className;
      const matchesAttendance = student.attendance !== undefined &&
        student.attendance >= filters.minAttendance &&
        student.attendance <= filters.maxAttendance;
      const matchesSpecialNeeds = filters.specialNeeds.length === 0 ||
        (student.specialNeeds && filters.specialNeeds.includes(student.specialNeeds));

      return matchesSearch && matchesClass && matchesAttendance && matchesSpecialNeeds;
    });
  }, [students, debouncedTerm, filters]);

  useEffect(() => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(debouncedTerm.toLowerCase())
    );
    onSearchResults(filtered);
  }, [debouncedTerm, students]);

  useEffect(() => {
    onSearchResults(filteredStudents);
  }, [filteredStudents]);

  return (
    <SearchContainer>
      <div style={{ position: 'relative', flex: 1 }}>
        <SearchInput
          type="text"
          placeholder="Buscar aluno..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm ? (
          <ClearButton onClick={() => setSearchTerm('')}>
            <FiX size={16} />
          </ClearButton>
        ) : (
          <FiSearch size={18} className="search-icon" />
        )}
      </div>
    </SearchContainer>
  );
});

export default SearchBar;