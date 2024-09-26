import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const ClientsPage = () => {
  const [clients, setClients] = useState(null);

  const fetchClients = async () => {
    try {
      const resp = await fetch("http://localhost:3001/clients", {
        headers: {
          Authorizzation: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (resp.ok) {
        const result = await resp.json();
        setClients(result);
      } else {
        throw new Error("Errrore nel recupero dei dati!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default ClientsPage;
