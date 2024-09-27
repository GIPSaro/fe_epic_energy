import { useEffect, useState } from "react";
import { Container, Dropdown, DropdownButton, Form, Image } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import SideNavbar from "./SideNavBar";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const url = import.meta.env.VITE_URL;
  const [value, setValue] = useState();
  const [turnoverToggle, setTurnoverToggle] = useState(false);
  const [contactDateToggle, setContactDateToggle] = useState(false);
  const [clientsNameToggle, setClientsNameToggle] = useState(false);

  const fetchClients = async () => {
    try {
      const resp = await fetch(url + "/clients", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (resp.ok) {
        const result = await resp.json();
        console.log(result.content);

        setClients(result.content);
      } else {
        throw new Error("Errore nel recupero dei dati!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClientsByAnnualTurnover = async () => {
    try {
      const resp = await fetch(url + "/clients/turnover?annualTurnover=" + value, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (resp.ok) {
        const result = await resp.json();
        setClients(result.content);
      } else {
        throw new Error("Errore nel recupero dei dati!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClientsByContactDate = async () => {
    try {
      const resp = await fetch(url + "/clients/contactDate?lastContactDate=" + value, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (resp.ok) {
        const result = await resp.json();
        setClients(result.content);
      } else {
        throw new Error("Errore nel recupero dei dati!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClientsByName = async () => {
    try {
      const resp = await fetch(url + "/clients/containsName?name=" + value, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (resp.ok) {
        const result = await resp.json();
        setClients(result.content);
      } else {
        throw new Error("Errore nel recupero dei dati!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmitTurnover = (e) => {
    e.preventDefault();
    fetchClientsByAnnualTurnover();
  };

  const handleSubmitContactDate = (e) => {
    e.preventDefault();
    fetchClientsByContactDate();
  };

  const handleSubmitClientName = (e) => {
    e.preventDefault();
    fetchClientsByName();
  };

  return (
    <>
      <SideNavbar />
      <Container className="mt-5">
        <h1>Clients</h1>
        <DropdownButton className="mb-2" id="dropdown-basic-button" title="Filter">
          <Dropdown.Item
            onClick={() => {
              setTurnoverToggle(true);
              setContactDateToggle(false);
              setClientsNameToggle(false);
            }}
          >
            Annual turnover
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setTurnoverToggle(false);
              setContactDateToggle(true);
              setClientsNameToggle(false);
            }}
          >
            Contact Date
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setTurnoverToggle(false);
              setContactDateToggle(false);
              setClientsNameToggle(true);
            }}
          >
            Clients Name
          </Dropdown.Item>
        </DropdownButton>
        <Form className={turnoverToggle ? "d-block" : "d-none"} onSubmit={handleSubmitTurnover}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Annual Turnover</Form.Label>
            <Form.Control type="text" placeholder="Value" value={value} onChange={handleChange} />
          </Form.Group>
        </Form>
        <Form className={contactDateToggle ? "d-block" : "d-none"} onSubmit={handleSubmitContactDate}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Contact Date</Form.Label>
            <Form.Control type="text" placeholder="Value" value={value} onChange={handleChange} />
          </Form.Group>
        </Form>
        <Form className={clientsNameToggle ? "d-block" : "d-none"} onSubmit={handleSubmitClientName}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Clients Name</Form.Label>
            <Form.Control type="text" placeholder="Value" value={value} onChange={handleChange} />
          </Form.Group>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Company Name</th>
              <th>Company Logo</th>
              <th>Company Type</th>
              <th>VAT</th>
              <th>Email</th>
              <th>Last contact date</th>
              <th>Tel. NUmber</th>
              <th>Annual Turnover</th>
              <th>Pec</th>
              <th>Work address</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => {
              return (
                <tr key={client.id}>
                  <td>{index + 1}</td>
                  <td>{client.companyName}</td>
                  <td>
                    <Image src={client.companyLogo} width={60} height={60} alt="logo" />
                  </td>
                  <td>{client.company.name}</td>
                  <td>{client.vat}</td>
                  <td>{client.email}</td>
                  <td>{client.lastContactDate}</td>
                  <td>{client.telNumber}</td>
                  <td>{client.annualTurnover}</td>
                  <td>{client.pec}</td>
                  <td>
                    <p>
                      {client.workAddress.street}, {client.workAddress.streetNumber}, {client.workAddress.zipNumber}, {client.workAddress.city.name}, {client.workAddress.city.province.initial}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ClientsPage;
