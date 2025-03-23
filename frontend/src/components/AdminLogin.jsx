import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

function AdminLogin({ setIsAuthenticated, setAdminId }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        const { admin_access_token, admin_id } = data; // Ensure the backend returns both

        if (!admin_access_token || admin_id === null || admin_id === undefined) {
          alert('Invalid response from server.');
          return;
        }

        localStorage.setItem('admin_access_token', admin_access_token);
        localStorage.setItem('id', admin_id.toString()); // ✅ Store user ID

      setIsAuthenticated(true);
      setAdminId(admin_id); // ✅ Update React state
      navigate('/adminhome');
      } else {
        alert(data.error || 'Admin Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Admin Login failed. Please try again later.');
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
            Login Admin
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AdminLogin;
