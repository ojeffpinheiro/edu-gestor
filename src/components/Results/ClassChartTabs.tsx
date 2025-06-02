import React from 'react'
import { ChartTab, ClassPerformance, EvaluationRubric } from "../../utils/types/Assessment";
import DashboardCard from "./DashboardCard";
import { ChartTabs, TabButton } from './Features/styles/ClassViewStyles';
import DistributionView from './ClassCharts/DistributionView';
import ProgressView from './ClassCharts/ProgressView';
import RadarChart from './Charts/RadarChart';

interface ClassViewProps {
    activeTab: ChartTab;
    classPerformance: ClassPerformance;
    rubrics?: EvaluationRubric[];
    onTabChange: (tab: ChartTab) => void;
}

const ClassChartTabs = ({ activeTab, onTabChange, classPerformance, rubrics }: ClassViewProps) => (
    <DashboardCard title="Análise de Desempenho">
        <ChartTabs>
            {['radar', 'distribution', 'progress'].map((tab) => (
                <TabButton
                    key={tab}
                    $active={activeTab === tab}
                    onClick={() => onTabChange(tab as ChartTab)}
                >
                    {tab === 'radar' && 'Desempenho por Habilidade'}
                    {tab === 'distribution' && 'Distribuição de Notas'}
                    {tab === 'progress' && 'Progresso Temporal'}
                </TabButton>
            ))}
        </ChartTabs>
        <div className="chart-container">
            {activeTab === 'radar' &&
                <RadarChart classPerformance={classPerformance} rubrics={rubrics} />}

            {activeTab === 'distribution' && (
                <DistributionView
                    examSummaries={classPerformance.examResults}
                />
            )}
            {activeTab === 'progress' && (
                <ProgressView
                    currentClass={classPerformance}
                />
            )}
        </div>
    </DashboardCard>
);

export default ClassChartTabs;