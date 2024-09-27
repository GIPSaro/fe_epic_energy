import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
// import SideNavbar from "./SideNavBar";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const url = import.meta.env.VITE_URL;

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
        throw new Error("Errrore nel recupero dei dati!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    {/* <SideNavbar/> */}
    <Container className="mt-5">
      <h1>Clients</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Company Type</th>
            <th>VAT</th>
            <th>Email</th>
            <th>Insert date</th>
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
                <td>{client.company.name}</td>
                <td>{client.vat}</td>
                <td>{client.email}</td>
                <td>{client.insertDate}</td>
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
