import React, { useState } from 'react';
import styled from 'styled-components';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import IssueCertificate from './components/IssueCertificate';
import VerifyCertificate from './components/VerifyCertificate';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
`;

const LogoutButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.background};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
`;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <AppContainer>
      <Title>Certificate Platform</Title>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <Dashboard />
      <IssueCertificate token={token} />
      <VerifyCertificate />
    </AppContainer>
  );
}

export default App;