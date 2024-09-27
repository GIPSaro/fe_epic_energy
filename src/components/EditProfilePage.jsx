import { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";

const EditProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    avatar: "",
  });

  const [newAvatar, setNewAvatar] = useState(null);
  const url = import.meta.env.VITE_URL;

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
    console.log(user.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(url + "/users/me", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          surname: user.surname,
          email: user.email,
        }),
      });

      if (resp.ok) {
        const result = await resp.json();
        console.log("Profilo aggiornato:", result);
      } else {
        throw new Error("Errore nell'aggiornamento del profilo!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAvatarSubmit = async () => {
    if (!newAvatar) return;

    try {
      const formData = new FormData();
      formData.append("avatar", newAvatar);

      const resp = await fetch(url + "/users/me/avatar", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });

      if (resp.ok) {
        const result = await resp.json();
        console.log("Avatar aggiornato:", result);
        setUser({ ...user, avatar: result.avatar });
      } else {
        throw new Error("Errore nell'aggiornamento dell'avatar!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFullSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    await handleAvatarSubmit();
    await fetchUser();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4">
            <h3 className="text-center mb-4">Modifica Profilo</h3>
            <Form onSubmit={handleFullSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="name" value={user.name} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSurname">
                <Form.Label>Cognome</Form.Label>
                <Form.Control type="text" name="surname" value={user.surname} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={user.email} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAvatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
                {user.avatar && <img src={user.avatar} alt="avatar" className="mt-3 rounded-circle" style={{ width: "100px", height: "100px", objectFit: "cover" }} />}
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Salva Modifiche
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfilePage;
