import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import styled from "styled-components";

const SectionContainer = styled.div`
    margin-bottom: var(--space-md);
    border: 1px solid var(--color-border, #e2e8f0);
    border-radius: var(--border-radius-sm, 0.25rem);
    overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background-third, #f7f9fc);
  padding: var(--space-xs) var(--space-sm);
  cursor: pointer;
  font-weight: bold;
`;

const SectionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  padding: ${({ isOpen }) => (isOpen ? "16px" : "0")};
   background-color: var(--color-card);
`;

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <SectionContainer>
            <SectionHeader onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </SectionHeader>
            <SectionContent isOpen={isOpen}>{children}</SectionContent>
        </SectionContainer>
    );
};

export default CollapsibleSection;
