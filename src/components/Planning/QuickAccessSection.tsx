/**
 * components/QuickAccessSection.tsx
 * Componente de seção de acesso rápido refatorado
 */
import React, { memo } from 'react';
import { GridSection, QuickAccessCard, QuickHeader, SectionHeader } from './styles';
import { AccessCard } from '../../utils/types/planningDashboard';

interface QuickAccessSectionProps {
  accessCards: AccessCard[];
  onCardClick: (link: string) => void;
  title?: string;
}

/**
 * Componente para exibir uma seção de cards de acesso rápido
 * 
 * @param accessCards - Lista de cards de acesso a serem exibidos
 * @param onCardClick - Função de callback para clique em um card
 * @param title - Título personalizado para a seção (padrão: "Acesso Rápido")
 */
export const QuickAccessSection: React.FC<QuickAccessSectionProps> = memo(({
  accessCards,
  onCardClick,
  title = "Acesso Rápido"
}) => {
  // Função de segurança para lidar com o clique
  const handleCardClick = (link: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (typeof onCardClick === 'function') {
      onCardClick(link);
    }
  };

  return (
    <section data-testid="quick-access-section">
      <SectionHeader>
        <h2 className="text-xl font-semibold">{title}</h2>
      </SectionHeader>
      
      <GridSection>
        {accessCards.map(card => (
          <QuickAccessCard
            key={card.id}
            $color={card.color}
            onClick={(e) => handleCardClick(card.link, e)}
            tabIndex={0}
            role="button"
            aria-label={`Acesso rápido a ${card.title}`}
          >
            <QuickHeader>
              {/* Ícone do card, com aria-hidden para acessibilidade */}
              {React.isValidElement(card.icon) && React.cloneElement(card.icon, { 
                'aria-hidden': true
              })}
              <h3 className="ml-2 text-lg font-semibold">{card.title}</h3>
            </QuickHeader>
            
            {/* Descrição personalizada ou padrão */}
            <p className="text-sm opacity-80">
              {card.description || `Acesse e gerencie ${card.title.toLowerCase()}`}
            </p>
          </QuickAccessCard>
        ))}
      </GridSection>
    </section>
  );
});