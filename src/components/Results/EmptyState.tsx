import React from 'react';
import styled from 'styled-components';
import { FiInbox, FiSearch, FiUsers } from 'react-icons/fi';

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  min-height: 300px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.2);
`;

const EmptyMessage = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 1.5rem;
  font-weight: 500;
  max-width: 400px;
`;

const ActionWrapper = styled.div`
  margin-top: 1rem;
`;

interface EmptyStateProps {
  message: string;
  illustration?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  type?: 'default' | 'search' | 'users';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  illustration,
  action,
  className = '',
  type = 'default'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'search': return <FiSearch size={32} color="white" />;
      case 'users': return <FiUsers size={32} color="white" />;
      default: return <FiInbox size={32} color="white" />;
    }
  };

  return (
    <EmptyContainer className={className}>
      <IconWrapper>
        {illustration || getIcon()}
      </IconWrapper>
      <EmptyMessage>{message}</EmptyMessage>
      {action && <ActionWrapper>{action}</ActionWrapper>}
    </EmptyContainer>
  );
};

export default EmptyState;