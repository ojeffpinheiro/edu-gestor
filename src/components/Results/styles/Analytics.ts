import styled from "styled-components";
import { Card } from "../../ui/Card";

export const AnalyticsContainer = styled.div`
  min-height: 100vh;
  background: var(--color-background);
`;

export const Header = styled.header`
  border-bottom: 1px solid var(--color-border);
  background: var(--color-card);
  box-shadow: var(--shadow-card);
  padding: 1.5rem 0;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  justify-content: between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

export const HeaderSubtitle = styled.p`
  color: var(--color-muted-foreground);
  margin: 0.25rem 0 0 0;
`;

export const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Grid = styled.div<{ $columns?: number }>`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(${({ $columns = 1 }) => $columns}, 1fr);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Flex = styled.div<{ $justify?: string; $align?: string; $gap?: string }>`
  display: flex;
  justify-content: ${({ $justify = 'flex-start' }) => $justify};
  align-items: ${({ $align = 'center' }) => $align};
  gap: ${({ $gap = '0.5rem' }) => $gap};
`;


export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ActionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const ClassGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
`;

export const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
`;

export const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
`;

export const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
`;

export const StudentItem = styled.div<{ $isRisk?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme, $isRisk }) => 
    $isRisk ? theme.colors.destructive + "1a" : theme.colors.secondary + "80"};
  border: ${({ theme, $isRisk }) => 
    $isRisk ? `1px solid ${theme.colors.destructive}33` : 'none'};
`;

export const StudentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const StudentRank = styled.div<{ $rank: number }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
  font-weight: bold;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0;
`;

export const SectionDescription = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin: 0.25rem 0 0;
`;

export const SectionActions = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: stretch;
    
    button {
      flex: 1;
    }
  }
`;

export const MetricContainer = styled(Card)`
  min-height: 120px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const Title = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-muted-foreground);
`;

export const IconWrapper = styled.div`
  color: var(--color-muted-foreground);
  font-size: 1rem;
`;

export const Value = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-card-foreground);
  margin-bottom: 0.25rem;
`;

export const Trend = styled.div<{ $isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: ${({ $isPositive }) => 
    $isPositive ? 'var(--color-accent)' : 'var(--color-destructive)'};
`;

export const TabsContent = styled.div<{ value: string }>`
  margin-top: 1.5rem;
`;