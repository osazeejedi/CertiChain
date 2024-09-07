import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.secondary};
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <Title>Dashboard</Title>
      <p>Welcome to your certificate dashboard. Here you can view your issued certificates and perform quick actions.</p>
      {/* Add more dashboard content here */}
    </DashboardContainer>
  );
}

export default Dashboard;