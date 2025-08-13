import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-index-modal);
`;

const MenuContent = styled.div`
  position: absolute;
  background: var(--color-background);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  padding: var(--space-xs) 0;
  border: 1px solid var(--color-border);
  transform-origin: top left;
  animation: fadeIn 0.2s ease-out;

  &:before {
    content: '';
    position: absolute;
    top: -8px;
    left: 16px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid var(--color-background);
    filter: drop-shadow(0 -2px 1px rgba(0,0,0,0.1));
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  background: none;
  border: none;
  text-align: left;
  color: var(--color-text);
  cursor: pointer;
  transition: var(--transition-colors);
  
  &:hover {
    background: var(--color-background-secondary);
  }
  
  svg {
    color: inherit;
  }
`;

interface MenuItemType {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  parentRef: React.RefObject<HTMLElement | null>;
  items: MenuItemType[]
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
  isOpen,
  onClose,
  triggerRef,
  parentRef,
  items
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && triggerRef.current && parentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
        scrollY: window.scrollY,
        scrollX: window.scrollX // Adicionando a propriedade faltante
      };

      const menuSize = {
        width: 200,
        height: items.length * 40 + 16
      };

      // Detecta se está na primeira linha (ajuste este valor conforme necessário)
      const isFirstRow = parentRect.top < 150;

      // Posição base relativa ao botão
      let top = triggerRect.bottom + viewport.scrollY;
      let left = triggerRect.left + viewport.scrollX; // Agora usando scrollX que está definido

      // Ajuste especial para primeira linha
      if (isFirstRow) {
        top = triggerRect.bottom; // Remove o scrollY para primeira linha
        left = Math.max(10, Math.min(left, viewport.width - menuSize.width - 10));
      } else {
        // Posicionamento normal para outras linhas
        left = Math.min(left, parentRect.right + viewport.scrollX - menuSize.width);
      }

      // Previne que o menu saia da parte inferior da tela
      if (top + menuSize.height > viewport.height + viewport.scrollY) {
        top = triggerRect.top + viewport.scrollY - menuSize.height;
      }

      setAdjustedPosition({ top, left });
    }
  }, [isOpen, triggerRef, parentRef, items.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <MenuWrapper>
      <MenuContent
        ref={menuRef}
        style={{
          top: `${adjustedPosition.top}px`,
          left: `${adjustedPosition.left}px`,
        }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              item.onClick();
              onClose();
            }}
            style={{ color: item.color }}
          >
            {item.icon}
            {item.label}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuWrapper>,
    document.body
  );
};