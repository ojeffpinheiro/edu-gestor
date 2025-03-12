import React, { useCallback, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import { CollapsibleProps } from "../../utils/types";

import ReportCheckbox from "./ReportCheckbox";
import styled from "styled-components";


const CollapsibleSection: React.FC<CollapsibleProps> = ({
    title,
    initiallyExpanded = false,
    sectionColor,
    includeInReport,
    onToggleInclude,
    children
}) => {
    const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
    const sectionId = `content-${title.toLowerCase().replace(/\s+/g, '-')}`;

    const toggleExpanded = useCallback(() => {
        setIsExpanded(prevExpanded => !prevExpanded);
    }, []);

    const handleKeyboardToggle = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            toggleExpanded();
            e.preventDefault();
        }
    }, [toggleExpanded]);

    return (
        <SectionContainer
            backgroundColor={sectionColor}
            data-testid={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
            <SectionHeader
                onClick={toggleExpanded}
                aria-expanded={isExpanded}
                tabIndex={0}
                role="button"
                aria-controls={sectionId}
                onKeyDown={handleKeyboardToggle}
            >
                {title} {isExpanded ? <FaAngleUp aria-hidden="true" /> : <FaAngleDown aria-hidden="true" />}
            </SectionHeader>

            <ReportCheckbox
                checked={includeInReport}
                onChange={onToggleInclude}
                label={`Incluir ${title.toLowerCase()} no relatório`}
            />

            {isExpanded && (
                <div id={sectionId}>
                    {children}
                </div>
            )}
        </SectionContainer>
    );
};

const SectionContainer = styled.div<{ backgroundColor: string }>`
    margin-bottom: var(--space-xl);
    padding: var(--space-md);
    border-radius: var(--border-radius-md);
    background-color: ${props => props.backgroundColor || 'var(--color-background-third, #f7f9fc)'};
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
    border: 1px solid var(--color-border-light, #eaeaea);
    transition: all 0.3s ease;
`;

const SectionHeader = styled.h3`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-md);
    font-size: var(--font-size-lg);
    color: var(--color-title-card);
    cursor: pointer;
    padding: var(--space-sm);
    border-radius: var(--border-radius-sm);
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

export default CollapsibleSection