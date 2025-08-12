import React from 'react';

interface TagListProps {
  tags: string[];
  className?: string;
}

export const TagList: React.FC<TagListProps> = ({ tags, className }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
    {tags?.map((tag, index) => (
      <span
        key={index}
        style={{
          padding: '0.25rem 0.5rem',
          backgroundColor: 'var(--color-background-tertiary)',
          borderRadius: '4px',
          fontSize: '0.75rem'
        }}
      >
        {tag}
      </span>
    ))}
  </div>
);