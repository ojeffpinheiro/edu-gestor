import React, { useState, PropsWithChildren } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';


const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f5f7fa;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AppLayout = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Layout>
      <Header toggleSidebar={toggleSidebar} />
      <Content>
        <Sidebar isOpen={sidebarOpen} />
        <MainContent>{children}</MainContent>
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;