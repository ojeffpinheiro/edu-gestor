import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { IconWrapper, SectionContainer, SectionContent, SectionHeader } from "./styles";

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
    title, 
    children, 
    defaultOpen = true 
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <SectionContainer>
            <SectionHeader 
                onClick={() => setIsOpen(!isOpen)}
                role="button"
                aria-expanded={isOpen}
                aria-controls={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
            >
                <span>{title}</span>
                <IconWrapper isOpen={isOpen}>
                    <FaChevronUp />
                </IconWrapper>
            </SectionHeader>
            <SectionContent 
                isOpen={isOpen}
                id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
            >
                {children}
            </SectionContent>
        </SectionContainer>
    );
};

export default CollapsibleSection;