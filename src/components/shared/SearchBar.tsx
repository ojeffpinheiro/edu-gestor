import React from 'react'
import { SearchContainer, SearchIconWrapper } from '../../styles/navbar';
import { FiSearch } from 'react-icons/fi';
import SearchInput from './SearchInput';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ placeholder = "Buscar...", value, onChange }: SearchBarProps) => (
  <SearchContainer>
    <SearchIconWrapper>
      <FiSearch />
    </SearchIconWrapper>
    <SearchInput
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </SearchContainer>
);