
import React, { useState } from 'react';
import { Evaluation } from '../../../utils/types/AssessmentEvaluation';
import { Card, CardBody, CardHeader } from '../../../styles/card';
import ClassGradesView from '../ClassGradesView';

interface GradesViewProps {
    evaluations: Evaluation[];
}

const GradesView: React.FC<GradesViewProps> = ({ evaluations }) => {
    const [selectedClass, setSelectedClass] = useState<{
        name: string;
        trimester: number;
    } | null>(null);

    // Agrupar avaliações por turma e trimestre
    const classes = Array.from(
        new Set(
            evaluations.map(evaluation => `${evaluation.series}-${evaluation.trimester}`)
        )
    ).map(classStr => {
        const [name, trimester] = classStr.split('-');
        return { name, trimester: parseInt(trimester) };
    });

    return (
        <div>
            <h2>Notas por Turma</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {classes.map((cls, index) => (
                    <Card key={index} onClick={() => setSelectedClass(cls)}>
                        <CardHeader>
                            <h3>{cls.name}</h3>
                        </CardHeader>
                        <CardBody>
                            <p>{cls.trimester}º Trimestre</p>
                            <p>
                                {
                                    evaluations.filter(
                                        e => e.series === cls.name && e.trimester === cls.trimester
                                    ).length
                                }{' '}
                                avaliações
                            </p>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {selectedClass && (
                <ClassGradesView
                    classInfo={selectedClass}
                    evaluations={evaluations.filter(
                        e => e.series === selectedClass.name && e.trimester === selectedClass.trimester
                    )}
                    onClose={() => setSelectedClass(null)}
                />
            )}
        </div>
    );
};

export default GradesView;