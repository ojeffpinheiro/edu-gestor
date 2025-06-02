import React from 'react'

const ViewToggle = ({
    activeView,
    onViewChange
}: {
    activeView: 'class' | 'school';
    onViewChange: (view: 'class' | 'school') => void;
}) => (
    <div className="view-toggle">
        {(['class', 'school'] as const).map((view) => (
            <button
                key={view}
                className={activeView === view ? 'active' : ''}
                onClick={() => onViewChange(view)}
            >
                {view === 'class' ? 'Visualização por Turma' : 'Visualização por Escola'}
            </button>
        ))}
    </div>
);

export default ViewToggle;