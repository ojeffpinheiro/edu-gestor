import React from 'react';
import { Header, HeaderContainer, Title, Subtitle } from './styles';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const HeaderComponent: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <Header>
      <HeaderContainer>
        <div>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </div>
      </HeaderContainer>
    </Header>
  );
};

export default HeaderComponent;