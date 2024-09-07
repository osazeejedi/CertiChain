import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const VerifyContainer = styled.div`
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
  background-color: ${props => props.theme.colors.secondary};
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

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: ${props => props.theme.colors.surface};
  border-radius: 4px;
`;

function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setVerificationResult(null);

    try {
      const response = await axios.get(`/api/certificates/verify/${certificateId}`);
      setVerificationResult(response.data);
    } catch (error) {
      setError('Failed to verify certificate. Please check the ID and try again.');
      console.error('Certificate verification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VerifyContainer>
      <h2>Verify Certificate</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify Certificate'}
        </Button>
      </Form>
      {error && <Message error>{error}</Message>}
      {verificationResult && (
        <ResultContainer>
          <h3>Verification Result:</h3>
          <p>Valid: {verificationResult.isValid ? 'Yes' : 'No'}</p>
          {verificationResult.isValid && (
            <>
              <p>Recipient Name: {verificationResult.certificate.recipientName}</p>
              <p>Recipient Email: {verificationResult.certificate.recipientEmail}</p>
              <p>Issue Date: {new Date(verificationResult.certificate.issueDate).toLocaleString()}</p>
            </>
          )}
        </ResultContainer>
      )}
    </VerifyContainer>
  );
}

export default VerifyCertificate;