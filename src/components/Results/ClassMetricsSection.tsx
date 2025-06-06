import React from 'react'
import styled from 'styled-components';
import { FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';
import { ClassMetricsType } from "../../utils/types/Assessment";

import MetricCard from './MetricCard';

const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

/**
 * Componente que exibe métricas de turma em cards.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {ClassMetricsType | null} props.metrics - Dados das métricas da turma
 * @returns {JSX.Element} Seção de métricas da turma
 */
const ClassMetricsSection = ({ metrics }: { metrics: ClassMetricsType | null }) => (
    <MetricsContainer>
        <MetricCard
            title="Total de Alunos"
            value={metrics?.totalStudents || 0}
            icon={<FiUsers size={20} color="#667eea" />}
            color="#667eea"
            bgColor="rgba(102, 126, 234, 0.1)"
            trend="↗ 5% vs mês anterior" />

        <MetricCard
            title="Média da Turma"
            value={metrics?.averageScore.toFixed(1) || '0.0'}
            unit="pts"
            icon={<FiTrendingUp size={20} color="#10b981" />}
            color="#10b981"
            bgColor="rgba(16, 185, 129, 0.1)"
            trend="↗ 2.3 pts vs período anterior" />

        <MetricCard
            title="Taxa de Aprovação"
            value={`${metrics?.passingRate.toFixed(1) || '0.0'}`}
            unit="%"
            icon={<FiAward size={20} color="#f59e0b" />}
            color="#f59e0b"
            bgColor="rgba(245, 158, 11, 0.1)"
            trend="↗ 8% vs período anterior"
        />
    </MetricsContainer>
);

export default ClassMetricsSection;