import styled from "styled-components";

export const PageContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: var(--space-xl);
  max-width: 95vw;
  margin: 0 auto;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md);
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.75rem;
`;

export const MainLayout = styled.div`
  display: flex;
  gap: 1.5rem;
  height: calc(100vh - 120px);
  border-radius: 8px;
  border: 1px solid #e1e4e8;
  overflow: hidden;
`;

export const NavigationPanel = styled.div`
  flex: 0 0 300px;
  background-color: #f6f8fa;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e1e4e8;
`;

export const PanelHeader = styled.div`
  padding: 1rem;
  font-weight: 600;
  color: #24292e;
  border-bottom: 1px solid #e1e4e8;
  background-color: #f1f3f5;
`;

export const NavigationTree = styled.div`
  padding: 1rem 0;
  overflow-y: auto;
  flex: 1;
`;

export const NavItem = styled.div<{ level: number; isSelected: boolean; isHigherLevel: boolean }>`
  padding: 0.625rem 1rem;
  padding-left: ${props => `${props.level * 1.25 + 1}rem`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: #24292e;
  border-left: 3px solid transparent;
  
  ${props => props.isSelected && `
    background-color: rgba(3, 102, 214, 0.08);
    border-left-color: #0366d6;
    font-weight: 500;
  `}
  
  ${props => props.isHigherLevel && !props.isSelected && `
    font-weight: 500;
  `}
  
  &:hover {
    background-color: rgba(3, 102, 214, 0.04);
  }
`;

export const ItemLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ExpandButton = styled.span`
  display: inline-flex;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  color: #6a737d;
  cursor: pointer;
  
  &:hover {
    color: #0366d6;
  }
`;

export const ItemIcon = styled.span`
  color: #0366d6;
  display: inline-flex;
  align-items: center;
`;

export const ItemType = styled.span`
  font-size: 0.75rem;
  color: #6a737d;
  background-color: #f1f3f5;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
`;

export const ContentPanel = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const DetailsContainer = styled.div`
  padding: 1.5rem;
  flex: 1;
`;

export const BreadcrumbNav = styled.div`
  margin-bottom: 1.25rem;
  color: #6a737d;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const BreadcrumbItem = styled.span`
  cursor: pointer;
  
  &:hover {
    color: #0366d6;
    text-decoration: underline;
  }
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

export const ItemTypeLabel = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
  color: #6a737d;
  margin-bottom: 0.5rem;
`;

export const DetailTitle = styled.h2`
  margin: 0;
  font-size: 1.75rem;
  color: #24292e;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  background-color: transparent;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6a737d;
  
  &:hover {
    background-color: #f6f8fa;
    color: #0366d6;
  }
`;

export const ContentSection = styled.div`
  margin-top: 1.5rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #24292e;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
`;

export const ContentCard = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    border-color: #d1d5da;
  }
`;

export const CardIcon = styled.div`
  color: #0366d6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardContent = styled.div`
  flex: 1;
`;

export const CardTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

export const CardType = styled.div`
  font-size: 0.75rem;
  color: #6a737d;
`;

export const AddCard = styled.div`
  border: 1px dashed #d1d5da;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #6a737d;
  height: 100%;
  min-height: 80px;
  transition: background-color 0.15s ease;
  
  &:hover {
    background-color: #f6f8fa;
    color: #0366d6;
    border-color: #0366d6;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  flex: 1;
  color: #6a737d;
  text-align: center;
  
  p {
    margin-top: 1rem;
    font-size: 1rem;
  }
`;

export const EmptyContentMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6a737d;
  
  p {
    margin-bottom: 1rem;
  }
`;

export const AddButton = styled.button`
  background-color: #0366d6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #035bc2;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90vw;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e1e4e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h3 {
    margin: 0;
    font-size: 1.25rem;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const ModalFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #e1e4e8;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.25rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #24292e;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5da;
  border-radius: 6px;
  font-size: 0.875rem;
  
  &:focus {
    border-color: #0366d6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.1);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5da;
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    border-color: #0366d6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.1);
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SaveButton = styled(Button)`
  background-color: #2ea44f;
  color: white;
  border: none;
  
  &:hover:not(:disabled) {
    background-color: #2c974b;
  }
`;

export const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #d1d5da;
  color: #24292e;
  
  &:hover {
    background-color: #f6f8fa;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6a737d;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;
  
  &:hover {
    color: #24292e;
  }
`;