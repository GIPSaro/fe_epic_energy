import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "", 
    name: "",
    surname: ""
  })

  // const navigate = useNavigate()
  const url = "http://localhost:8080/auth/register"

  const register = async () =>{
    try{
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(userData),
    });
      if(resp.ok){
        // navigate("/login")
      }
    }catch (error){
      console.log(error);
      
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    register()
    }
     
<<<<<<< Updated upstream
=======

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
>>>>>>> Stashed changes
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
                name="username"
                value={userData.username}
                onChange={handleChange}
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter surname"
                name="surname"
                value={userData.surname}
                onChange={handleChange}
                required 
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
