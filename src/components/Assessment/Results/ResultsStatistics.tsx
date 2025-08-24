/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { FaChartBar, FaChartPie, FaChartLine, FaQuestion, FaSyncAlt } from 'react-icons/fa';

import { useExamResults } from '../../../hooks/assessment/useExamResults';
import { ExamResult } from '../../../types/academic/Assessment';

import { calculateStatistics } from '../../../utils/calculateStatistics';
import { Card, CardContent, CardHeader, CardTitle } from '../../../styles/card';
import { Container } from '../../../styles/layoutUtils';
import { Select } from '../../modals/StudentFormModal/styles';
import { TabsContainer } from '../../../styles/tabs';
import { TabButton } from '../../../styles/buttons';

import { 
  CardGrid,
  ControlsWrapper,
  EmptyState,
  Header,
  QuartileMean,
  QuartilesBar,
  QuartilesContainer,
  QuartileSection,
  QuartilesLabel,
  QuartilesScale,
  RefreshButton,
  StatItem,
  StatLabel,
  StatsGrid,
  StatValue,
  TabContent,
  TabsList,
  Title
} from './styles';

// Interfaces
interface ResultsStatisticsProps {
  assessmentId?: string;
  className?: string;
}

interface StatisticsData {
  mean: number;
  median: number;
  standardDeviation: number;
  min: number;
  max: number;
  quartiles: {
    q1: number;
    q2: number;
    q3: number;
  };
  passRate?: number;
  correctRate?: number;
  distributionData: Array<{
    range: string;
    count: number;
  }>;
  performanceBySection: Array<{
    section: string;
    averageScore: number;
  }>;
  timeSpentData: Array<{
    range: string;
    count: number;
  }>;
  questionAnalysis?: Array<{
    questionId: string;
    successRate: number;
    averageTime: number;
  }>;
}

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ResultsStatistics: React.FC<ResultsStatisticsProps> = ({ assessmentId, className }) => {
  const { getStudentResult } = useExamResults();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMetric, setSelectedMetric] = useState('score');
  const [statistics, setStatistics] = useState<StatisticsData>({
    mean: 0,
    median: 0,
    standardDeviation: 0,
    min: 0,
    max: 0,
    quartiles: { q1: 0, q2: 0, q3: 0 },
    distributionData: [],
    performanceBySection: [],
    timeSpentData: []
  });
  const [results, setResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    if (assessmentId) {
      loadResults(assessmentId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentId]);

  useEffect(() => {
    if (results.length > 0) {
      const stats = calculateStatistics(results, selectedMetric);
      setStatistics(stats);
    }
  }, [results, selectedMetric, calculateStatistics]);

  const loadResults = async (id: string) => {
    try {
      const data = await getStudentResult(id);
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading assessment results:', error);
    }
  };

  const handleMetricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(e.target.value);
  };

  const renderScoreDistribution = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statistics.distributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  const renderPerformanceBySection = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance by Section</CardTitle>
        </CardHeader>
        <CardContent>
          {statistics.performanceBySection.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statistics.performanceBySection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="section" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="averageScore" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState>No section data available</EmptyState>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderCompletionTimeDistribution = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Completion Time Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {statistics.timeSpentData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={statistics.timeSpentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#ff7300" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState>No time data available</EmptyState>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderQuestionSuccessRate = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Question Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Correct', value: statistics.correctRate || 0 },
                  { name: 'Incorrect', value: 100 - (statistics.correctRate || 0) }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }: { name: string, percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {[0, 1].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  const renderStatisticsCard = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Key Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <StatsGrid>
            <StatItem>
              <StatLabel>Mean</StatLabel>
              <StatValue>{statistics.mean.toFixed(2)}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Median</StatLabel>
              <StatValue>{statistics.median.toFixed(2)}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Standard Deviation</StatLabel>
              <StatValue>{statistics.standardDeviation.toFixed(2)}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Minimum</StatLabel>
              <StatValue>{statistics.min.toFixed(2)}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Maximum</StatLabel>
              <StatValue>{statistics.max.toFixed(2)}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Pass Rate</StatLabel>
              <StatValue>{`${statistics.passRate?.toFixed(2) || 0}%`}</StatValue>
            </StatItem>
          </StatsGrid>

          <QuartilesContainer>
            <QuartilesLabel>Quartiles</QuartilesLabel>
            <QuartilesBar>
              <QuartileSection
                left="0%"
                width={`${(statistics.quartiles.q1 / statistics.max) * 100}%`}
                color="rgba(0, 136, 254, 0.3)"
                borderRadius="var(--border-radius-md) 0 0 var(--border-radius-md)"
              />
              <QuartileSection
                left={`${(statistics.quartiles.q1 / statistics.max) * 100}%`}
                width={`${((statistics.quartiles.q2 - statistics.quartiles.q1) / statistics.max) * 100}%`}
                color="rgba(0, 136, 254, 0.5)"
              />
              <QuartileSection
                left={`${(statistics.quartiles.q2 / statistics.max) * 100}%`}
                width={`${((statistics.quartiles.q3 - statistics.quartiles.q2) / statistics.max) * 100}%`}
                color="rgba(0, 136, 254, 0.7)"
              />
              <QuartileSection
                left={`${(statistics.quartiles.q3 / statistics.max) * 100}%`}
                width={`${((statistics.max - statistics.quartiles.q3) / statistics.max) * 100}%`}
                color="rgba(0, 136, 254, 0.9)"
                borderRadius="0 var(--border-radius-md) var(--border-radius-md) 0"
              />
              <QuartileMean left={`${(statistics.mean / statistics.max) * 100}%`} />
            </QuartilesBar>
            <QuartilesScale>
              <span>0</span>
              <span>{statistics.quartiles.q1.toFixed(1)}</span>
              <span>{statistics.quartiles.q2.toFixed(1)}</span>
              <span>{statistics.quartiles.q3.toFixed(1)}</span>
              <span>{statistics.max.toFixed(1)}</span>
            </QuartilesScale>
          </QuartilesContainer>
        </CardContent>
      </Card>
    );
  };

  const renderQuestionAnalysis = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Question Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {statistics.questionAnalysis && statistics.questionAnalysis.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={statistics.questionAnalysis}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 120
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="questionId" angle={-90} textAnchor="end" height={120} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="successRate" fill="#82ca9d" name="Success Rate (%)" />
                <Bar dataKey="averageTime" fill="#8884d8" name="Avg. Time (sec)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState>No question data available</EmptyState>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Container className={className}>
      <Header>
        <Title>Results Statistics</Title>
        <ControlsWrapper>
          <Select value={selectedMetric} onChange={handleMetricChange}>
            <option value="score">Overall Score</option>
            <option value="percentCorrect">Percent Correct</option>
            <option value="timeSpent">Time Spent</option>
          </Select>
          <RefreshButton onClick={() => loadResults(assessmentId || '')}>
            <FaSyncAlt /> Refresh
          </RefreshButton>
        </ControlsWrapper>
      </Header>

      <TabsContainer>
        <TabsList>
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            <FaChartPie /> Overview
          </TabButton>
          <TabButton
            active={activeTab === 'distribution'}
            onClick={() => setActiveTab('distribution')}
          >
            <FaChartBar /> Distribution
          </TabButton>
          <TabButton
            active={activeTab === 'sections'}
            onClick={() => setActiveTab('sections')}
          >
            <FaChartLine /> By Section
          </TabButton>
          <TabButton
            active={activeTab === 'questions'}
            onClick={() => setActiveTab('questions')}
          >
            <FaQuestion /> By Question
          </TabButton>
        </TabsList>

        <TabContent active={activeTab === 'overview'}>
          {renderStatisticsCard()}
          <CardGrid>
            {renderScoreDistribution()}
            {renderQuestionSuccessRate()}
          </CardGrid>
        </TabContent>

        <TabContent active={activeTab === 'distribution'}>
          {renderScoreDistribution()}
          {renderCompletionTimeDistribution()}
        </TabContent>

        <TabContent active={activeTab === 'sections'}>
          {renderPerformanceBySection()}
        </TabContent>

        <TabContent active={activeTab === 'questions'}>
          {renderQuestionAnalysis()}
        </TabContent>
      </TabsContainer>
    </Container>
  );
};

export default ResultsStatistics;