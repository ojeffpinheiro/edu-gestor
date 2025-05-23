import React, { useState } from 'react'
import { Section, SectionHeader } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { ActionButton } from '../../../styles/buttons';
import { Table, TableCell, TableHeader, TableRow } from '../../../styles/table';
import { RecoveryActivity } from '../../../utils/types/AssessmentEvaluation';
import RecoveryActivityModal from '../RecoveryActivityModal';

const RecoveryView: React.FC = () => {
    const [activities, setActivities] = useState<RecoveryActivity[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <Section>
            <SectionHeader>
                <SectionTitle>Atividades de Recuperação</SectionTitle>
                <ActionButton onClick={() => setIsModalOpen(true)}>
                    Nova Atividade
                </ActionButton>
            </SectionHeader>
            
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>Turma</TableHeader>
                        <TableHeader>Atividade</TableHeader>
                        <TableHeader>Data</TableHeader>
                        <TableHeader>Status</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {activities.map(activity => (
                        <TableRow key={activity.id}>
                            <TableCell>{activity.class}</TableCell>
                            <TableCell>{activity.name}</TableCell>
                            <TableCell>{activity.date}</TableCell>
                            <TableCell>{activity.status}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            
            {isModalOpen && (
                <RecoveryActivityModal
                    onSave={(newActivity) => {
                        setActivities([...activities, newActivity]);
                        setIsModalOpen(false);
                    }}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </Section>
    );
};

export default RecoveryView;