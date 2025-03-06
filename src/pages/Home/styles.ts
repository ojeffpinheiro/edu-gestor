import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: var(--color-background);
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: 20px;
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const FeatureCard = styled.div`
  background: var(--color-secondary);
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export const IconWrapper = styled.div`
  background: var(--card);
  padding: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const FeatureTitle = styled.h2`
  font-size: 18px;
  color: var(--color-title-card);
  margin-bottom: 5px;
`;

export const FeatureDescription = styled.p`
  font-size: 14px;
  color: var(--color-text-button)
`;
