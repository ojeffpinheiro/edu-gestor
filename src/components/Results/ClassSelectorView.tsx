import React, { useState } from 'react';
import { FiChevronDown, FiSearch, FiX } from 'react-icons/fi';
import styled, { css } from 'styled-components';
import { ClassPerformance } from '../../utils/types/Assessment';

const ClassViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #718096;
  background: #f7fafc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

const ClassSelectorContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-bottom: 24px;
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:hover {
    border-color: #cbd5e0;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
  }
`;

const Dropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-top: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
`;

const SearchContainer = styled.div`
  padding: 12px;
  border-bottom: 1px solid #edf2f7;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
  }
`;

const ClassList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const ClassItem = styled.div<{ $isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
  
  ${({ $isSelected }) => $isSelected && css`
    background: #ebf8ff;
    color: #3182ce;
  `}
  
  &:hover {
    background: #f7fafc;
  }
`;

const ClassInfo = styled.div`
  margin-left: 12px;
  flex: 1;
`;

const ClassName = styled.div`
  font-weight: 500;
`;

const ClassMeta = styled.div`
  font-size: 12px;
  color: #718096;
  display: flex;
  gap: 8px;
  margin-top: 2px;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 4px;
  margin-left: 8px;
  
  &:hover {
    color: #e53e3e;
  }
`;

interface ClassSelectorProps {
  classes: ClassPerformance[];
  selectedClass: string | null;
  placeholder?: string;
  onSelect: (classId: string | null) => void;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({ 
  classes, selectedClass, onSelect,
  placeholder = "Selecione uma turma..." 
 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClasses = classes.filter(c =>
    c.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.teacher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.academicPeriod?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedClassData = classes.find(c => c.classId === selectedClass);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleSelect = (classId: string) => {
    onSelect(classId);
    closeDropdown();
  };

  const handleClear = () => {
    onSelect(null);
    setSearchTerm('');
  };

  return (
    <ClassSelectorContainer>
      <SelectButton onClick={toggleDropdown}>
        {selectedClassData ? (
          <div>
            <div>{selectedClassData.className}</div>
            <ClassMeta>
              {selectedClassData.teacher} • {selectedClassData.academicPeriod}
            </ClassMeta>
          </div>
        ) : (
          <span>{placeholder}</span>
        )}
        <FiChevronDown />
      </SelectButton>

      <Dropdown $isOpen={isOpen}>
        <SearchContainer>
          <FiSearch style={{ marginRight: '8px', color: '#718096' }} />
          <SearchInput
            type="text"
            placeholder="Buscar turma, professor ou período..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {searchTerm && (
            <ClearButton onClick={() => setSearchTerm('')}>
              <FiX size={16} />
            </ClearButton>
          )}
        </SearchContainer>

        <ClassList>
          {filteredClasses.length > 0 ? (
            filteredClasses.map((c) => (
              <ClassItem
                key={c.classId}
                $isSelected={c.classId === selectedClass}
                onClick={() => handleSelect(c.classId)}
              >
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#bee3f8' }} />
                <ClassInfo>
                  <ClassName>{c.className}</ClassName>
                  <ClassMeta>
                    <span>{c.teacher}</span>
                    <span>•</span>
                    <span>{c.academicPeriod}</span>
                    <span>•</span>
                    <span>{c.studentCount} alunos</span>
                  </ClassMeta>
                </ClassInfo>
              </ClassItem>
            ))
          ) : (
            <ClassItem $isSelected={false} style={{ cursor: 'default', justifyContent: 'center' }}>
              Nenhuma turma encontrada
            </ClassItem>
          )}
        </ClassList>
      </Dropdown>
    </ClassSelectorContainer>
  );
};

export default ClassSelector;