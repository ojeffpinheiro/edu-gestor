// components/TagInput.tsx
import React, { useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import { Input } from '../../styles/inputs';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
}


const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: #e3f2fd;
  border-radius: 16px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #bbdefb;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 0.25rem;
    color: #555;
    
    &:hover {
      color: #333;
    }
  }
`;

const TagInput: React.FC<TagInputProps> = ({ tags, onChange, suggestions = [] }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag)) {
      onChange([...tags, tag.trim()]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (['Enter', 'Tab', ','].includes(e.key) && inputValue.trim()) {
      e.preventDefault();
      handleAddTag(inputValue);
    }
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) && 
      !tags.includes(suggestion)
  );

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
        {tags.map(tag => (
          <Chip key={tag}>
            {tag}
            <button onClick={() => handleRemoveTag(tag)}>
              <FaTimes size={12} />
            </button>
          </Chip>
        ))}
      </div>
      
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Adicionar tag..."
      />
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          zIndex: 10,
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          {filteredSuggestions.map(suggestion => (
            <div
              key={suggestion}
              style={{
                padding: '0.5rem',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
              onMouseDown={() => handleAddTag(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;