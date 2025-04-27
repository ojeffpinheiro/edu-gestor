// src/components/common/EmptyState.tsx
import React from 'react';
import { EmptyStateMessage } from '../../styles/table';
import { Card } from '../../styles/card';

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