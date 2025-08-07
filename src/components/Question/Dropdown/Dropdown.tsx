import React from 'react';
import {
  DropdownContainer,
  DropdownTrigger,
  DropdownContent,
} from './styles';
import { DropdownProps } from '../types';
import DropdownItem from './DropdownItem';

const Dropdown = ({
  trigger,
  items,
  position = 'left',
  align = 'start',
  triggerClassName,
  contentClassName,
}: DropdownProps) => {
  return (
    <DropdownContainer>
      <DropdownTrigger className={triggerClassName}>
        {trigger}
      </DropdownTrigger>

      <DropdownContent
        position={position}
        align={align}
        className={contentClassName}
      >
        {items.map((item) => (
          <DropdownItem key={item.id} item={item} />
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;