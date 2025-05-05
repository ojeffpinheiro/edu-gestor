import styled from "styled-components";
import { constants } from "../../../../utils/consts";

const activeFilterOpacity = '0.9';
const inactiveFilterOpacity = '0.4';

export const MonthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${constants.spacing.lg};
  margin-top: ${constants.spacing.md};
`;

export const MonthContainer = styled.div`
  border: 1px solid ${constants.colors.border.light};
  border-radius: ${constants.borderRadius.md};
  padding: ${constants.spacing.sm};
  background: ${constants.colors.background.secondary};
`;

export const MonthHeader = styled.h3`
  text-align: center;
  margin-bottom: ${constants.spacing.sm};
  color: ${constants.colors.primary};
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  place-items: center;
`;

export const DayCell = styled.div<{ 
  hasEvents: boolean; 
  isCurrentMonth: boolean;
  isToday: boolean;
  eventColor?: string;
}>`
  height: 24px;
  width: 24px;
  border-radius: ${constants.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${constants.fontSize.xs};
  cursor: pointer;
  position: relative;
  margin: 0 auto;
  font-weight: ${props => props.hasEvents ? 'bold' : 'normal'};
  
  background-color: ${props => 
    props.hasEvents ? `${props.eventColor}20` : 'transparent'};
  border: ${props => 
    props.isToday 
      ? `2px solid ${props.eventColor || constants.colors.primary}` 
      : props.hasEvents 
        ? `1px solid ${props.eventColor || constants.colors.primary}`
        : 'none'};
  opacity: ${props => props.isCurrentMonth ? 1 : 0.5};
  
  &:hover {
    background-color: ${props => 
      props.hasEvents ? `${props.eventColor}40` : constants.colors.background.secondary};
    transform: ${props => props.hasEvents ? 'scale(1.1)' : 'none'};
  }

  &::after {
    content: '';
    display: ${props => props.hasEvents ? 'block' : 'none'};
    position: absolute;
    bottom: -4px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${props => props.eventColor || constants.colors.primary};
  }
`;

export const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: ${constants.spacing.xs};
`;

export const WeekdayCell = styled.div`
  text-align: center;
  font-size: ${constants.fontSize.xs};
  font-weight: bold;
  color: ${constants.colors.text.secondary};
`;

export const EventItem = styled.div`
  padding: ${constants.spacing.sm};
  margin-bottom: ${constants.spacing.xs};
  border-radius: ${constants.borderRadius.sm};
  background-color: ${constants.colors.background.secondary};
  transition: all ${constants.transitions.fast};
  
  &:hover {
    background-color: ${constants.colors.background.third};
  }
`;

export const PopupContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  top: ${props => props.visible ? '50%' : '-100%'};
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${constants.zIndex.modal};
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background: ${constants.colors.background.main};
  border-radius: ${constants.borderRadius.md};
  box-shadow: ${constants.shadows.md};
  padding: ${constants.spacing.md};
  transition: top ${constants.transitions.normal};
`;

export const FiltersContainer = styled.div`
  background-color: ${constants.colors.background.secondary};
  border-radius: ${constants.borderRadius.md};
  padding: ${constants.spacing.md};
  margin-bottom: ${constants.spacing.lg};
`;

export const FilterButton = styled.button<{ 
  color: string;
  isActive: boolean;
}>`
  padding: ${constants.spacing.xs} ${constants.spacing.sm};
  background-color: ${props => props.isActive ? `${props.color}20` : 'transparent'};
  color: ${props => props.isActive ? props.color : constants.colors.text.secondary};
  border: 1px solid ${props => props.isActive ? props.color : constants.colors.border.light};
  border-radius: ${constants.borderRadius.md};
  cursor: pointer;
  transition: all ${constants.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${constants.spacing.xs};
  font-size: ${constants.fontSize.sm};
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  opacity: ${props => props.isActive ? activeFilterOpacity : inactiveFilterOpacity};
  max-height: 2rem;
  min-width: 10vw;

  &:hover {
    background-color: ${props => `${props.color}10`};
    opacity: ${activeFilterOpacity};
  }

  &:active {
    background-color: ${props => `${props.color}30`};
  }
`;

export const ActiveFiltersBadge = styled.span`
  background-color: ${constants.colors.primary};
  color: ${constants.colors.text.onPrimary};
  border-radius: ${constants.borderRadius.sm};
  padding: 2px 6px;
  font-size: ${constants.fontSize.xs};
  margin-left: ${constants.spacing.xs};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-radius: ${constants.borderRadius.md};
  color: ${constants.colors.text.secondary};
  font-size: ${constants.fontSize.lg};
  padding: 0 ${constants.spacing.xs};
  transition: ocacity ${constants.transitions.fast};
  
  &:hover {
    ocacity: 0.7;
  }
`;

export const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${constants.spacing.sm};
  margin-bottom: ${constants.spacing.sm};
  border-bottom: 1px solid ${constants.colors.border.light};
`;

export const PopupTitle = styled.h3`
  margin: 0;
  color: ${constants.colors.text.main};
  font-size: ${constants.fontSize.md};
`;

export const EventActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${constants.spacing.sm};
`;

export const ActionButton = styled.button<{ color?: string }>`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.xs};
  padding: ${constants.spacing.xs} ${constants.spacing.sm};
  background-color: transparent;
  color: ${({ color }) => color || constants.colors.text.secondary};
  border: 1px solid constants.colors.border.light;
  border-radius: ${constants.borderRadius.sm};
  cursor: pointer;
  transition: all ${constants.transitions.fast};
  font-size: ${constants.fontSize.xs};

  &:hover {
    background-color: ${({ color }) => color ? `${color}20` : constants.colors.background.secondary};
  }
`;

export const FilterCategory = styled.div`
  margin-bottom: ${constants.spacing.md};
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${constants.spacing.xs} 0;
`;

export const CategoryToggle = styled.button`
  background: none;
  border: none;
  padding: ${constants.spacing.xs};
  border-radius: ${constants.borderRadius.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${constants.colors.text.secondary};
  transition: all ${constants.transitions.fast};

  &:hover {
    background-color: ${constants.colors.background.secondary};
    color: ${constants.colors.text.main};
  }
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(59vh, 1fr));
  gap: ${constants.spacing.sm};
  margin-top: ${constants.spacing.sm};
`;

export const FilterSection = styled.div`
  margin-bottom: ${constants.spacing.md};
  border: 1px solid ${constants.colors.border.light};
  border-radius: ${constants.borderRadius.md};
  overflow: hidden;
`;

export const FilterSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${constants.spacing.sm};
  background-color: ${constants.colors.background.third};
  cursor: pointer;
  user-select: none;
`;

export const FilterContent = styled.div`
  padding: ${constants.spacing.sm};
  background-color: ${constants.colors.background.main};
`;

export const FilterList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: ${constants.spacing.sm};
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
  padding: ${constants.spacing.xs} 0;
`;

export const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
  margin-top: ${constants.spacing.sm};
`;