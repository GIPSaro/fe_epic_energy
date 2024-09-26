import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (email && password) {
      console.log('Login avvenuto come: ', { email, password });
      alert('Login avvenuto con successo!'); 
      setEmail('');
      setPassword('');
    }
  };

  return (
  <div className='loginPage'>
    <Container className="d-flex align-items-center justify-content-center"
    style={{ minHeight: '100vh' }} >
      <Row className="justify-content-center mt-5" >
        <Col md={12}>
        <div className="form-container2">
          <h2 className="text-center mb-2">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default LoginPage;


