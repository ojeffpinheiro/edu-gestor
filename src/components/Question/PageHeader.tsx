import React, { ReactNode } from 'react';
import { FiUpload, FiDownload, FiPlus } from 'react-icons/fi';
import { PageActions, PageHeaderContainer, PageTitleContainer } from '../../styles/header';
import { ActionButton } from '../../styles/buttons';

interface ActionItem {
  label: string;
  icon?: ReactNode;
  variant?: 'default' | 'primary';
  onClick: () => void;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ActionItem[]; // Ações customizadas (opcional)
}

const DEFAULT_ACTIONS: ActionItem[] = [
  {
    label: 'Importar',
    icon: <FiUpload />,
    variant: 'default',
    onClick: () => console.log('Importar clicked')
  },
  {
    label: 'Exportar',
    icon: <FiDownload />,
    variant: 'default',
    onClick: () => console.log('Exportar clicked')
  },
  {
    label: 'Nova Questão',
    icon: <FiPlus />,
    variant: 'primary',
    onClick: () => console.log('Nova Questão clicked')
  }
];

const PageHeader = ({
  title,
  description,
  actions = DEFAULT_ACTIONS
}: PageHeaderProps) => {
  return (
    <PageHeaderContainer>
      <PageTitleContainer>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </PageTitleContainer>

      <PageActions>
        {actions.map((action, index) => (
          <ActionButton
            key={index}
            className={action.variant === 'primary' ? 'primary' : ''}
            onClick={action.onClick}
          >
            {action.icon}
            {action.label}
          </ActionButton>
        ))}
      </PageActions>
    </PageHeaderContainer>
  );
};

export default PageHeader;