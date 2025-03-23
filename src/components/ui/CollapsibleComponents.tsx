import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  background-color: var(--color-primary);
  color: var(--color-text);
  padding: 10px 15px;
  cursor: pointer;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const ContentContainer = styled.div`
  padding: 15px;
  border: 1px solid var(--color-border);
  border-top-width: 0;
  border-radius: 0 0 4px 4px;
  background-color: var(--color-secondary);
`;

interface CollapsibleHeaderProps {
  title: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface CollapsibleContentProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const CollapsibleHeader: React.FC<CollapsibleHeaderProps> = ({ title, onClick }) => {
  return (
    <HeaderContainer onClick={onClick}>
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({ isOpen, children }) => {
  return isOpen ? <ContentContainer>{children}</ContentContainer> : null;
};

export { CollapsibleHeader, CollapsibleContent };
