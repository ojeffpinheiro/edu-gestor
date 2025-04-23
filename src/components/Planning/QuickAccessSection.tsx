import React from 'react'
import { GridSection, QuickAccessCard, QuickHeader, SectionHeader } from './styles';

interface AccessCard {
    id: number;
    titulo: string;
    icon: React.ReactNode;
    color: string;
    link: string;
}

export const QuickAccessSection: React.FC<{
    accessCards: AccessCard[],
    onCardClick: (link: string) => void
}> = ({ accessCards, onCardClick }) => (
    <section>
        <SectionHeader>
            <h2 className="text-xl font-semibold">Acesso Rápido</h2>
        </SectionHeader>
        <GridSection>
            {accessCards.map(card => (
                <QuickAccessCard
                    key={card.id}
                    $color={card.color}
                    onClick={() => onCardClick(card.link)}
                >
                    <QuickHeader>
                        {card.icon}
                        <h3 className="ml-2 text-lg font-semibold">{card.titulo}</h3>
                    </QuickHeader>
                    <p className="text-sm opacity-80">
                        Acesse e gerencie {card.titulo.toLowerCase()}
                    </p>
                </QuickAccessCard>
            ))}
        </GridSection>
    </section>
);