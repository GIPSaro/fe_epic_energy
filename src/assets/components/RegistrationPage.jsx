import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (username && email && password && name && surname) {
      console.log('Registrazione avvenuta come:', { username, email, password, name, surname, avatar });
      alert('Registrazione avvenuta con successo!');
      setUsername('');
      setEmail('');
      setPassword('');
      setName('');
      setSurname('');
      setAvatar('');
      e.target.reset(); 
    }
     
  };
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  return (
    <div className="registration-page"> 
    <Container className="d-flex align-items-center justify-content-center">
     
      <Row className="justify-content-center mt-5">
        <Col md={12}>
         <div className="form-container">
          <h2 className="text-center mb-4">Registrazione</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </Form.Group>

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
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAvatar">
              <Form.Label>Avatar (opzionale)</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default RegistrationPage;
