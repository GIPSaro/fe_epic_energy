import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;

  const notifyError = (errorMsg) => {
    toast.error(errorMsg, {
      className: "text-white bg-danger m-4",
    });
  };

  const loginFetch = async () => {
    try {
      const resp = await fetch(url + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (resp.ok) {
        const result = await resp.json();
        // console.log(result.accessToken);
        localStorage.setItem("token", result.accessToken);
        navigate("/user");
      }
    } catch (error) {
      notifyError(error.message);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginFetch();
    console.log("Login attempted with:", { email, password });
  };

  return (
    <Container className="mx-auto d-flex justify-content-center align-items-center">
      <Row className="justify-content-center mt-5" style={{ width: "300px" }}>
        <Col md={12}>
          <div className="form-container2">
            <h2 className="text-center mb-2">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
              <>
                <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover theme="dark" transition={Slide} />
              </>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
