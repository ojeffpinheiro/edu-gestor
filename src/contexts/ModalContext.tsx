// src/contexts/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = 'LESSON_FORM' | 'TEAM_FORM' | 'EVENT_FORM' | 'SHIFT_SETTINGS' | null;

interface ModalState {
  type: ModalType;
  props: any;
  isOpen: boolean;
}

interface ModalActions {
  openModal: (type: ModalType, props?: any) => void;
  closeModal: () => void;
}

interface ModalContextType {
  state: ModalState;
  actions: ModalActions;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ModalState>({
    type: null,
    props: null,
    isOpen: false
  });

  const actions = {
    openModal: (type: ModalType, props: any = null) => 
      setState({ type, props, isOpen: true }),
    closeModal: () => 
      setState(prev => ({ ...prev, isOpen: false }))
  };

  return (
    <ModalContext.Provider value={{ state, actions }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};