import React from 'react'
import { DropdownItemType } from '../types';
import { DropdownItemContainer, DropdownDivider } from './styles';

interface DropdownItemProps {
  item: DropdownItemType;
}

const DropdownItem = ({ item }: DropdownItemProps) => {
  if (item.divider) {
    return <DropdownDivider />;
  }

  return (
    <DropdownItemContainer
      onClick={item.disabled ? undefined : item.onClick}
      disabled={item.disabled}
    >
      {item.content}
    </DropdownItemContainer>
  );
};

export default DropdownItem;