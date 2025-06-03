import React from 'react';
import styled from 'styled-components';

const SlideContainerWrapper = styled.div`
  position: relative;
  margin-top: 20px;
  width: 100%;
  min-height: 400px;
`;

interface SlideContainerProps {
  children: React.ReactNode;
}

const SlideContainer: React.FC<SlideContainerProps> = ({ children }) => {
  return <SlideContainerWrapper>{children}</SlideContainerWrapper>;
};

export default SlideContainer;