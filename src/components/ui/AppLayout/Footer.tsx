import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #ffffff;
  border-top: 1px solid #e1e4e8;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #7f8c8d;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    padding: 1rem;
  }
`;

const Copyright = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: #7f8c8d;
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: #3498db;
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <Copyright>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>&copy; {currentYear} Exam Generator. Todos os direitos reservados.</span>
      </Copyright>
      <FooterLinks>
        <a href="/terms">Termos de Uso</a>
        <a href="/privacy">Privacidade</a>
        <a href="/support">Suporte</a>
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;