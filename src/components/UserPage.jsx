import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    avatar: "",
  });

  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const resp = await fetch(url + "/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (resp.ok) {
        const result = await resp.json();
        setUser(result);
      } else {
        throw new Error("Errore nel recupero dei dati!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="user-page mt-5 ">
      <Row className="justify-content-between">
        <Col xs={3} className="p-0">
          <Card className="p-4 text-center">
            <Card.Img
              variant="top"
              src={user.avatar || "https://via.placeholder.com/150"}
              alt="profile"
              className="rounded-circle"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                margin: "0 auto",
              }}
            />
            <Card.Body>
              <Card.Title>
                <span>{user.name}</span> <span>{user.surname}</span>
              </Card.Title>
              <Card.Text>{user.email}</Card.Text>
              <Button variant="primary" className="mt-3" onClick={() => navigate("/edit-profile")}>
                {" "}
                Modifica Profilo
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={9} className="text-center d-flex flex-column justify-content-center">
          <h1>BENVENUTO IN EPIC ENERGY SERVICES</h1>
          <p className="lead">Seleziona una delle opzioni qui sotto per procedere:</p>
          <div className="mt-4">
            <Button variant="success" className="me-3" onClick={() => navigate("/clients")} style={{ width: "200px" }}>
              Vai alla pagina Clienti
            </Button>
            <Button variant="info" onClick={() => navigate("/invoices")} style={{ width: "200px" }}>
              Vai alla pagina Fatture
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
