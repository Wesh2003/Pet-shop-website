import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

function GroomerLogin({ setIsAuthenticated, setGroomerId }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/groomerlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        const { groomer_access_token, groomer_id } = data; // Ensure the backend returns both

        if (!groomer_access_token || groomer_id === null || groomer_id === undefined) {
          alert('Invalid response from server.');
          return;
        }

        localStorage.setItem('groomer_access_token', groomer_access_token);
        localStorage.setItem('id', groomer_id.toString()); // ✅ Store user ID

      setIsAuthenticated(true);
      setGroomerId(groomer_id); // ✅ Update React state
      navigate('/groomerhome');
      } else {
        alert(data.error || 'Groomer Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Groomer Login failed. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <div>
      <Container className="mb-5">
        <h3 className="text-center mt-3 mb-4">Login</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Login Groomer
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default GroomerLogin;
