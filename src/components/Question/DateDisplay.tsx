import React from 'react';

interface DateDisplayProps {
  date: Date | string;
  prefix?: string;
  className?: string;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({ date, prefix, className }) => (
  <div className={className}>
    {prefix && `${prefix} `}
    {new Date(date).toLocaleDateString()}
  </div>
);