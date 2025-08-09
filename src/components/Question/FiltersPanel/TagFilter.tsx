// components/TagFilter.tsx
import React, { useState } from 'react';
import { Chip, Input, Button } from '@mui/material';
import { FiX } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';

interface TagFilterProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags?: string[];
}

const TagFilter: React.FC<TagFilterProps> = ({ 
  tags, 
  onTagsChange, 
  availableTags = [] 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag)) {
      onTagsChange([...tags, tag.trim()]);
    }
    setInputValue('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
        {tags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => handleRemoveTag(tag)}
            deleteIcon={<FiX />}
          />
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputValue.trim()) {
              handleAddTag(inputValue);
            }
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Adicionar tag..."
        />
        <Button 
          variant="contained" 
          size="small"
          onClick={() => handleAddTag(inputValue)}
          disabled={!inputValue.trim()}
        >
          <FaPlus />
        </Button>
      </div>

      {showSuggestions && availableTags.length > 0 && (
        <div style={{
          position: 'absolute',
          zIndex: 10,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          width: '100%',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          {availableTags
            .filter(tag => 
              tag.toLowerCase().includes(inputValue.toLowerCase()) && 
              !tags.includes(tag)
            )
            .map(tag => (
              <div
                key={tag}
                style={{ padding: '0.5rem', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                onMouseDown={() => handleAddTag(tag)}
              >
                {tag}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TagFilter;