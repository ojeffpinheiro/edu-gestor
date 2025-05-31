import React from 'react';

interface EmptyStateProps {
  message: string;
  illustration?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  illustration = null,
  action,
  className = ''
}) => {
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-content">
        {illustration}
        <p className="empty-message">{message}</p>
        {action && <div className="empty-action">{action}</div>}
      </div>
    </div>
  );
};

export default EmptyState;