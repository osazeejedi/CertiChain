import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormContainer = styled.div`
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
`;

const Message = styled.p`
  margin-top: 10px;
  color: ${props => props.error ? props.theme.colors.error : props.theme.colors.secondary};
`;

function IssueCertificate({ token }) {
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('/api/certificates/issue', 
        { recipientName, recipientEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(`Certificate issued successfully. ID: ${response.data.certificateId}`);
    } catch (error) {
      setError('Failed to issue certificate. Please try again.');
      console.error('Certificate issuance failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <h2>Issue Certificate</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Recipient Name"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Recipient Email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Issuing...' : 'Issue Certificate'}
        </Button>
      </Form>
      {error && <Message error>{error}</Message>}
      {success && <Message>{success}</Message>}
    </FormContainer>
  );
}

export default IssueCertificate;