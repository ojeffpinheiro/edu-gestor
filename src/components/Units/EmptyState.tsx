// src/components/common/EmptyState.tsx
import React from 'react';
import { Card } from '../../styles/layoutUtils';
import { EmptyStateMessage } from '../../styles/table';

interface EmptyStateProps {
    message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
    return (
        <Card>
            <EmptyStateMessage>
                {message}
            </EmptyStateMessage>
        </Card>
    );
};

export default EmptyState;